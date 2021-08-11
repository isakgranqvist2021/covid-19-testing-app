import fs from "fs";
import path from "path";

import { register, login } from "../../models/user";

export async function get_login(req, res) {
    return res.render("admin/login", {});
}

export async function get_register(req, res) {
    return res.render("admin/register", {});
}

export async function post_register(req, res) {
    let accessCode = JSON.parse(
        fs.readFileSync(path.resolve("./data/access-code.json"))
    );

    if (req.body.accessCode !== accessCode.accessCode) {
        req.session.alert = {
            type: "danger",
            message:
                "invalid access code. entering the wrong access code too many times will result in a timout",
        };
        return res.redirect(req.headers.referer);
    }

    try {
        let user = await register(req.body);
        req.session.uid = user._id;
        return res.redirect("/admin/dashboard");
    } catch (err) {
        req.session.alert = { type: "danger", message: "an error has occured" };
        return res.redirect(req.headers.referer);
    }
}

export async function post_login(req, res) {
    try {
        let user = await login(req.body);

        req.session.uid = user._id;
        return res.redirect("/admin/dashboard");
    } catch (err) {
        req.session.alert = { type: "danger", message: "an error has occured" };
        return res.redirect(req.headers.referer);
    }
}

export async function logout(req, res) {
    delete req.session.uid;
    return res.redirect("/admin/login");
}
