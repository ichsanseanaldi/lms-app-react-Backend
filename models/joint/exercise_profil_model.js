import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import CourseExercise from "../course/course_exercise_model.js";
import ProfilSiswa from "../siswa/profil_siswa_model.js";

const { DataTypes } = Sequelize;

const ExerciseJoint = db.define('joint_exercise', {
    id_joint_exercise: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    isFinished: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

export default ExerciseJoint;