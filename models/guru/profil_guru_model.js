import { Sequelize } from "sequelize"
import db from "../../config/Database.js";

import Akun from "../akun/akun_model.js";


const { DataTypes } = Sequelize;

const ProfilGuru = db.define('profil_guru', {
    id_profil_guru: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nip: {
        type: DataTypes.STRING
    },
    nama_guru: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

Akun.hasOne(ProfilGuru, {
    foreignKey: 'id_akun'
});

export default ProfilGuru;