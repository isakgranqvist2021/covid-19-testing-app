import { findOne } from "../../models/test";
import { findUser } from "../../models/user";
import moment from "moment";
import path from "path";
import fs from "fs";

export default async function view_test(req, res) {
    let test = await findOne({ _id: req.params.id });
    let user = await findUser({ _id: req.session.uid });
    let entities = JSON.parse(
        fs.readFileSync(path.resolve("./data/entities.json"))
    );
    let departments = JSON.parse(
        fs.readFileSync(path.resolve("./data/departments.json"))
    );

    let data = {
        ...test._doc,
        createdAt: moment(test.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        updatedAt:
            test.updatedAt !== null
                ? moment(test.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                : "Never updated",
        dob: moment(test.dob).format("DD/MM/YYYY"),
        email:
            test.email !== null && test.email !== undefined
                ? test.email
                : "not applicable",
    };

    return res.render("admin/view-test", {
        test: data,
        user,
        entities,
        departments,
    });
}
