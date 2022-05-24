import { Sequelize } from 'sequelize';
import db from "../../config/Database.js";

import Course from "./course_model.js";

const { DataTypes } = Sequelize;

const CourseMateri = db.define('course_materi', {
    id_materi: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    judul_materi: {
        type: DataTypes.STRING
    },
    isi_materi: {
        type: DataTypes.TEXT
    },
    point_materi: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
})

Course.hasMany(CourseMateri, {
    foreignKey: 'id_course'
});

export default CourseMateri;
