import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const Badges = db.define('badges', {
    id_badges: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama_badges: {
        type: DataTypes.STRING
    },
    deskripsi_badges: {
        type: DataTypes.STRING
    },
    point_badges: {
        type: DataTypes.INTEGER
    },
    badge_svg: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
})

export default Badges;