import express from "express";
const router = express.Router();

import { get_home, pick_test } from "../controllers/index/home";
import { submit_test } from "../controllers/index/test";
import { view_test } from "../controllers/index/view-test";

router.get("/", get_home);
router.get("/pick-test/:test", pick_test);
router.post("/test/submit", submit_test);
router.get("/test/view/:id", view_test);

export default router;
