import { PubSub, PubSubEngine, withFilter } from 'graphql-subscriptions';
import { Box, BoxTrace, Stock, Person } from '../../models';


const pubsub = new PubSub();

export const resolvers = {

        Query: {
            boxTrace:    async (obj, args, context, info) => BoxTrace.findAll({
                where: {
                    id_box: args.idBox
                }
            }),
            lastTraceBox: async (obj, args, context, info) => BoxTrace.findAll({
                where: {
                    id_box: args.idBox
                },
                order: [['createdAt', 'DESC']],
                limit: 1
            }),
        },

        BoxTrace: {
            stock: async (obj, args, context, info) => Stock.findByPk(obj.id_stock), 
            person: async (obj, args, context, info) => Person.findByPk(obj.id_person),         
            box: async (obj, args, context, info) => Box.findByPk(obj.id_box),           
        },

        // Mutation: {
        //     createBoxTrace: async (obj, args, context, info) => {

        //         let box = await Box.create({
        //             status:             args.status,
        //             name_recipient:     args.name_recipient,
        //             phon1_recipient:    args.phon1_recipient,
        //             phon2_recipient:    args.phon2_recipient,
        //             place_delivery:     args.place_delivery,
        //             price:              args.price,
        //             code_order:         args.code_order,
        //             number_Receipt:     args.number_Receipt,
        //             note:               args.note,
        //             id_client:          args.id_client,
        //             id_user:            args.id_user
        //         })

        //         pubsub.publish('BOX_CREATED', { boxCreated: box });
                
        //         return box;
        //     },

        //     updateBoxTrace: async (obj, args, context, info) => {
        //         try {
        //             const id = args.id || null;
        //             delete args.id;
        //             let result = await Box.update(args, { where: { id: id } })

        //             return {
        //                     status: result[0] === 1 ? true : false
        //             }
        //         } catch (error) {
        //             throw new ApolloError(error.message)
        //         }
        //     },

        //     deleteBoxTrace: async (obj, args, context, info) => {
        //         try {
        //             const id = args.id || null;

        //             let result = await Box.destroy({ where: { id: id } })
        //             return {
        //                 status: result === 1 ? true : false
        //             }
        //         } catch (error) {
        //             throw new ApolloError(error.message)
        //         }
        //     }
        // },

        // Subscription: {
        //         boxTraceCreated: {
        //                 subscribe: withFilter (
        //                         () => pubsub.asyncIterator('BOX_CREATED'),
        //                         (payload, variables) => {
        //                                 // Only push an update if the comment is on
        //                                 // the correct repository for this operation
        //                                 return (payload.boxCreated.id_user === variables.idUser);
        //                         },
        //                 )
        //         },
        // }
}
