import express from "express";
const router = express.Router();

import logout from "../controllers/admin/logout";
import view_test from "../controllers/admin/view-test";
import update_test from "../controllers/admin/update-test";
import delete_test from "../controllers/admin/delete-test";
import export_csv from "../controllers/admin/export-csv";
import graph_data from "../controllers/admin/graph-data";
import { add_test, submit_test_admin } from "../controllers/admin/add-test";
import {
    get_edit_menus,
    add_to_menu,
    remove_from_menu,
} from "../controllers/admin/edit-menus";
import {
    get_dashboard,
    post_dashboard_filter,
} from "../controllers/admin/dashboard";

router.get("/logout", logout);
router.get("/dashboard", get_dashboard);
router.post("/dashboard/filter", post_dashboard_filter);
router.get("/view-test/:id", view_test);
router.post("/update-test", update_test);
router.get("/delete-test/:id", delete_test);
router.get("/add-test", add_test);
router.post("/add-test", submit_test_admin);
router.post("/export-csv", export_csv);
router.get("/edit-menus", get_edit_menus);
router.post("/edit-menus/:menu", add_to_menu);
router.get("/remove-from-menu/:menu/:index", remove_from_menu);
router.get("/graph-data", graph_data);

export default router;
