import express from "express";
const router = express.Router();

import { get_dashboard } from "../controllers/admin/dashboard";
import {
    get_login,
    get_register,
    post_login,
    post_register,
    logout,
} from "../controllers/admin/auth";

router.get("/dashboard", get_dashboard);

router.get("/login", get_login);
router.get("/register", get_register);

router.post("/login", post_login);
router.post("/register", post_register);

router.get("/logout", logout);

export default router;
