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

        Mutation: {
            createBoxTrace: async (obj, {content}, context, info) => {

                let boxTrace = await BoxTrace.create({
                    status:         content.statu_box,
                    note:           content.note,
                    id_stock:       content.id_stock,
                    id_person:      content.id_person,
                    id_box:         id_box
                })
                
                return boxTrace;
            }
        },

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
