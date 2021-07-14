import { Person, Factor } from '../../models';


export const resolvers = {

        Query: {
                factor:           async (obj, args, context, info) => Factor.findByPk(args.id),
                allFactors:       async (obj, args, context, info) => Factor.findAll(),
        },

        Factor: {
                person: async (obj, args, context, info) => Person.findByPk(obj.id_person),
        },

        Mutation: {
                createFactor: async (obj, args, context, info) => {
                        try {
                                let result = await Person.create({
                                        first_name:     args.first_name,
                                        last_name:      args.last_name,
                                        email:          args.email,
                                        phone01:        args.phone01,
                                        phone02:        args.phone02,
                                        address:        args.address,
                                        id_company:     args.id_company
                                })

                                return await Factor.create({ 
                                        id_person: result.id,
                                        department: args.department
                                })

                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                },

                updateFactor: async (obj, args, context, info) => {
                        try {
                                const id = args.id_person || null;
                                const department = args.department || null;
                                
                                delete args.id_person;
                                delete args.department;

                                let person = await Person.update(args, { where: { id: id } })

                                if(department) {
                                        await Factor.update(
                                                {
                                                        department: department
                                                }, { 
                                                        where: { id_person: id } 
                                                }
                                        )
                                }

                                return {
                                        status: person[0] === 1 ? true : false
                                }

                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                },

                deleteFactor: async (obj, args, context, info) => {
                        try {
                                const id = args.id || null;

                                let result = await Factor.destroy({ where: { id: id } })

                                return {
                                        status: result === 1 ? true : false
                                }

                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                }
        }
}
