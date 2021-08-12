import { findMany } from "../../models/test";
import ObjectsToCsv from "objects-to-csv";
import path from "path";
import { randId } from "../../utils/helpers";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

export default async function export_csv(req, res) {
    try {
        let tests = await findMany({
            tid: {
                $in: req.body,
            },
        });

        let fileName = randId() + ".csv";
        const csv = new ObjectsToCsv(
            tests.map((test) => {
                return test._doc;
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
