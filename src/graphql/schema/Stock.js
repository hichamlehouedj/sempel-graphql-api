import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        stock(id: ID!): Stock!
        allStock(idCompany: ID!): [Stock!]
    }

    extend type Mutation {
        createStock (content: stockContent!): Stock
        
        updateStock (id: Int!, content: stockContent!): statusUpdate

        deleteStock ( id: Int! ): statusDelete
    }

    # extend type Subscription {
    #     stockCreated(idUser: Int!): Box
    # }

    type Stock {
        id:                                 ID!
        createdAt:                          Date
        updateAt:                           Date
        id_company:                         Int
    }

    input stockContent {
        id_company:                         Int
    }
`;