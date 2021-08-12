import { findMany } from "../../models/test";
import ObjectsToCsv from "objects-to-csv";
import path from "path";
import { randId } from "../../utils/helpers";
import { findUser } from "../../models/user";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

export default async function export_csv(req, res) {
    let user = await findUser({ _id: req.session.uid });

    if (user.accessLevel <= 0) {
        req.session.alert = {
            type: "danger",
            message: "you do not have permission to do that",
        };
        return res.redirect(req.headers.referer);
    }

    try {
        let tests = await findMany({
            tid: {
                $in: req.body,
            },
        });

        /*
            Should be able to export selected data to csv in this format.
            DATE,TEST TYPE,NAME,PHONE,GENDER,ENTITY,EMPLOYMENT STATUS(EMPLOYEE or VENDOR),DEPARTMENT,REMARK,STATUS
            
        */

        let fileName = randId() + ".csv";
        const csv = new ObjectsToCsv(
            tests.map((test) => {
                let d = test._doc;
                return {
                    DATE: test.createdAt,
                    "TEST TYPE": test.type,
                    NAME, "",
                    PHONE: 
                };
            })
        );

        await csv.toDisk(path.resolve("./files/" + fileName));

        setTimeout(() => {
            fs.unlinkSync(path.resolve("./files/" + fileName));
        }, 1000 * 10);

        return res.json({
            message: "",
            success: true,
            data: `${process.env.NODE_HOST}:${process.env.NODE_PORT}/files/${fileName}`,
        });
    } catch (err) {
        return res.json({
            message: "an error occured",
            success: false,
            data: null,
        });
    }
}
