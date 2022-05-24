import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const CourseProfilJoint = db.define('joint_siswa_course', {
    id_joint_course: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    isJoined: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
})

export default CourseProfilJoint;