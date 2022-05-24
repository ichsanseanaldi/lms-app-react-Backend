import { Sequelize } from "sequelize";

const db = new Sequelize('lms_db', 'postgres', 'update123', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false
    }
})

export default db;