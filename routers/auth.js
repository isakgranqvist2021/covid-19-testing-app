import express from "express";
const router = express.Router();

import { get_register, post_register } from "../controllers/auth/register";
import { get_login, post_login } from "../controllers/auth/login";

router.get("/login", get_login);
router.get("/register", get_register);
router.post("/login", post_login);
router.post("/register", post_register);

export default router;
