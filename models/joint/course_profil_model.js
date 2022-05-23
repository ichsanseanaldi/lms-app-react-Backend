import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import Course from "../course/course_model.js";
import ProfilSiswa from "../siswa/profil_siswa_model.js";

const { DataTypes } = Sequelize;

const CourseProfilJoint = db.define('joint_siswa_course', {
    id_joint_course: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    isJoined: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
})

export default CourseProfilJoint;