import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        invoice(id: ID!): Invoice!
        allInvoices: [Invoice!]!
    }

    extend type Mutation {
        createInvoice (product: String, price: String, payment: Boolean, id_company: Int!): Invoice!
        updateInvoice (id: Int!, product: String, price: String, payment: Boolean, id_company: Int!): statusUpdate
        deleteInvoice (id: Int!): statusDelete
    }

    type Invoice {
        id:             ID!
        product:        String
        price:          String
        payment:        Boolean
        createdAt:      Date
        updatedAt:      Date
        company:     Company
    }
`;