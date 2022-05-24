import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const ExerciseJoint = db.define('joint_exercise', {
    id_joint_exercise: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    isFinished: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

export default ExerciseJoint;