import express from "express";

import { Login, Logout } from "../controllers/authentication/auth_controller.js";
import { getNewToken } from "../controllers/authentication/refresh_controller.js";

const router = express.Router();

router.post('/login', Login);

router.delete('/logout', Logout);

router.get('/refresh', getNewToken);

export default router;