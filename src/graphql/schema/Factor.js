import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        factor(id: ID!): Factor!
        allFactors: [Factor!]!
    }

    extend type Mutation {

        createFactor (first_name: String, last_name: String, email: String, phone01: String, phone02: String, address: String, department: String, id_company: Int): Person
    
        updateFactor (id_person: Int, first_name: String, last_name: String, email: String, phone01: String, phone02: String, address: String, department: String, id_company: Int): statusUpdate

        deleteFactor (id: Int!): statusDelete
    }

    type Factor {
        id:         ID!
        person:     Person
        department: String
    }

`;