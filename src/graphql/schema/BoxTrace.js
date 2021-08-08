import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        boxTrace(idBox: ID!): [BoxTrace!]!
        lastTraceBox(idBox: ID!): [BoxTrace]
    }

    extend type Mutation {
        createBoxTrace (content: boxTraceContent!): BoxTrace
        
        updateBoxTrace (id: Int!, content: boxTraceContent!): statusUpdate

        deleteBoxTrace ( id: Int! ): statusDelete
    }

    # extend type Subscription {
    #     boxCreated(idUser: Int!): Box
    # }

    type BoxTrace {
        id:             ID
        status:         String
        note:           String
        createdAt:      Date
        updatedAt:      Date
        stock:          Stock
        person:         Person
        box:            Box
    }

    input boxTraceContent {
        status:         String
        note:           String
        createdAt:      Date
        updatedAt:      Date
        id_stock:       Int
        id_person:      Int
        id_box:         Int
    }
`;