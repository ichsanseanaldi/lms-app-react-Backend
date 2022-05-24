import { Sequelize } from "sequelize";

const db = new Sequelize('d62be2516j9ffi', 'zdkduqsvjvustq', '022b4240a77c98cd366757f70f628718df7d61b9575e730a0ae9c4ef644044a5', {
    host: 'ec2-52-54-212-232.compute-1.amazonaws.com',
    dialect: 'postgres',
    define: {
        timestamps: false
    }
})

export default db;