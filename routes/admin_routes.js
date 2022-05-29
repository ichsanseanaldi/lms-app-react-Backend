import express from "express";

import { deleteAkun, getAllAkun, registerAkunGuru } from "../controllers/guru/akun_guru_controller.js";

import { verifyToken } from "../middleware/TokenVerification.js";

const router = express.Router();

router.get('/get-akun', verifyToken, getAllAkun);
router.post('/register-akun', verifyToken, registerAkunGuru);
router.delete('/delete-akun/:id', verifyToken, deleteAkun);

export default router;