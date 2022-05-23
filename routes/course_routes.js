import express from "express";

//controller
import {
    getCourseDetailById,
    getAllCourseExercise,
    getAllCourseExerciseSoal,
    getAllCourseMateri,
    getAllCourse,
    getCourseDetailByCode,
    joinCourse,
    verifyAnswer,
    verifyMateri,
    getOneCourseExerciseByCode,
    getOneCourseExerciseById,
    getCourseMateriDetail
}
    from "../controllers/course/course_controller.js";

//verification
import { verifyToken } from "../middleware/TokenVerification.js";

//routing init
const router = express.Router();

router.get('/get-course', verifyToken, getAllCourse);

router.get('/get-course-detail/:idcourse', verifyToken, getCourseDetailById);
router.get('/get-course-detail-code/:code', verifyToken, getCourseDetailByCode);

router.get('/get-course-materi/:idcourse', verifyToken, getAllCourseMateri);
router.get('/get-course-materi-detail/:idmateri', verifyToken, getCourseMateriDetail);

router.get('/get-course-exercise/:codeexercise', verifyToken, getOneCourseExerciseByCode);
router.get('/get-course-exercise-all/:idcourse', verifyToken, getAllCourseExercise);
router.get('/get-course-exercise-id/:id', verifyToken, getOneCourseExerciseById);
router.get('/get-course-exercise/:idexercise/soal', verifyToken, getAllCourseExerciseSoal);

router.post('/verify-answer', verifyToken, verifyAnswer);

router.post('/verify-materi', verifyToken, verifyMateri)

router.post('/join', verifyToken, joinCourse)


export default router;