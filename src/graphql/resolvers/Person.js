import { ApolloError } from 'apollo-server';
import { Company, Person, Stock, StockAccess } from '../../models';


export const resolvers = {

        Query: {
                person:           async (obj, args, context, info) => await Person.findByPk(args.id),
                allPersons:       async (obj, args, context, info) => await Person.findAll()
        },

        Person: {
                company: async (obj, args, context, info) => Company.findByPk(obj.id_company),
                list_stock_accesses: async (obj, args, context, info) => await StockAccess.findAll({
                        where: {
                                id_person: obj.id
                        }
                })
        },

        StockAccess: {
                stock: async (obj, args, context, info) => await Stock.findAll({
                        where: {
                                id: obj.id_stock
                        }
                })
        },

        Mutation: {
                createPerson: async (obj, {content}, context, info) =>  {
                        let person = await Person.create(content)
                        await StockAccess.create({
                                id_stock: content.id_stock, 
                                id_person: person.id
                        })

                        return person
                },

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
