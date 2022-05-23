import jwt from 'jsonwebtoken'
import Akun from '../../models/akun/akun_model.js';

import ProfilGuru from "../../models/guru/profil_guru_model.js";

export const addProfilGuru = async (req, res) => {

    const { nip, namaGuru } = req.body;
    const refreshToken = req.cookies.refreshToken

    try {

        const { id_akun } = jwt.decode(refreshToken)

        const user = {
            nip: nip,
            nama_guru: namaGuru,
            id_akun: id_akun
        }

        await ProfilGuru.create(user)

        await Akun.update({ isNew: "no" }, {
            where: {
                id_akun: id_akun
            }
        })

        res.status(200).json({ msg: 'success!' })

    } catch (error) {
        console.log(error);
    }

}

export const getProfilGuru = async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    try {

        const { id_akun } = jwt.decode(refreshToken)

        const resultProfil = await ProfilGuru.findOne({
            where: {
                id_akun: id_akun,
            }
        })

        res.json(resultProfil)

    } catch (error) {

        console.log(error)

    }


}