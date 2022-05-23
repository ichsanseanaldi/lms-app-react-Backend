import express from "express";

//controller
import { getAllAkunGuru, registerAkunGuru } from "../controllers/guru/akun_guru_controller.js";

//verification
import { verifyToken } from "../middleware/TokenVerification.js";

//routing init
const router = express.Router();

router.get('/get-akun-guru', verifyToken, getAllAkunGuru);
router.post('/register-akun', verifyToken, registerAkunGuru);

export default router;