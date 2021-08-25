import { ApolloError } from 'apollo-server';
import { PubSub, PubSubEngine, withFilter } from 'graphql-subscriptions';
import { Box, BoxTrace, Client, Stock } from '../../models';
const pubsub = new PubSub();

export const resolvers = {
    Query: {
        box:    async (obj, args, context, info) => Box.findByPk(args.id),
        allBox: async (obj, args, context, info) => Box.findAll({
            where: {
                id_stock: args.idStock
            }
        }),
        boxClient: async (obj, args, context, info) => Box.findAll({
            where: {
                id_client: args.idClient
            }
        })
    },

    Box: {
        stock: async (obj, args, context, info) => Stock.findByPk(obj.id_stock),
        client:async (obj, args, context, info) => {
            try {
                let clients = await Client.findByPk(obj.id_client);
                if (clients === null || clients === undefined) {
                    return []
                }
                return [clients]
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },
        lastTrace: async (obj, args, context, info) => BoxTrace.findAll({
            where: {
                id_box: obj.id
            },
            order: [['createdAt', 'DESC']],
            limit: 1
        }),
        traceBox: async (obj, args, context, info) => BoxTrace.findAll({
            where: {
                id_box: obj.id
            },
            order: [['createdAt', 'DESC']]
        }),
    },

    Mutation: {
        createBox: async (obj, {content}, context, info) => {

            let box = await Box.create(content)
        
            let id_box = box["dataValues"].id;
            
            await BoxTrace.create({
                status:         content.statu_box,
                note:           content.note,
                id_stock:       content.id_stock,
                id_person:      content.id_person,
                id_box:         id_box
            })

            //pubsub.publish('BOX_CREATED', { boxCreated: box });

            return box;
        },

        updateBox: async (obj, {id, content, noteTrace}, context, info) => {
            try {
                let result = await Box.update(content, { where: { id: id } })

                await BoxTrace.create({
                    status:         content.statu_box,
                    note:           noteTrace,
                    id_stock:       content.id_stock,
                    id_person:      content.id_person,
                    id_box:         id
                })

                return {
                    status: result[0] === 1 ? true : false
                }
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },

        deleteBox: async (obj, args, context, info) => {
            try {
                const id = args.id || null;

                let result = await Box.destroy({ where: { id: id } })
                return {
                    status: result === 1 ? true : false
                }
            } catch (error) {
                throw new ApolloError(error.message)
            }
        }
    },
    Subscription: {
        boxCreated: {
            subscribe: withFilter (
                () => pubsub.asyncIterator('BOX_CREATED'),
                (payload, variables) => {
                    return (payload.boxCreated.id_stock === variables.idStock);
                },
            )
        },
    }
}
