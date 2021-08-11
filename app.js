import express from "express";
import dotenv from "dotenv";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import MongoStore from "connect-mongo";
import { connect, disconnect } from "./utils/database";
import { alerts, set_form_data } from "./middlewares/middlewares";

connect();

dotenv.config();
const app = express();

app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());
app.use("/public", express.static("./public"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(
    session({
        secret: "LXu-Pf6ksbJo=#K",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.NODE_ENV === "production",
        },
        store: MongoStore.create({
            mongoUrl: process.env.DB_URI,
        }),
    })
);

import { logged_out, logged_in } from "./middlewares/middlewares";
import index from "./routers/index";
import auth from "./routers/auth";
import admin from "./routers/admin";

app.use("*", alerts, set_form_data);
app.use("/", index);
app.use("/auth", logged_out, auth);
app.use("/admin", logged_in, admin);

app.listen(process.env.NODE_PORT, () => {
    console.log(`Server listening on port ${process.env.NODE_PORT}`);
});
