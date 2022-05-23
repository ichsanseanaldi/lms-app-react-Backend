import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const MateriJoint = db.define('joint_materi', {
    id_joint_materi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    isFinished: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

export default MateriJoint;