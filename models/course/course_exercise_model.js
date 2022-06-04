import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import Course from "./course_model.js";

const { DataTypes } = Sequelize;

const CourseExercise = db.define('course_exercise', {
    id_exercise: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code_exercise: {
        type: DataTypes.STRING
    },
    judul_exercise: {
        type: DataTypes.STRING
    },
    point_exercise: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
})


Course.hasMany(CourseExercise, {
    foreignKey: 'id_course'
});

export default CourseExercise;