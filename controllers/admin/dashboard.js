import { findAll } from "../../models/test";
import { findUser } from "../../models/user";
import moment from "moment";
import fs from "fs";
import path from "path";

function constructQuery(filters) {
    let query = {};

    console.log(filters);

    let dateRange = {
        $gte: new Date("1970, 7, 14"),
        $lte: new Date("2030, 7, 14"),
    };

    if (filters.from) {
        dateRange.$gte = filters.from;
    }

    if (filters.to) {
        dateRange.$lte = filters.to;
    }

    if (filters.status !== undefined && filters.status !== "all") {
        query.status = filters.status;
    }

    if (filters.type !== undefined && filters.type !== "all") {
        query.type = filters.type.toUpperCase();
    }

    if (filters.entity !== undefined && filters.entity !== "all") {
        query.entity = filters.entity;
    }

    return {
        ...query,
        createdAt: dateRange,
    };
}

function defaultFilters() {
    return {
        from: "",
        to: "",
        status: "all",
        type: "all",
        entity: "all",
    };
}

export async function get_dashboard(req, res) {
    let query = constructQuery(
        req.query !== undefined ? req.query : defaultFilters()
    );

    console.log(query);

    let tests = await findAll(query);
    let user = await findUser({ _id: req.session.uid });
    let entities = JSON.parse(
        fs.readFileSync(path.resolve("./data/entities.json"))
    );

    return res.render("admin/dashboard", {
        entities,
        filters: {
            ...defaultFilters(),
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
    let redirectUrl = ["/admin/dashboard?"];

    if (req.body.from) redirectUrl.push(`from=${req.body.from}`);

    if (req.body.to) redirectUrl.push(`to=${req.body.to}`);

    if (req.body.status && req.body.status !== "all")
        redirectUrl.push(`status=${req.body.status}`);

    if (req.body.type && req.body.type !== "all")
        redirectUrl.push(`type=${req.body.type}`);

    if (req.body.entity && req.body.entity !== "all")
        redirectUrl.push(`entity=${req.body.entity}`);

    return res.redirect(redirectUrl.join("&"));
}
