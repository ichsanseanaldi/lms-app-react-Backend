import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

import Akun from '../../models/akun/akun_model.js';

const checkRole = (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    const { role } = jwt.decode(refreshToken);

    if (role !== 'admin') return res.status(403).json({ msg: 'admin only' });

}

export const getAllAkun = async (req, res) => {

    checkRole(req, res);

    try {

        const query_akun = await Akun.findAll({
            where: {
                role: {
                    [Op.or]: ['guru', 'siswa']
                }
            },
            attributes: ['id_akun', 'username', 'role']
        });

        console.log(query_akun);

        if (query_akun.length > 0) {

            res.json(query_akun);
        }
        else {
            res.status(400).json({ msg: 'akun empty' })
        }

    } catch (error) {

        console.log(error);
        res.status(400).json(error)

    }

}

export const registerAkunGuru = async (req, res) => {

    checkRole(req, res);

    const { username, password } = req.body;

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);

    try {

        const user = {
            username: username,
            password: hashPassword,
            role: "guru",
            isNew: "yes"

        }

        await Akun.create(user);

        res.json({ message: 'Register Success...' });

    } catch (error) {

        console.log(error);

        res.status(400).json({ message: error.errors[0].message });

    }

}

export const deleteAkun = async (req, res) => {

    checkRole(req, res);

    const { id } = req.params;

    console.log(id);

    try {

        const query_all = await Akun.destroy({
            where: {
                id_akun: id
            }
        })

        if (query_all) return res.json({ msg: 'berhasil menghapus akun!' });

    } catch (error) {

        console.log(error);

        res.status(400).json(error);


    }



}