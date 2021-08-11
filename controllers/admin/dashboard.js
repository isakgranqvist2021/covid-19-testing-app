import { findOne, findAll, updateOne, deleteOne } from "../../models/test";
import { findUser } from "../../models/user";
import moment from "moment";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import twilio from "twilio";
dotenv.config();

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

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

export async function update_test(req, res) {
    let user = await findUser({ _id: req.session.uid });

    if (user.accessLevel <= 0) {
        req.session.alert = {
            type: "danger",
            message: "you do not have permission to do that",
        };
        return res.redirect(req.headers.referer);
    }

    try {
        let test = await updateOne(
            { _id: req.body._id },
            {
                ...req.body,
                updatedAt: new Date(),
            }
        );

        req.session.alert = {
            type: "success",
            message: `${test.tid} has been updated`,
        };

        // send a what's app message to inform user of the results
        client.messages
            .create({
                from: `whatsapp:${process.env.TWILIO_NUMBER}`,
                body: `Your test results: ${req.body.status}`,
                to: "whatsapp:+46739986177",
            })
            .then((message) => console.log(message.sid))
            .catch((err) => console.log(err));

        return res.redirect("/admin/dashboard");
    } catch (err) {
        console.log(err);
        req.session.alert = { type: "danger", message: "an error has occured" };
        return res.redirect(req.headers.referer);
    }
}

export async function delete_test(req, res) {
    let user = await findUser({ _id: req.session.uid });

    if (user.accessLevel <= 0) {
        req.session.alert = {
            type: "danger",
            message: "you do not have permission to do that",
        };
        return res.redirect(req.headers.referer);
    }

    try {
        await deleteOne({ _id: req.params.id });
        req.session.alert = {
            type: "success",
            message: `test has been deleted`,
        };
        return res.redirect("/admin/dashboard");
    } catch (err) {
        req.session.alert = { type: "danger", message: "an error has occured" };
        return res.redirect(req.headers.referer);
    }
}
