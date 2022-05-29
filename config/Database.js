import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    define: {
        timestamps: false
    },
    pool: {
        max: 11,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

export default db;