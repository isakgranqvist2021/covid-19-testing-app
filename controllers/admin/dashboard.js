import { findOne, findAll } from "../../models/test";
import { findUser } from "../../models/user";

export async function get_dashboard(req, res) {
    let tests = await findAll();
    let user = await findUser({ _id: req.session.uid });

    return res.render("admin/dashboard", {
        tests: tests,
        user,
    });
}

export async function view_test(req, res) {
    let test = await findOne({ _id: req.params.id });
    let user = await findUser({ _id: req.session.uid });

    return res.render("admin/view-test", {
        test: test,
        user,
    });
}
