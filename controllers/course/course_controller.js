import jwt from 'jsonwebtoken';

import CourseExercise from "../../models/course/course_exercise_model.js";
import CourseExerciseSoal from '../../models/course/course_exercise_soal_model.js';
import CourseMateri from "../../models/course/course_materi_model.js";
import Course from "../../models/course/course_model.js";
import ProfilGuru from '../../models/guru/profil_guru_model.js';


import { BadgesProfilJoint, CourseProfilJoint, MateriJoint, ExerciseJoint } from '../../models/index.js';
import ProfilSiswa from '../../models/siswa/profil_siswa_model.js';
import { Op, where } from 'sequelize';
import Badges from '../../models/badges/badges_model.js';

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

//?=================================================================================================================

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
            id_course: idcourse

        }

        await CourseExercise.create(exercise);

        res.status(200).json({ msg: 'exercise initialized!' })


    } catch (error) {
        console.log(error);
        res.status(403).json('query error gan!')
    }

}

//?=================================================================================================================

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

        await CourseExerciseSoal.create(soal);

        res.status(200).json({ msg: 'soal udah ditambahin bosqu!' })


    } catch (error) {
        console.log(error);
        res.status(403).json('query error gan!')
    }

}

//?=================================================================================================================

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
                res.sendStatus(400);
            }

        }

        if (role === "siswa") {

            const { id_profil_siswa } = await ProfilSiswa.findOne({
                where: {
                    id_akun: id_akun
                }
            })

            const coursejoint = await CourseProfilJoint.findAll({ include: Course }, {
                where: {
                    id_profil_siswa: id_profil_siswa
                }
            })

            if (coursejoint.length > 0) {
                res.json(coursejoint);
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

//?=================================================================================================================

export const getCourseDetailByCode = async (req, res) => {

    const { code } = req.params;

    try {


        const coursedetail = await Course.findOne({
            where: {
                code_course: code
            }
        })

        const joint = await CourseProfilJoint.findOne({
            where: {
                id_course: coursedetail.id_course
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

//?=================================================================================================================

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

//?=================================================================================================================

export const getAllCourseMateri = async (req, res) => {

    const { idcourse } = req.params;

    try {
        const coursemateri = await CourseMateri.findAll({
            where: {
                id_course: idcourse
            }
        })


        if (coursemateri.length > 0) {
            res.json(coursemateri)
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

//?=================================================================================================================

export const getCourseMateriDetail = async (req, res) => {

    const { idmateri } = req.params;
    const refreshToken = req.cookies.refreshToken;



    try {

        const { id_akun, role } = jwt.decode(refreshToken);

        const materi = await CourseMateri.findOne({
            where: {
                id_materi: idmateri
            }
        }
        )

        if (role === 'siswa') {

            const profil = await ProfilSiswa.findOne({
                where: {
                    id_akun: id_akun
                }
            })

            const joint = await MateriJoint.findOne({
                where: {
                    [Op.and]: [
                        { id_profil_siswa: profil.id_profil_siswa },
                        { id_materi: idmateri }
                    ]
                }
            })

            res.json({ joint, materi });
        }
        if (role === 'guru') {
            res.json({ joint: null, materi })
        }
    }
    catch (err) {
        console.log(err);
        res.status(403).json('query error gan!')
    }

}

//?=================================================================================================================

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

//?=================================================================================================================

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

//?=================================================================================================================

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

            const joint = await ExerciseJoint.findAll({ include: CourseExercise }, {
                where: {

                    id_profil_siswa: queryprofil.id_profil_siswa

                }
            })

            if (joint.length > 0) {
                res.json(joint)
            }
            else {
                res.sendStatus(400);
            }


        }
        if (role === 'guru') {

            if (courseexercise.length > 0) {
                res.json(courseexercise)
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

//?=================================================================================================================

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

//?=================================================================================================================

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

//?=================================================================================================================verifyanswer

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

        const queryupdate = await ExerciseJoint.update({ isFinished: "true" }, {
            where: {
                [Op.and]: [
                    { id_profil_siswa: id_profil_siswa },
                    { id_exercise: idexercise }
                ]
            }
        })

        const pointFinal = parseInt(point_siswa) + point;

        const addedSoal = parseInt(exercise_finished) + 1

        const newlevel = levelUp(pointFinal);

        const profilupdate = await ProfilSiswa.update(
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

        const pointBadges = newlevel * 100;

        const badgesquery = await Badges.findAll({
            where: {
                [Op.or]: [
                    { point_badges: pointBadges },
                    { soal_count: addedSoal },

                ]

            }
        })

        console.log(pointBadges);
        console.log('badgesquery', badgesquery);

        const arr = JSON.parse(JSON.stringify(badgesquery));

        const option = arr.map(e => {
            return {
                id_profil_siswa: id_profil_siswa,
                id_badges: e.id_badges
            }
        })

        console.log('option', option.length);

        const check = await BadgesProfilJoint.findOne({
            where: {
                [Op.and]: option,
            }

        })

        if (option.length > 0 && !check) {

            await BadgesProfilJoint.bulkCreate(option)

            res.status(200).json({ msg: 'Badges telah didapatkan!' })

        }
        else {
            console.log('Badge sudah ada atau belum memenuhi');
            res.status(200).json({ msg: 'Badges sudah ada atau belum memenuhi' })

        }



    } catch (error) {

        console.log(error);
        res.status(200).json('badges sudah ada')

    }

}

//?==============================================================================================================

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

        const query = await MateriJoint.update({ isFinished: "true" }, {
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

        const updateProfil = await ProfilSiswa.update({
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

        console.log('option')

        const check = await BadgesProfilJoint.findOne({
            where: {
                [Op.and]: option,
            }

        })

        if (option.length > 0 && !check) {

            await BadgesProfilJoint.bulkCreate(option)
            res.status(200).json({ msg: 'Badges telah didapatkan!' })

        }
        else {
            console.log('Badges sudah ada atau belum memenuhi');
            res.status(200).json({ msg: 'Badges sudah ada atau belum memenuhi' })
        }


    } catch (error) {

        console.log(error);
        res.status(200).json('badges sudah ada')

    }


}

//*===========================================FUNCTION===================================================================

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
