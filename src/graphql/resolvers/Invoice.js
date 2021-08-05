import { ApolloError } from 'apollo-server';
import { Invoice } from '../../models';

export const resolvers = {

        Query: {
                invoice:     async (obj, args, context, info) => Invoice.findByPk(args.id),
                allInvoices: async (obj, args, context, info) => Invoice.findAll(),
        },

        Invoice: {
                company: async (obj, args, context, info) => Company.findByPk(obj.id_company),
        },

        Mutation: {
                createInvoice: async (obj, args, context, info) =>  await Invoice.create({
                        product:        args.product,
                        price:          args.price,
                        payment:        args.payment,
                        id_company:     args.id_company
                }),

                updateInvoice: async (obj, args, context, info) => {
                        try {
                                const id = args.id || null;
                                
                                delete args.id;

                                let invoice = await Invoice.update(args, { where: { id: id } })

                                return {
                                        status: invoice[0] === 1 ? true : false
                                }

                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                },

                deleteInvoice: async (obj, args, context, info) => {
                        try {
                                const id = args.id || null;

                                let result = await Invoice.destroy({ where: { id: id } })

                                return {
                                        status: result === 1 ? true : false
                                }

                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                }
        }

}
