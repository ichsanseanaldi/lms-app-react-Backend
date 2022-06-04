import express from 'express';

import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import db from './config/Database.js';

import admin_routes from './routes/admin_routes.js';
import authentication_routes from './routes/authentication_routes.js';
import course_routes from './routes/course_routes.js';
import guru_routes from './routes/guru_routes.js';
import siswa_routes from './routes/siswa_routes.js';

dotenv.config()

const app = express();
const PORT = 5000

try {
    await db.authenticate();
    console.log('Database Connected..');
} catch (error) {
    console.log(error);
}

app.use(cors({
    credentials: true,
    origin: true,
    // origin: 'https://app-lms.netlify.app',
}))

app.use(cookieParser());
app.use(express.json());

app.use('/auth', authentication_routes);

app.use('/admin', admin_routes)

app.use('/guru', guru_routes);

app.use('/siswa', siswa_routes);

app.use('/course', course_routes);

app.use((req, res) => {

    return res.status(404).json({ msg: 'url ga nyambung gan!' })

})

app.listen(process.env.PORT || PORT, () => console.log(`server is running in PORT ${PORT}`));