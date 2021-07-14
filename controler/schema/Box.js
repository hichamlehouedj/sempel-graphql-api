import { gql } from 'apollo-server';

export const typeDefs = gql`
    extend type Query {
        box(id: ID!): Box!
        allBox: [Box!]
    }

    extend type Mutation {
        createBox (
            status: String, 
            name_recipient: String, 
            phon1_recipient: String, 
            phon2_recipient: String, 
            place_delivery: String, 
            price: String, 
            code_order: Int,
            number_Receipt: String,
            note: String,
            id_client: Int,
            id_user: Int
        ): Box
        
        updateBox (
            id: Int!,
            status: String, 
            name_recipient: String, 
            phon1_recipient: String, 
            phon2_recipient: String, 
            place_delivery: String, 
            price: String, 
            code_order: Int,
            number_Receipt: String,
            note: String,
            id_client: Int,
            id_user: Int
        ): statusUpdate

        deleteBox ( id: Int! ): statusDelete
    }

    type Box {
        id:                 ID!
        status:             String
        name_recipient:     String
        phon1_recipient:    String
        phon2_recipient:    String
        place_delivery:     String
        price:              String
        code_order:         String
        number_Receipt:     String
        createdAt:          Date
        updatedAt:          Date
        note:               String
        client:             Client
        user:               User
    }
`;