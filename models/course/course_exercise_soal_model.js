import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import CourseExercise from './course_exercise_model.js'

const { DataTypes } = Sequelize;

const CourseExerciseSoal = db.define('course_exercise_soal', {
    id_soal: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nomor_soal: {
        type: DataTypes.INTEGER,
    },
    pertanyaan_soal: {
        type: DataTypes.STRING
    },
    option_a: {
        type: DataTypes.STRING
    },
    option_b: {
        type: DataTypes.STRING
    },
    option_c: {
        type: DataTypes.STRING
    },
    option_d: {
        type: DataTypes.STRING
    },
    option_key: {
        type: DataTypes.STRING
    },
    point_soal: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
})

CourseExercise.hasMany(CourseExerciseSoal, {
    foreignKey: 'id_exercise'
});


export default CourseExerciseSoal;