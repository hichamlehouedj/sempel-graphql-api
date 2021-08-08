import { PubSub, PubSubEngine, withFilter } from 'graphql-subscriptions';
import { User, Box, Client } from '../../models';

const pubsub = new PubSub();

export const resolvers = {

        Query: {
                box:    async (obj, args, context, info) => Box.findByPk(args.id),
                allBox: async (obj, args, context, info) => Box.findAll({
                        where: {
                                id_stock: args.idStock
                        }
                }),
        },

        // Box: {
        //         client: async (obj, args, context, info) => Client.findByPk(obj.id),
        //         user:   async (obj, args, context, info) => User.findByPk(obj.id),
        // },

        Mutation: {
                createBox: async (obj, {content}, context, info) => {
                        let box = await Box.create(content)

                        console.log(box);

                        pubsub.publish('BOX_CREATED', { boxCreated: box });
                        
                        return box;
                },

                updateBox: async (obj, args, context, info) => {
                        try {
                                const id = args.id || null;
                                delete args.id;
                                let result = await Box.update(args, { where: { id: id } })

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
                                        // Only push an update if the comment is on
                                        // the correct repository for this operation
                                        return (payload.boxCreated.id_user === variables.idUser);
                                },
                        )
                },
        }
}
