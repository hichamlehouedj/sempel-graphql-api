import dotenv from 'dotenv'
dotenv.config();

export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  production: {
    username: "exdgkcxb_hicham",
    password: "H0675722241h",
    database: "exdgkcxb_delivery_hash",
    logging: false
  }
}