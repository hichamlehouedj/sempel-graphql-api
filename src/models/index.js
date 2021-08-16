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
Company.hasMany(Invoice, { foreignKey: { name: 'id_company' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })
Invoice.belongsTo(Company, { foreignKey: { name: 'id_company' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })

// Company 1 * AuthTrace
Company.hasMany(AuthTrace, { foreignKey: { name: 'id_company' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })
AuthTrace.belongsTo(Company, { foreignKey: { name: 'id_company' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })

// Company 1 * Stock
Company.hasMany(Stock, { foreignKey: { name: 'id_company' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })
Stock.belongsTo(Company, { foreignKey: { name: 'id_company' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })

// Person 1 1 User
Person.hasOne(User, { foreignKey: { name: 'id_person' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
User.belongsTo(Person, { foreignKey: { name: 'id_person' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  });

// Person 1 1 Client 
Person.hasOne(Client, { foreignKey: { name: 'id_person' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })
Client.belongsTo(Person, { foreignKey: { name: 'id_person' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  });

// Person 1 1 Factor
Person.hasOne(Factor, { foreignKey: { name: 'id_person' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })
Factor.belongsTo(Person, { foreignKey: { name: 'id_person' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  });

// Client 1 * Box
Client.hasMany(Box, { foreignKey: { name: 'id_client' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })
Box.belongsTo(Client, { foreignKey: { name: 'id_client' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })

// Client 1 * Box
Box.hasMany(BoxTrace, { foreignKey: { name: 'id_box' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })
BoxTrace.belongsTo(Box, { foreignKey: { name: 'id_box' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })

// Stock 1 * BoxTrace
Stock.hasMany(BoxTrace, { foreignKey: { name: 'id_stock' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })
BoxTrace.belongsTo(Stock, { foreignKey: { name: 'id_stock' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })

// Person 1 * BoxTrace
Person.hasMany(BoxTrace, { foreignKey: { name: 'id_person' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })
BoxTrace.belongsTo(Person, { foreignKey: { name: 'id_person' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })

// Stock 1 * BoxTrace
Stock.hasMany(StockAccess, { foreignKey: { name: 'id_stock' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })
StockAccess.belongsTo(Stock, { foreignKey: { name: 'id_stock' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })

// Person 1 * BoxTrace
Person.hasMany(StockAccess, { foreignKey: { name: 'id_person' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })
StockAccess.belongsTo(Person, { foreignKey: { name: 'id_person' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  })



// Tables are updated without being deleted
DB.sync({ alter: true, force: false }).then(() => {
    console.log('Tables are updated without being deleted.')
})
.catch ((error) => {
    console.error('Unable to update Tables:', error);
})


export { Company, User, AuthTrace, Person, Factor, Client, Invoice, Box, BoxTrace, Stock, StockAccess }