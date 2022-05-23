import jwt from 'jsonwebtoken';

export const getNewToken = async (req, res) => {

    try {

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) return res.json({ msg: 'please login!' });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {

            if (err) return res.json({ msg: 'something wrong!' });

            const user_info = {
                id_akun: decoded.id,
                username: decoded.username,
                role: decoded.role,
                isNew: decoded.isNew
            }

            const newAccessToken = jwt.sign(user_info, process.env.ACCESS_TOKEN, {
                expiresIn: '20s'
            })

            res.json({ accessToken: newAccessToken });

        })



    } catch (error) {

        res.sendStatus(400);
    }


}