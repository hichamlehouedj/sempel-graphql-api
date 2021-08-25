import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        factor(id: ID!): Factor!
        allFactors(idStock: ID!, deleted: Boolean): [Factor]
    }

    extend type Mutation {

        createFactor (content: contentFactor!): Factor
    
        updateFactor (id_person: ID!, content: contentFactor!): statusUpdate

        deleteFactor (id_person: ID!): statusDelete
    }

    type Factor {
        id:         ID!
        person:     Person
        department: String
        user: [User!]
    }

    input contentFactor {
        department: String
        person: contentPerson
    }

`;