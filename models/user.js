import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: null },
    lastLogin: { type: Date, default: new Date() },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessLevel: { type: Number, default: 0 },
});

const UserModel = mongoose.model("User", userSchema);

export async function findUser(filter) {
    try {
        return await UserModel.findOne(filter);
    } catch (err) {
        return Promise.reject("user not found");
    }
}

export async function register(data) {
    try {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(data.password, salt);
        return await new UserModel({ ...data, password: hash }).save();
    } catch (err) {
        return Promise.reject("an error has occured");
    }
}

export async function login(data) {
    try {
        let user = await findUser({ username: data.username });

        if (!user) {
            return Promise.reject("user not found");
        }

        let OK = bcrypt.compareSync(data.password, user.password);

        if (!OK) {
            return Promise.reject("wrong password or username");
        }

        return Promise.resolve(user);
    } catch (err) {
        return Promise.reject("an error has occured");
    }
}
