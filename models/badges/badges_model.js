import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const Badges = db.define('badges', {
    id_badges: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nama_badges: {
        type: DataTypes.STRING
    },
    deskripsi_badges: {
        type: DataTypes.STRING
    },
    point_badges: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
})

export default Badges;