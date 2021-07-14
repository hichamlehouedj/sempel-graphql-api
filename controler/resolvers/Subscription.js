import { ApolloError } from 'apollo-server';
import { User, Company, Subscription, Person, Invoice, Box } from '../../models';

export const resolvers = {

        Query: {
                subscription:           async (obj, args, context, info) => User.findByPk(args.id),
                allSubscriptions:       async (obj, args, context, info) => User.findAll(),
        },

        Subscription: {
                company: async (obj, args, context, info) => Company.findByPk(obj.id_company),
        },

        Mutation: {
                createSubscription: async (obj, args, context, info) =>  await Subscription.create({
                        payment: args.payment,
                        package: args.package,
                        start_date: dateTime, 
                        expiry_date: dateTime,
                        id_company: args.id_company
                }),

                updateSubscription: async (obj, args, context, info) => {
                        try {
                                const id = args.id || null;
                                delete args.id;

                                let person = await Subscription.update(args, { where: { id: id } })

                                return {
                                        status: person[0] === 1 ? true : false
                                }
                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                },

                deleteSubscription: async (obj, args, context, info) => {
                        try {
                                const id = args.id || null;

                                let result = await Subscription.destroy({ where: { id: id } })
                                return {
                                        status: result === 1 ? true : false
                                }
                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                }
        }
}
