import bcrypt from 'bcrypt';

import Akun from '../../models/akun/akun_model.js';

export const getAllAkunSiswa = async (req, res) => {

    try {

        const query_akun = await Akun.findAll({

            where: { role: "siswa" },
            attributes: ['id_akun', 'username']

        });

        res.json(query_akun);

    } catch (error) {

        res.json({ msg: "fetch gagal!" })

    }

}

export const getAkunSiswaByUsername = async (req, res) => {

    const { username } = req.body;

    console.log(username);

    try {

        const query_akun = await Akun.findOne({

            where: {
                username: username,
                role: "siswa"
            },
            attributes: ['id_akun', 'username']

        });

        res.json(query_akun);

    } catch (error) {

        res.json({ msg: "fetch gagal!" })

    }

}

export const registerAkunSiswa = async (req, res) => {

    const { username, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {

        const user = {

            username: username,
            password: hashPassword,
            role: "siswa",
            isNew: "yes"

        }

        await Akun.create(user);

        res.json({ message: 'Register Success...' })

    } catch (error) {

        res.status(400).json({ message: error });
    }

}