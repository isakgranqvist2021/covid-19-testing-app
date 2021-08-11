import path from "path";
import fs from "fs";

export async function get_edit_menus(req, res) {
    let entities = JSON.parse(
        fs.readFileSync(path.resolve("./data/entities.json"))
    );
    let departments = JSON.parse(
        fs.readFileSync(path.resolve("./data/departments.json"))
    );
    return res.render("admin/edit-menus", { entities, departments });
}

export async function post_edit_menus(req, res) {
    return res.redirect(req.headers.referer);
}
