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
                createBox: async (obj, args, context, info) => await Box.create({
                        status:             args.status,
                        name_recipient:     args.name_recipient,
                        phon1_recipient:    args.phon1_recipient,
                        phon2_recipient:    args.phon2_recipient,
                        place_delivery:     args.place_delivery,
                        price:              args.price,
                        code_order:         args.code_order,
                        number_Receipt:     args.number_Receipt,
                        note:               args.note,
                        id_client:          args.id_client,
                        id_user:            args.id_user
                }),

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
