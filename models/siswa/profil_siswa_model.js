import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

import Akun from "../akun/akun_model.js";

const { DataTypes } = Sequelize;

const ProfilSiswa = db.define('profil_siswa', {
    id_profil_siswa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama_siswa: {
        type: DataTypes.STRING
    },
    level_siswa: {
        type: DataTypes.INTEGER
    },
    point_siswa: {
        type: DataTypes.INTEGER
    },
    materi_finished: {
        type: DataTypes.INTEGER
    },
    exercise_finished: {
        type: DataTypes.INTEGER
    },
    avatarSvg: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
})

Akun.hasOne(ProfilSiswa, {
    foreignKey: 'id_akun'
})

export default ProfilSiswa;