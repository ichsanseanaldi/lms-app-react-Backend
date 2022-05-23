import jwt from 'jsonwebtoken'
import ProfilSiswa from "../../models/siswa/profil_siswa_model.js";
import Akun from '../../models/akun/akun_model.js';
import { BadgesProfilJoint } from '../../models/index.js';
import Badges from '../../models/badges/badges_model.js'

export const addProfilSiswa = async (req, res) => {

    const { namaSiswa } = req.body;
    const refreshToken = req.cookies.refreshToken

    try {

        const { id_akun } = jwt.decode(refreshToken)

        const user = {
            nama_siswa: namaSiswa,
            level_siswa: 1,
            point_siswa: 0,
            materi_finished: 0,
            exercise_finished: 0,
            course_finished: 0,
            id_akun: id_akun
        }

        await ProfilSiswa.create(user)

        await Akun.update({ isNew: "no" }, {
            where: {
                id_akun: id_akun
            }
        })

        await ProfilSiswa.update({
            point_siswa: 100
        }, {
            where: {
                id_akun: id_akun
            }
        })

        const { id_profil_siswa } = await ProfilSiswa.findOne({
            where: {
                id_akun: id_akun
            }
        })

        const badgesupdate = await BadgesProfilJoint.create({
            id_profil_siswa: id_profil_siswa,
            id_badges: 1
        })

        res.status(200).json({ msg: 'success!' })

    } catch (error) {
        console.log(error);
    }

}

export const getProfilSiswa = async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    try {

        const { id_akun } = jwt.decode(refreshToken)

        const resultProfil = await ProfilSiswa.findOne({
            where: {
                id_akun: id_akun
            }
        })

        res.json(resultProfil)

    } catch (error) {

        console.log(error)

    }

}

export const getBadgesSiswa = async (req, res) => {

    const refreshToken = req.cookies.refreshToken;


    try {

        const { id_akun } = jwt.decode(refreshToken)

        const resultProfil = await ProfilSiswa.findOne({
            where: {
                id_akun: id_akun
            }
        })

        const queryjoint = await BadgesProfilJoint.findAll({ include: Badges }, {
            where: {
                id_profil_siswa: resultProfil.id_profil_siswa
            }
        })

        if (queryjoint.length > 0) {
            res.json(queryjoint)
        }
        else {
            res.sendStatus(400);
        }


    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }


}