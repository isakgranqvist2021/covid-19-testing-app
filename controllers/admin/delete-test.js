import { findUser } from "../../models/user";
import { deleteOne } from "../../models/test";

export default async function delete_test(req, res) {
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
