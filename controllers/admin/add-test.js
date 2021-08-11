import path from "path";
import fs from "fs";

import { submit_test } from "../index/test";

export async function add_test(req, res) {
    let entities = JSON.parse(
        fs.readFileSync(path.resolve("./data/entities.json"))
    );
    let departments = JSON.parse(
        fs.readFileSync(path.resolve("./data/departments.json"))
    );

    return res.render("admin/add-test", {
        entities,
        departments,
    });
}

export async function submit_test_admin(req, res) {
    req.body.admin = true;
    return submit_test(req, res);
}
