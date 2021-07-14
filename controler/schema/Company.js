import { gql } from 'apollo-server';

export const typeDefs = gql`
    extend type Query {
        company(id: ID!): Company!
        allCompany: [Company!]!
    }

    extend type Mutation {

        createCompany(name: String, logo: String, phone01: String, phone02: String, email: String, url_site: String, address: String, activation: String): Company!

        updateCompany(id: Int!, name: String, logo: String, phone01: String, phone02: String, email: String, url_site: String, address: String, activation: String): statusDelete

        deleteCompany(id: Int!): statusDelete

    }

    type Company {
        id:             ID!
        name:           String
        logo:           String
        phone01:        String
        phone02:        String
        email:          String
        url_site:       String
        address:        String
        createdAt:      Date
        updatedAt:      Date
        activation:     String
    }

    type CompanyInfo {
        company:        Company!
        admin:          User!
    }
`;