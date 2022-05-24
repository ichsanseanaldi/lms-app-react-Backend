import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Akun from '../../models/akun/akun_model.js';

const checkRole = (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    const { role } = jwt.decode(refreshToken);

    if (role !== 'admin') return res.status(403).json({ msg: 'admin only' });

}


export const getAllAkunGuru = async (req, res) => {

    checkRole(req, res);

    try {

        const query_akun = await Akun.findAll({

            where: { role: "guru" },
            attributes: ['id_akun', 'username']

        });

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

    checkRole(req);

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