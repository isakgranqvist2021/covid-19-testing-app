import { findAll } from "../../models/test";
import { findUser } from "../../models/user";
import moment from "moment";

export default async function get_dashboard(req, res) {
    let tests = await findAll();
    let user = await findUser({ _id: req.session.uid });

    return res.render("admin/dashboard", {
        tests: tests.map((test) => {
            return {
                ...test._doc,
                createdAt: moment(test.createdAt).format("YYYY-MM-DD HH:mm:ss"),
            };
        }),
        user,
    });
}
