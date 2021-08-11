import { findAll } from "../../models/test";
import { findUser } from "../../models/user";

export default async function get_dashboard(req, res) {
    let tests = await findAll();
    let user = await findUser({ _id: req.session.uid });

    return res.render("admin/dashboard", {
        tests: tests,
        user,
    });
}
