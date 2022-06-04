import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

import CourseExercise from "../../models/course/course_exercise_model.js";
import CourseExerciseSoal from '../../models/course/course_exercise_soal_model.js';
import CourseMateri from "../../models/course/course_materi_model.js";
import Course from "../../models/course/course_model.js";
import ProfilGuru from '../../models/guru/profil_guru_model.js';
import ProfilSiswa from '../../models/siswa/profil_siswa_model.js';
import Badges from '../../models/badges/badges_model.js';
import { BadgesProfilJoint, CourseProfilJoint, MateriJoint, ExerciseJoint } from '../../models/index.js';

export const addCourse = async (req, res) => {

    const { codeCourse, judulCourse, deskripsiCourse, idProfil } = req.body;

    try {

        const course = {
            code_course: codeCourse,
            judul_course: judulCourse,
            deskripsi_course: deskripsiCourse,
            id_profil_guru: idProfil
        }

        await Course.create(course)

        res.status(200).json({ msg: 'course created!' })

    } catch (error) {
        console.log(error);
        res.status(403).json('query error gan!')
    }

}

export const addCourseMateri = async (req, res) => {

    const { judulMateri, isiMateri, pointMateri, idCourse } = req.body;

    try {

        const materi = {
            judul_materi: judulMateri,
            isi_materi: isiMateri,
            point_materi: pointMateri,
            id_course: idCourse
        }

        await CourseMateri.create(materi)

        res.status(200).json({ msg: 'materi created!' })

    } catch (error) {
        console.log(error);
        res.status(403).json('query error gan!')
    }

}

export const addCourseExercise = async (req, res) => {


    const { codeExercise, judulExercise, idcourse } = req.body;

    try {

        const exercise = {

            code_exercise: codeExercise,
            judul_exercise: judulExercise,
            point_exercise: 0,
            id_course: idcourse

        }

        await CourseExercise.create(exercise);

        res.status(200).json({ msg: 'exercise initialized!' })

    } catch (error) {
        console.log(error);
        res.status(403).json('query error gan!')
    }

}

export const addCourseExerciseSoal = async (req, res) => {

    const { nomorSoal, pertanyaanSoal, optionA, optionB, optionC, optionD, optionKey, pointSoal, idExercise } = req.body;

    try {

        const soal = {

            nomor_soal: nomorSoal,
            pertanyaan_soal: pertanyaanSoal,
            option_a: optionA,
            option_b: optionB,
            option_c: optionC,
            option_d: optionD,
            option_key: optionKey,
            point_soal: pointSoal,
            id_exercise: idExercise
        }

        const query = await CourseExercise.findOne({
            where: {
                id_exercise: idExercise
            }
        })

        const addPoint = parseInt(query.point_exercise) + parseInt(pointSoal)

        await CourseExerciseSoal.create(soal);

        await CourseExercise.update({
            point_exercise: addPoint
        }, {
            where: {
                id_exercise: query.id_exercise
            }
        }
        )
        res.status(200).json({ msg: 'soal udah ditambahin bosqu!' })
    } catch (error) {
        console.log(error);
        res.status(403).json('query error gan!')
    }

}

export const getAllCourse = async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    try {

        const { role, id_akun } = jwt.decode(refreshToken);

        if (role === "guru") {

            const { id_profil_guru } = await ProfilGuru.findOne({
                where: {
                    id_akun: id_akun
                }
            })

            const course = await Course.findAll({
                where: {
                    id_profil_guru: id_profil_guru
                }
            })

            if (course.length > 0) {
                res.json(course);
            }
            else {
                res.json(['']);
            }

        }

        if (role === "siswa") {

            const { id_profil_siswa } = await ProfilSiswa.findOne({
                where: {
                    id_akun: id_akun
                }
            })

            const coursejoint = await CourseProfilJoint.findAll({
                include: Course,
                where: {
                    id_profil_siswa: id_profil_siswa
                }
            })

            if (coursejoint.length > 0) {
                res.json(coursejoint);
            }
            else {
                res.json(['']);
            }
        }

    }
    catch (err) {
        console.log(err);
        res.status(403).json('query error gan!')
    }

}

export const getCourseDetailByCode = async (req, res) => {

    const { code } = req.params;
    const refreshToken = req.cookies.refreshToken;

    try {

        const { id_akun } = jwt.decode(refreshToken);

        const { id_profil_siswa } = await ProfilSiswa.findOne({
            where: {
                id_akun: id_akun
            }
        })

        const coursedetail = await Course.findOne({
            where: {
                code_course: code
            }
        })

        const joint = await CourseProfilJoint.findOne(
            {
                include: {
                    model: Course,
                    where: {
                        code_course: code
                    }
                },
                where: {
                    id_profil_siswa: id_profil_siswa
                }
            })

        const materi = await CourseMateri.findAll({
            where: {
                id_course: coursedetail.id_course
            }
        })

        const exercise = await CourseExercise.findAll({
            where: {
                id_course: coursedetail.id_course
            }
        })

        res.json({ coursedetail, joint, materi, exercise });

    }
    catch (err) {
        console.log(err);
        res.status(403).json('query error gan!')
    }

}

