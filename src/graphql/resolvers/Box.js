import { User, Box, Client } from '../../models';

export const resolvers = {

        Query: {
                box:    async (obj, args, context, info) => Box.findByPk(args.id),
                allBox: async (obj, args, context, info) => Box.findAll(),
        },

        Box: {
                client: async (obj, args, context, info) => Client.findByPk(obj.id),
                user:   async (obj, args, context, info) => User.findByPk(obj.id),
        },

        Mutation: {
                

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

        }
}
