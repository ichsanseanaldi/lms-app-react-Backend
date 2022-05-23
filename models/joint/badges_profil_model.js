import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const BadgesProfilJoint = db.define('joint_siswa_badges', {
    id_joint_badges: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
}, {
    freezeTableName: true
})

export default BadgesProfilJoint;