import Sequelize from 'sequelize';
import Config from './config';

export default new Sequelize(
    Config.development.database, 
    Config.development.username, 
    Config.development.password, 
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        logging: false,
    }
);