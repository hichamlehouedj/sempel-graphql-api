import Sequelize from 'sequelize'
import DB from '../config/DBContact'

// import models

import companyModel from './Company'
import personModel from "./Person";
import factorModel from "./Factor";
import clientModel from "./Client";
import userModel from './User';
import authTraceModel from './AuthTrace';
import subscriptionModel from './Subscription';
import invoiceModel from './Invoice';
import boxModel from './Box';


// Definition models and set database config and orm sequelize

const Company = companyModel(DB, Sequelize);
const Person = personModel(DB, Sequelize);
const Factor = factorModel(DB, Sequelize);
const Client = clientModel(DB, Sequelize);
const User = userModel(DB, Sequelize);
const AuthTrace = authTraceModel(DB, Sequelize);
const Subscription = subscriptionModel(DB, Sequelize);
const Invoice = invoiceModel(DB, Sequelize);
const Box = boxModel(DB, Sequelize);


// Relationships between tables

// Company 1 * Subscription
Company.hasOne(Subscription, { foreignKey: { name: 'id_company' } })

// Company 1 * Invoice
Company.hasOne(Invoice, { foreignKey: { name: 'id_company' } })

// Company 1 * Person
Company.hasOne(Person, { foreignKey: { name: 'id_company' } })

// Company 1 * AuthTrace
Company.hasOne(AuthTrace, { foreignKey: { name: 'id_company' } })

// Person 1 * User
Person.hasOne(User, { foreignKey: { name: 'id_person' } })

// Person 1 * User 
Person.hasOne(Client, { foreignKey: { name: 'id_person' } })

// Person 1 * User
Person.hasOne(Factor, { foreignKey: { name: 'id_person' } })

// Client 1 * Box
Client.hasOne(Box, { foreignKey: { name: 'id_client' } })

// User 1 * Box
User.hasOne(Box, { foreignKey: { name: 'id_user' } })


// Tables are updated without being deleted
DB.sync({ alter: true, force: false }).then(() => {
    console.log('Tables are updated without being deleted.')
});


export { Company, User, AuthTrace, Subscription, Person, Factor, Client, Invoice, Box }