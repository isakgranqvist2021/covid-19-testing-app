import fs from "fs";
import path from "path";
import { testData } from "../../test/add-tests";
import dotenv from "dotenv";
dotenv.config();

export function get_home(req, res) {
    return res.render("index/home", {});
}

export function pick_test(req, res) {
    if (!["rdt", "pcr"].includes(req.params.test)) {
        return res.redirect("/");
    }

    let entities = JSON.parse(
        fs.readFileSync(path.resolve("./data/entities.json"))
    );
    let departments = JSON.parse(
        fs.readFileSync(path.resolve("./data/departments.json"))
    );

    let prevForm = req.session.formData;
    delete req.session.formData;
    req.session.save();

    return res.render("index/test-" + req.params.test, {
        entities,
        departments,
        test: process.env.NODE_ENV === "development",
        formData:
            process.env.NODE_ENV !== "development"
                ? prevForm
                : testData(req.params.test === "pcr" ? true : false),
    });
}
