import { Sequelize } from "sequelize";
import db from '../../config/Database.js'

const { DataTypes } = Sequelize;

const Akun = db.define('akun', {
    id_akun: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    },
    isNew: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default Akun;