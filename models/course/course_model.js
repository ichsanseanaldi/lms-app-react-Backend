import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import ProfilGuru from "../guru/profil_guru_model.js";

const { DataTypes } = Sequelize;

const Course = db.define('course', {
    id_course: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    code_course: {
        type: DataTypes.INTEGER
    },
    judul_course: {
        type: DataTypes.STRING
    },
    deskripsi_course: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

ProfilGuru.hasMany(Course, {
    foreignKey: 'id_profil_guru'
});

export default Course;