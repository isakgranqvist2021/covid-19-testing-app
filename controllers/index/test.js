import { createTest } from "../../models/test";
import fs from "fs";
import path from "path";

function genId(payload) {
    let filePath = path.resolve("./data/store.json");
    let file = JSON.parse(fs.readFileSync(filePath));
    let fileN = file.tests;

    /*
        Also, A unique code should be generated for each person getting tested with the Following code generation points
        AG+RD+Month+day+year+5digitnumber that will be counting upwards from 00500. (EG AGRD08092100500)
        AG+PC+Month+day+year+5digitnumber that will be counting upwards from 00500. (EG AGPC08092100501)
    */

    let parts = [
        "AG",
        payload.type
            .toUpperCase()
            .substring(0, payload.type.toUpperCase().length - 1),
        payload.month < 10 ? `0${payload.month}` : payload.month,
        payload.day < 10 ? `0${payload.day}` : payload.day,
        payload.year.toString(),
        fileN.toString(8),
    ];

    fs.writeFileSync(
        filePath,
        JSON.stringify({
            tests: file.tests + 1,
        })
    );

    return parts.join("");
}

export async function submit_test(req, res) {
    let tid = (() => {
        let today = new Date();

        return genId({
            type: req.body.type,
            month: today.getMonth(),
            day: today.getDay(),
            year: today.getFullYear(),
        });
    })();

    try {
        const doc = await createTest({
            ...req.body,
            tid: tid,
            type: req.body.type.toUpperCase(),
            dob: new Date(`${req.body.dd} ${req.body.mm} ${req.body.yyyy}`),
        });

        if (!req.body.admin) {
            return res.render("index/success", {
                data: doc,
            });
        } else {
            req.session.alert = {
                type: "success",
                message: "test has been added",
            };
            return res.redirect("/admin/dashboard");
        }
    } catch (err) {
        console.log(err);

        req.session.alert = { type: "danger", message: err };
        req.session.formData = req.body;
        return res.redirect(req.headers.referer);
    }
}
