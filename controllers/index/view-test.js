import { findTest } from "../../models/test";

export async function view_test(req, res) {
    let test = await findTest({ tid: req.params.id }); // AGRD07042021164

    return res.render("index/view-test", {
        data: test,
    });
}
