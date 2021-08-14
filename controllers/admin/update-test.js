import { updateOne } from "../../models/test";
import { findUser } from "../../models/user";
import dotenv from "dotenv";
import twilio from "twilio";
dotenv.config();

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export default async function update_test(req, res) {
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

        let p =
            process.env.NODE_HOST === "development"
                ? `:${process.env.NODE_PORT}`
                : "";

        let viewTestUrl = `${process.env.NODE_HOST}${p}/test/view/AGRD07042021164`;

        console.log(viewTestUrl);

        client.messages
            .create({
                from: `whatsapp:${process.env.TWILIO_NUMBER}`,
                body: `Your test results: ${req.body.status} - ${viewTestUrl}`,
                to: "whatsapp:+46739986177",
            })
            .then((message) => console.log(message))
            .catch((err) => console.log(err));

        return res.redirect("/admin/dashboard");
    } catch (err) {
        console.log(err);
        req.session.alert = { type: "danger", message: "an error has occured" };
        return res.redirect(req.headers.referer);
    }
}
