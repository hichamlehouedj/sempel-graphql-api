import { ApolloError } from 'apollo-server';

import { Person, Client, StockAccess, Stock } from '../../models';

export const resolvers = {

        Query: {
                client:           async (obj, args, context, info) => Client.findByPk(args.id),
                allClientsStock:       async (obj, args, context, info) => {
                        let cl = await Client.findAll({
                                where: {
                                        '$person->stock_accesses.id_stock$': args.idStock
                                },
                                include: {
                                        model: Person,
                                        as: 'person',

                                        include: {
                                                model: StockAccess,
                                                as: 'stock_accesses',
                                                required: true
                                        },
                                        required: true
                                }
                        })
                        console.log("\n\n\ncl", cl, "\n\n\n");
                        return cl;
                },
                allClientsCompany:       async (obj, args, context, info) => Client.findAll({
                        where: {
                                id_stock: args.idStock
                        }
                }),
        },

        Client: {
                person: async (obj, args, context, info) => Person.findByPk(obj.id_person),
        },

        Mutation: {
                createClient: async (obj, args, context, info) => {
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

                                return await Client.create({ 
                                        id_person: result.id 
                                })
                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                },

                updateClient: async (obj, args, context, info) => {
                        try {
                                const id = args.id_person || null;
                                delete args.id_person;

                                let person = await Person.update(args, { where: { id: id } })

                                return {
                                        status: person[0] === 1 ? true : false
                                }

                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                },

                deleteClient: async (obj, args, context, info) => {
                        try {
                                const id = args.id || null;

                                let result = await Client.destroy({ where: { id: id } })
                                return {
                                        status: result === 1 ? true : false
                                }
                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                }
        }
}
