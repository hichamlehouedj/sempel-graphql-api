import Sequelize from 'sequelize'
import DB from '../config/DBContact'

// import models

import companyModel         from './Company'
import personModel          from "./Person";
import factorModel          from "./Factor";
import clientModel          from "./Client";
import userModel            from './User';
import authTraceModel       from './AuthTrace';
import invoiceModel         from './Invoice';
import boxModel             from './Box';
import boxTraceModel        from './BoxTrace';
import stockModel           from './Stock';
import stockAccessModel     from './StockAccess';


// Definition models and set database config and orm sequelize

const Company =         companyModel(DB, Sequelize);
const Person =          personModel(DB, Sequelize);
const Factor =          factorModel(DB, Sequelize);
const Client =          clientModel(DB, Sequelize);
const User =            userModel(DB, Sequelize);
const AuthTrace =       authTraceModel(DB, Sequelize);
const Invoice =         invoiceModel(DB, Sequelize);
const Box =             boxModel(DB, Sequelize);
const BoxTrace =        boxTraceModel(DB, Sequelize);
const Stock =           stockModel(DB, Sequelize);
const StockAccess =     stockAccessModel(DB, Sequelize);

// Relationships between tables

// Company 1 * Invoice
Company.hasOne(Invoice, { foreignKey: { name: 'id_company' } })

// Company 1 * Person
// Company.hasOne(Person, { foreignKey: { name: 'id_company' } })

// Company 1 * AuthTrace
Company.hasOne(AuthTrace, { foreignKey: { name: 'id_company' } })

// Company 1 * Stock
Company.hasOne(Stock, { foreignKey: { name: 'id_company' } })

// Person 1 0 User
Person.hasOne(User, { foreignKey: { name: 'id_person' } })

// Person 1 0 Client 
Person.hasOne(Client, { foreignKey: { name: 'id_person' } })

// Person 1 0 Factor
Person.hasOne(Factor, { foreignKey: { name: 'id_person' } })

// Stock 1 * Box
Stock.hasOne(Box, { foreignKey: { name: 'id_stock' } })

// Client 1 * Box
Client.hasOne(Box, { foreignKey: { name: 'id_client' } })

// Client 1 * Box
Box.hasOne(BoxTrace, { foreignKey: { name: 'id_box' } })

// Stock 1 * BoxTrace
Stock.hasOne(BoxTrace, { foreignKey: { name: 'id_stock' } })

// Person 1 * BoxTrace
Person.hasOne(BoxTrace, { foreignKey: { name: 'id_person' } })

// Stock 1 * BoxTrace
Stock.hasOne(StockAccess, { foreignKey: { name: 'id_stock' } })

// Person 1 * BoxTrace
Person.hasOne(StockAccess, { foreignKey: { name: 'id_person' } })




// Tables are updated without being deleted
DB.sync({ alter: true, force: false }).then(() => {
    console.log('Tables are updated without being deleted.')
})
.catch ((error) => {
    console.error('Unable to update Tables:', error);
})


export { Company, User, AuthTrace, Person, Factor, Client, Invoice, Box, BoxTrace, Stock, StockAccess }