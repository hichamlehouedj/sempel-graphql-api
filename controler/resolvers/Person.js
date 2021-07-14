import { ApolloError } from 'apollo-server';
import { Person } from '../../models';


export const resolvers = {

        Query: {
                person:           async (obj, args, context, info) => User.findByPk(args.id),
                allPersons:       async (obj, args, context, info) => User.findAll(),
        },

        Person: {
                company: async (obj, args, context, info) => Company.findByPk(obj.id_company),
        },

        Mutation: {
                createPerson: async (obj, args, context, info) =>  await Person.create({
                        first_name: args.first_name,
                        last_name: args.last_name,
                        email: args.email,
                        phone01: args.phone01,
                        phone02: args.phone02,
                        address: args.address,
                        id_company: args.id_company
                }),

                updatePerson: async (obj, args, context, info) => {
                        try {
                                const id = args.id || null;
                                delete args.id;

                                let person = await Person.update(args, { where: { id: id } })

                                return {
                                        status: person[0] === 1 ? true : false
                                }
                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                },

                deletePerson: async (obj, args, context, info) => {
                        try {
                                const id = args.id || null;

                                let result = await Person.destroy({ where: { id: id } })
                                return {
                                        status: result === 1 ? true : false
                                }
                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                }
        }
}
