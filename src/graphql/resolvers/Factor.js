import { Person, Factor, StockAccess } from '../../models';


export const resolvers = {

        Query: {
                factor: async (obj, args, context, info) => Factor.findByPk(args.id),
                allFactors: async (obj, args, context, info) => {
                        let deleted = args.deleted || 0
                        let  factor = await Factor.findAll({
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
                        
                        return []
                },
        },

        Factor: {
                person: async (obj, args, context, info) => Person.findByPk(obj.id_person),
                user: async (obj, args, context, info) => User.findAll({
                        where: {id_person: obj.id_person},
                        limit: 1
                }),
        },

        Mutation: {
                createFactor: async (obj, {content}, context, info) => {
                        try {
                                let result = await Person.create(content.person)

                                await StockAccess.create({ 
                                        id_person: result.id,
                                        id_stock: content.person.id_stock
                                })

                                return await Factor.create({ 
                                        id_person: result.id,
                                        department: content.department
                                })

                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                },

                updateFactor: async (obj, {id_person, content}, context, info) => {
                        try {
                                let person = null;
                                let factor = null

                                if(content.person) {
                                        person = await Person.update(content.person, { where: { id: id_person } })
                                }

                                if(content.department) {
                                        factor = await Factor.update(
                                                {
                                                        department: content.department
                                                }, { 
                                                        where: { id_person } 
                                                }
                                        )
                                }

                                return {
                                        status: person[0] || factor[0] === 1 ? true : false
                                }

                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                },

                deleteFactor: async (obj, {id_person}, context, info) => {
                        try {
                                console.log({id_person});
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
