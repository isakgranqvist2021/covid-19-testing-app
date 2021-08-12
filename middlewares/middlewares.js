import fs from "fs";
import path from "path";

export function logs(req, res, next) {
    console.log(req.method, req.originalUrl);

    return next();
}

export function alerts(req, res, next) {
    let alert = req.session.alert;
    res.locals.alert = alert;
    delete req.session.alert;
    return next();
}

export function logged_in(req, res, next) {
    console.log(req.session.uid);

    if (!req.session.uid) return res.redirect("/");
    return next();
}

export function logged_out(req, res, next) {
    console.log(req.session.uid);

    if (req.session.uid) return res.redirect("/admin/dashboard");
    return next();
}

export function set_form_data(req, res, next) {
    if (!req.session.formData) {
        let entities = JSON.parse(
            fs.readFileSync(path.resolve("./data/entities.json"))
        );
        let departments = JSON.parse(
            fs.readFileSync(path.resolve("./data/departments.json"))
        );

        req.session.formData = {
            name: "",
            gender: "male",
            dd: "",
            mm: "",
            yyyy: "",
            phone: "",
            entity: entities[0],
            department: departments[0],
            employmentStatus: "",
            email: "",
        };
    }

    return next();
}
