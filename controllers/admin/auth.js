import fs from "fs";
import path from "path";

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
        req.session.alert = { type: "danger", message: "invalid accessCode" };
        return res.redirect(req.headers.referer);
    }

    console.log(accessCode);
    console.log("register", req.body);
    return res.redirect(req.headers.referer);
}

export async function post_login(req, res) {
    console.log("login", req.body);
    return res.redirect(req.headers.referer);
}

export async function logout(req, res) {}