export const getCourseDetailById = async (req, res) => {

    const { idcourse } = req.params;

    try {
        const coursedetail = await Course.findAll({
            where: {
                id_course: idcourse
            }
        })

        if (coursedetail.length > 0) {
            res.json(coursedetail)
        }
        else {
            res.sendStatus(400);
        }


    }
    catch (err) {
        console.log(err);
        res.status(403).json('query error gan!')
    }

}

export const getAllCourseMateri = async (req, res) => {

    const { idcourse } = req.params;
    const refreshToken = req.cookies.refreshToken;

    try {

        const { id_akun, role } = jwt.decode(refreshToken);

        const materi = await CourseMateri.findAll({
            where: {
                id_course: idcourse
            }
        })

        if (role === 'siswa') {

            const profil = await ProfilSiswa.findOne({
                where: {
                    id_akun: id_akun
                }
            })

            const joint = await MateriJoint.findAll({
                include: {
                    model: CourseMateri,
                    where: { id_course: idcourse }
                },
                where: {
                    id_profil_siswa: profil.id_profil_siswa

                }
            }
            )

            res.json(joint);
        }

        if (role === 'guru') {

            res.json(materi)
        }


    }
    catch (err) {
        console.log(err);
        res.status(403).json('query error gan!')
    }

}

export const getOneCourseExerciseByCode = async (req, res) => {

    const { codeexercise } = req.params;

    try {

        const courseexercise = await CourseExercise.findOne({
            where: {
                code_exercise: codeexercise
            }
        })

        res.json(courseexercise)

    } catch (error) {

        console.log(error);

    }

}

export const getOneCourseExerciseById = async (req, res) => {

    const { id } = req.params;

    try {

        const courseexercise = await CourseExercise.findOne({
            where: {
                id_exercise: id
            }
        })

        res.json(courseexercise)

    } catch (error) {

        console.log(error);

    }

}

