import { ApolloError } from 'apollo-server';

import { Person, Client, StockAccess, Stock, User } from '../../models';

export const resolvers = {

        Query: {
                client:           async (obj, args, context, info) => Client.findByPk(args.id),

                allClients: async (obj, args, context, info) => {
                        let deleted = args.deleted || 0
                        return await Client.findAll({
                                where: {
                                        '$person->stock_accesses.id_stock$': args.idStock,
                                        '$person.deleted$':  deleted
                                },
                                include: {
                                        model: Person,
                                        as: 'person',
                                        required: true,
                                        right: true,
                                        include: {
                                                model: StockAccess,
                                                as: 'stock_accesses',
                                                required: true,
                                                right: true
                                        }
                                }
                        })
                },

                // allClientsCompany:       async (obj, args, context, info) => Client.findAll({
                //         where: {
                //                 id_stock: args.idStock
                //         }
                // }),
        },

        Client: {
                person: async (obj, args, context, info) => Person.findByPk(obj.id_person),
                user: async (obj, args, context, info) => User.findAll({
                        where: {id_person: obj.id_person},
                        limit: 1
                }),
        },

        Mutation: {
                createClient: async (obj, {content}, context, info) => {
                        try {
                                let result = await Person.create(content.person)

                                await User.create({ 
                                        id_person: result.id,
                                        id_stock: content.person.id_stock
                                })

                                await StockAccess.create({ 
                                        id_person: result.id,
                                        id_stock: content.person.id_stock
                                })

                                return await Client.create({ 
                                        id_person: result.id 
                                })

                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                },

                updateClient: async (obj, {id_person, content}, context, info) => {
                        try {
                                let person = await Person.update(content.person, { where: { id: id_person } })

                                return {
                                        status: person[0] === 1 ? true : false
                                }

                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                },

                deleteClient: async (obj, {id_person}, context, info) => {
                        try {
                                let result = await Person.update({deleted: true},{ where: { id: id_person } })
                                return {
                                        status: result[0] === 1 ? true : false
                                }
                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                }
        }
}
