import Sequelize from 'sequelize'
import DB from '../config/DBContact'

// import models
import boxModel  from './Box';

// Definition models and set database config and orm sequelize
const Box =  boxModel(DB, Sequelize);

// Tables are updated without being deleted
DB.sync({ alter: true, force: false }).then(() => {
    console.log('Tables are updated without being deleted.')
})
.catch ((error) => {
    console.error('Unable to update Tables:', error);
})


export { Box }