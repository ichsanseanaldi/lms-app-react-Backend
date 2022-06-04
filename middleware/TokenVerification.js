import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

    const refreshToken = req.cookies.refreshToken;

    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(' ')[1];

    if (token === null || !refreshToken) return res.status(403).json({ msg: 'token is empty, please login!' });

    jwt.verify(token, process.env.ACCESS_TOKEN, err => {
        if (err) return res.status(403).json({ msg: "token is not verified!" });
        next();
    })

}