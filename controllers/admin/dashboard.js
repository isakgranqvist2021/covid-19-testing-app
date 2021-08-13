import { findAll } from "../../models/test";
import { findUser } from "../../models/user";
import moment from "moment";
import fs from "fs";
import path from "path";

export default async function get_dashboard(req, res) {
    let tests = await findAll();
    let user = await findUser({ _id: req.session.uid });
    let entities = JSON.parse(
        fs.readFileSync(path.resolve("./data/entities.json"))
    );

    return res.render("admin/dashboard", {
        entities,
        tests: tests.map((test) => {
            return {
                ...test._doc,
                createdAt: moment(test.createdAt).format("YYYY-MM-DD HH:mm:ss"),
            };
        }),
        user,
    });
}
