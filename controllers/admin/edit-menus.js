import path from "path";
import fs from "fs";
import { findUser } from "../../models/user";

export async function get_edit_menus(req, res) {
    let entities = JSON.parse(
        fs.readFileSync(path.resolve("./data/entities.json"))
    );
    let departments = JSON.parse(
        fs.readFileSync(path.resolve("./data/departments.json"))
    );

    let user = await findUser({ _id: req.session.uid });

    return res.render("admin/edit-menus", { entities, departments, user });
}

export async function add_to_menu(req, res) {
    try {
        let user = await findUser({ _id: req.session.uid });

        if (user.accessLevel <= 0) {
            req.session.alert = {
                type: "danger",
                message: "you do not have permission to do that",
            };
            return res.redirect(req.headers.referer);
        }

        let fPath = `./data/${req.params.menu}.json`;

        let file = JSON.parse(fs.readFileSync(path.resolve(fPath)));
        file.push(req.body.item);
        fs.writeFileSync(path.resolve(fPath), JSON.stringify(file, null, 4));
        return res.redirect(req.headers.referer);
    } catch (err) {
        req.session.alert = { type: "danger", message: "an error occured" };
        return res.redirect(req.headers.referer);
    }
}

export async function remove_from_menu(req, res) {
    try {
        let user = await findUser({ _id: req.session.uid });

        if (user.accessLevel <= 0) {
            req.session.alert = {
                type: "danger",
                message: "you do not have permission to do that",
            };
            return res.redirect(req.headers.referer);
        }

        let fPath = `./data/${req.params.menu}.json`;
        let file = JSON.parse(fs.readFileSync(path.resolve(fPath)));
        file.splice(req.params.index, 1);
        fs.writeFileSync(path.resolve(fPath), JSON.stringify(file, null, 4));

        return res.redirect(req.headers.referer);
    } catch (err) {
        req.session.alert = { type: "danger", message: "an error occured" };
        return res.redirect(req.headers.referer);
    }
}