export const getAllCourseExercise = async (req, res) => {

    const { idcourse } = req.params;
    const refreshToken = req.cookies.refreshToken;

    try {

        const { id_akun, role } = jwt.decode(refreshToken)

        const courseexercise = await CourseExercise.findAll({
            where: {
                id_course: idcourse
            }
        })

        if (role === 'siswa') {

            const queryprofil = await ProfilSiswa.findOne({
                where: {
                    id_akun: id_akun
                }
            })

            const joint = await ExerciseJoint.findAll({
                include: CourseExercise,
                where: {
                    id_profil_siswa: queryprofil.id_profil_siswa
                }
            })

            if (joint.length > 0) {
                res.json(joint)
            }
            else {
                res.json([]);
            }

        }
        if (role === 'guru') {
            if (courseexercise.length > 0) {
                res.json(courseexercise)
            }
            else {
                res.json([]);
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(403).json('query error gan!')
    }

}

export const getAllCourseExerciseSoal = async (req, res) => {

    const { idexercise } = req.params;
    const refreshToken = req.cookies.refreshToken;

    try {

        const { role } = jwt.decode(refreshToken);

        if (role === 'guru') {
            const soalexercise = await CourseExerciseSoal.findAll({
                where: {
                    id_exercise: idexercise
                }
            })
            if (soalexercise.length > 0) {
                res.json(soalexercise)
            }
            else {
                res.sendStatus(400);
            }
        }
        else {
            const soalexercise = await CourseExerciseSoal.findAll({
                where: {
                    id_exercise: idexercise
                },
                attributes: {
                    exclude: ['option_key']
                }
            })
            if (soalexercise.length > 0) {
                res.json(soalexercise)
            }
            else {
                res.sendStatus(400);
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(403).json('query error gan!')
    }
}

export const joinCourse = async (req, res) => {

    const { idcourse } = req.body;
    const refreshToken = req.cookies.refreshToken;

    try {

        const { id_akun } = jwt.decode(refreshToken);

        const { id_profil_siswa } = await ProfilSiswa.findOne({
            where: {
                id_akun: id_akun
            }
        })

        const record = {

            id_profil_siswa: id_profil_siswa,
            id_course: idcourse,
            isJoined: "true"

        }

        const query_check_once = await CourseProfilJoint.findOne({
            where: record
        })

        if (query_check_once) return res.status(403).json({ msg: 'sudah join!' });

        const query_materi = await CourseMateri.findAll({
            where: {
                id_course: idcourse
            }
        })

        const query_exercise = await CourseExercise.findAll({
            where: {
                id_course: idcourse
            }
        })

        const arr_materi = JSON.parse(JSON.stringify(query_materi));

        const arr_exercise = JSON.parse(JSON.stringify(query_exercise));

        const materi_option = arr_materi.map(e => {
            return {
                isFinished: 'false',
                id_profil_siswa: id_profil_siswa,
                id_materi: e.id_materi
            }
        })

        const exercise_option = arr_exercise.map(e => {
            return {
                isFinished: 'false',
                id_profil_siswa: id_profil_siswa,
                id_exercise: e.id_exercise
            }
        })

        await MateriJoint.bulkCreate(materi_option)

        await ExerciseJoint.bulkCreate(exercise_option)

        await CourseProfilJoint.create(record);

        res.status(200).json({ msg: 'join success!' });

    } catch (error) {
        console.log(error);
        res.status(403).json('query error gan!')
    }

}

export const verifyAnswer = async (req, res) => {

    const { jawaban, idexercise } = req.body;
    const refreshToken = req.cookies.refreshToken;

    try {

        const { id_akun } = jwt.decode(refreshToken);

        const query = await CourseExerciseSoal.findAll({
            where: {
                id_exercise: idexercise,

            }
        })

        const { id_profil_siswa, point_siswa, exercise_finished } = await ProfilSiswa.findOne({
            where: {
                id_akun: id_akun
            }
        })

        const query_result = JSON.parse(JSON.stringify(query));

        let point = 0, benar = 0, salah = 0;

        for (let i = 0; i < query_result.length; i++) {
            if (jawaban[i].idSoal == query_result[i].id_soal) {
                if (jawaban[i].answer === query_result[i].option_key) {
                    point = point + query_result[i].point_soal
                    benar++;
                }
                else {
                    salah++;
                }
            }
        }

        const pointFinal = parseInt(point_siswa) + point;

        const addedSoal = parseInt(exercise_finished) + 1

        const newlevel = levelUp(pointFinal);

        await ProfilSiswa.update(
            {
                point_siswa: pointFinal,
                exercise_finished: addedSoal,
                level_siswa: newlevel
            },
            {
                where: {
                    id_profil_siswa: id_profil_siswa
                }
            }
        )

        await ExerciseJoint.update({ isFinished: "true" }, {
            where: {
                [Op.and]: [
                    { id_profil_siswa: id_profil_siswa },
                    { id_exercise: idexercise }
                ]
            }
        })

        const pointBadges = newlevel * 100;

        const badgesquery = await Badges.findAll({
            where: {
                [Op.or]: [
                    { point_badges: pointBadges },
                    { soal_count: addedSoal },
                ]
            }
        })

        const arr = JSON.parse(JSON.stringify(badgesquery));

        const option = arr.map(e => {
            return {
                id_profil_siswa: id_profil_siswa,
                id_badges: e.id_badges
            }
        })

        const check = await BadgesProfilJoint.findAll({
            where: {
                [Op.or]: option,
            }
        })

        const filtered = option.filter(e => e.id_badges !== arr[0].id_badges);

        const filteredToSend = arr.filter(e => e.id_badges !== arr[0].id_badges);

        if (check.length === 1) {
            await BadgesProfilJoint.create(filtered[0])
            res.json({ data: filteredToSend, result: { benar, salah, point } });
        }
        else {
            await BadgesProfilJoint.bulkCreate(option)
            res.json({ data: badgesquery, result: { benar, salah, point } })
        }

    } catch (error) {
        console.log(error);
        res.json(error);
    }

}

export const verifyMateri = async (req, res) => {

    const { idmateri, pointmateri } = req.body;

    const refreshToken = req.cookies.refreshToken

    try {

        const { id_akun } = jwt.decode(refreshToken);

        const { id_profil_siswa, materi_finished, point_siswa } = await ProfilSiswa.findOne({
            where: {
                id_akun: id_akun
            }
        })

        await MateriJoint.update({ isFinished: "true" }, {
            where: {
                [Op.and]: [
                    { id_profil_siswa: id_profil_siswa },
                    { id_materi: idmateri }
                ]
            }
        })

        const pointResult = parseInt(point_siswa) + parseInt(pointmateri);

        const materiFinished = parseInt(materi_finished) + 1;

        const newlevel = levelUp(pointResult);

        await ProfilSiswa.update({
            materi_finished: materiFinished,
            point_siswa: pointResult,
            level_siswa: newlevel
        },
            {
                where: {
                    id_profil_siswa: id_profil_siswa
                }
            }
        )

        const pointBadges = newlevel * 100;

        const badgesquery = await Badges.findAll({
            where: {
                [Op.or]: [
                    { point_badges: pointBadges },
                    { materi_count: materiFinished },
                ]

            }
        })

        const arr = JSON.parse(JSON.stringify(badgesquery));

        const option = arr.map(e => {
            return {
                id_profil_siswa: id_profil_siswa,
                id_badges: e.id_badges
            }
        })

        const check = await BadgesProfilJoint.findAll({
            where: {
                [Op.or]: option,
            }

        })

        const filtered = option.filter(e => e.id_badges !== arr[0].id_badges);

        const filteredToSend = arr.filter(e => e.id_badges !== arr[0].id_badges);

        if (check.length === 1) {
            await BadgesProfilJoint.create(filtered[0])
            res.json({ data: filteredToSend })
        }
        else {
            await BadgesProfilJoint.bulkCreate(option)
            res.json({ data: badgesquery })
        }

    } catch (error) {
        console.log(error);
        res.status(200).json(error)
    }
}

function levelUp(e) {

    const point = Math.floor(parseInt(e) / 100) * 100;

    let newlevel = point / 100;

    if (newlevel <= 10) {
        return newlevel;
    }
    else {
        return 10;
    }

}