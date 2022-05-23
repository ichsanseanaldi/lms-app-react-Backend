import express from "express";

//controller
import { addCourse, addCourseExercise, addCourseExerciseSoal, addCourseMateri } from "../controllers/course/course_controller.js";
import { addProfilGuru, getProfilGuru } from "../controllers/guru/profil_guru_controller.js";
import { getAkunSiswaByUsername, getAllAkunSiswa, registerAkunSiswa } from "../controllers/siswa/akun_siswa_controller.js";

//verification
import { verifyToken } from "../middleware/TokenVerification.js";

//router init
const router = express.Router();

router.get('/get-profil', verifyToken, getProfilGuru);
router.post('/add-profil', verifyToken, addProfilGuru);

router.get('/get-akun-siswa', verifyToken, getAllAkunSiswa);
router.post('/add-akun-siswa', verifyToken, registerAkunSiswa);

router.post('/add-course', verifyToken, addCourse);
router.post('/add-materi', verifyToken, addCourseMateri);
router.post('/add-exercise', verifyToken, addCourseExercise);
router.post('/add-exercise-soal', verifyToken, addCourseExerciseSoal);

export default router;