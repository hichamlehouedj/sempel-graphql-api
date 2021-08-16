import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        person(id: ID!): Person! @isAuth
        allPersons: [Person!]! @isAuth
    }

    extend type Mutation {
        createPerson (first_name: String, last_name: String, email: String, phone01: String, phone02: String, address: String, id_company: Int!): Person
        updatePerson (id: Int!, first_name: String, last_name: String, email: String, phone01: String, phone02: String, address: String, id_company: Int!): statusUpdate
        deletePerson (id: Int!): statusDelete
    }

    type Person {
        id:                     ID!
        first_name:             String
        last_name:              String
        email:                  String
        phone01:                String
        phone02:                String
        address:                String
        createdAt:              Date @date(defaultFormat: "dd/mm/yyyy HH:MM:ss")
        updatedAt:              Date @date(defaultFormat: "dd/mm/yyyy HH:MM:ss")
        list_stock_accesses:    [StockAccess!]
        company:                Company
    }

    type StockAccess {
        id:             ID!
        createdAt:      Date
        updatedAt:      Date
        stock:          Stock
        # person:         Person
    }

    input contentPerson {
        first_name:     String
        last_name:      String
        email:          String
        phone01:        String
        phone02:        String
        address:        String
        company:        contentCompany
    }
`;