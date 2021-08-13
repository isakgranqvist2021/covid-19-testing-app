import { findAll } from "../../models/test";
import { findUser } from "../../models/user";
import moment from "moment";
import fs from "fs";
import path from "path";

export async function get_dashboard(req, res) {
    let tests = await findAll();
    let user = await findUser({ _id: req.session.uid });
    let entities = JSON.parse(
        fs.readFileSync(path.resolve("./data/entities.json"))
    );

    return res.render("admin/dashboard", {
        entities,
        filters: {
            from: "",
            to: "",
            mm: "all",
            status: "all",
            type: "all",
            entity: "all",
            ...req.query,
        },
        tests: tests.map((test) => {
            return {
                ...test._doc,
                createdAt: moment(test.createdAt).format("YYYY-MM-DD HH:mm:ss"),
            };
        }),
        user,
    });
}

export function post_dashboard_filter(req, res) {
    console.log(req.body);
    let redirectUrl = ["/admin/dashboard?"];

    if (req.body.from) redirectUrl.push(`from=${req.body.from}`);

    if (req.body.to) redirectUrl.push(`to=${req.body.to}`);

    if (req.body.mm && req.body.mm !== "all")
        redirectUrl.push(`mm=${req.body.mm}`);

    if (req.body.status && req.body.status !== "all")
        redirectUrl.push(`status=${req.body.status}`);

    if (req.body.type && req.body.type !== "all")
        redirectUrl.push(`type=${req.body.type}`);

    if (req.body.entity && req.body.entity !== "all")
        redirectUrl.push(`entity=${req.body.entity}`);

    return res.redirect(redirectUrl.join("&"));
}
