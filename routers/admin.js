import express from "express";
const router = express.Router();

import logout from "../controllers/admin/logout";
import get_dashboard from "../controllers/admin/dashboard";
import view_test from "../controllers/admin/view-test";
import update_test from "../controllers/admin/update-test";
import delete_test from "../controllers/admin/delete-test";
import { add_test, submit_test_admin } from "../controllers/admin/add-test";

router.get("/logout", logout);
router.get("/dashboard", get_dashboard);
router.get("/view-test/:id", view_test);
router.post("/update-test", update_test);
router.get("/delete-test/:id", delete_test);
router.get("/add-test", add_test);
router.post("/add-test", submit_test_admin);

export default router;
