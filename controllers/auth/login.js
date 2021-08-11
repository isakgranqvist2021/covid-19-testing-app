import { login } from "../../models/user";

export async function get_login(req, res) {
    return res.render("auth/login", {});
}

export async function post_login(req, res) {
    console.log("login");

    try {
        let user = await login(req.body);

        req.session.uid = user._id;

        console.log(user);

        return res.redirect("/admin/dashboard");
    } catch (err) {
        console.log(err);
        req.session.alert = { type: "danger", message: "an error has occured" };
        return res.redirect(req.headers.referer);
    }
}
