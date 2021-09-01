import { ApolloError } from 'apollo-server';
import { PubSub, withFilter } from 'graphql-subscriptions';
import { Box } from '../../models';
const pubsub = new PubSub();

export const resolvers = {
    Query: {
        box:    async (obj, args, context, info) => Box.findByPk(args.id),
        allBox: async (obj, args, context, info) => Box.findAll({
            where: {
                id_stock: args.idStock
            }
        })
    },

    Mutation: {
        createBox: async (obj, {content}, context, info) => {

            let box = await Box.create(content)

            pubsub.publish('BOX_CREATED', { boxCreated: box["dataValues"] });

            return box;
        },

        updateBox: async (obj, {id, content}, context, info) => {
            try {
                let result = await Box.update(content, { where: { id: id } })

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
                    return (payload.boxCreated.id_stock == variables.idStock);
                },
            )
        }
    }
}
