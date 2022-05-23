import { Sequelize } from "sequelize";

const db = new Sequelize('db_lms', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

export default db;