import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Akun from "../../models/akun/akun_model.js";

export const Login = async (req, res) => {

    try {

        const query_akun = await Akun.findOne({
            where: {
                username: req.body.username
            }
        })

        if (!query_akun) return res.status(400).json({ msg: 'Akun tidak ditemukan!' })

        const matchPassword = await bcrypt.compare(req.body.password, query_akun.password);

        if (!matchPassword) return res.json({ msg: "password salah" });

        const user_info = {
            id_akun: query_akun.id_akun,
            username: query_akun.username,
            role: query_akun.role,
            isNew: query_akun.isNew
        }

        const accessToken = jwt.sign(user_info, process.env.ACCESS_TOKEN, {
            expiresIn: '30s'
        })

        const refreshToken = jwt.sign(user_info, process.env.REFRESH_TOKEN, {
            expiresIn: '2h'
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            // secure: true,
            // sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken: accessToken });

    } catch (error) {

        res.status(400).json({ msg: "error gan!", error: error })

    }

}

export const Logout = async (req, res) => {

    try {

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) return res.status(204).json({ msg: 'Token is missing or expired' });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {

            if (err) return res.json({ msg: "please login!" });

            res.clearCookie('refreshToken', {
                httpOnly: true,
                // secure: true,
                // sameSite: 'None',
            });

            return res.sendStatus(200);

        })

    } catch (error) {

        res.sendStatus(400);

    }

}