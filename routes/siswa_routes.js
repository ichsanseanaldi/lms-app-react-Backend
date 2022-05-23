import express from "express";

//controller
import { joinCourse } from "../controllers/course/course_controller.js";
import { addProfilSiswa, getBadgesSiswa, getProfilSiswa } from "../controllers/siswa/profil_siswa_controller.js";

//verification
import { verifyToken } from "../middleware/TokenVerification.js";

//router init
const router = express.Router();

router.post('/join-course', verifyToken, joinCourse);

router.get('/get-profil', verifyToken, getProfilSiswa);
router.post('/add-profil', verifyToken, addProfilSiswa);

router.get('/get-badges', verifyToken, getBadgesSiswa);


export default router;