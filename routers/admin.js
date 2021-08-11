import express from "express";
const router = express.Router();

import { logged_in, logged_out } from "../middlewares/middlewares";

import { get_dashboard } from "../controllers/admin/dashboard";
import {
    get_login,
    get_register,
    post_login,
    post_register,
    logout,
} from "../controllers/admin/auth";

router.get("/login", logged_out, get_login);
router.get("/register", logged_out, get_register);
router.post("/login", logged_out, post_login);
router.post("/register", logged_out, post_register);

router.get("/logout", logged_in, logout);
router.get("/dashboard", logged_in, get_dashboard);

export default router;
