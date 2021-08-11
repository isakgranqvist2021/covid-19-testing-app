import mongoose from "mongoose";
import moment from "moment";

const Schema = mongoose.Schema;

const testSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: null },
    tid: { type: String, required: true },
    gender: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    phone: { type: String, required: true },
    entity: { type: String, required: true },
    employee: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: false, default: null },
    status: { type: String, default: "pending" }, // pending, positive, negative
});

const TestModel = mongoose.model("Test", testSchema);

export async function createTest(data) {
    try {
        let newTest = await new TestModel(data).save();
        return await findTest({ _id: newTest._id });
    } catch (err) {
        if (err.name === "ValidationError") {
            switch (Object.values(err.errors).map((val) => val.message)[0]) {
                case 'Cast to date failed for value "Invalid Date" (type Date) at path "dob"':
                    return Promise.reject("invalid date of birth");
                case "Path `identifier` is required.":
                    return Promise.reject("missing identifier");
                case "Path `name` is required.":
                    return Promise.reject("missing name");
                case "Path `phone` is required.":
                    return Promise.reject("missing phone");
                case "Path `entity` is required.":
                    return Promise.reject("missing entity");
                case "Path `employee` is required.":
                    return Promise.reject("missing employee");
                case "Path `department` is required.":
                    return Promise.reject("missing department");
                default:
                    return Promise.reject("an error has occured");
            }
        } else {
            console.log(err);
            return Promise.reject("an error has occured");
        }
    }
}

export async function findTest(filter) {
    try {
        let test = await TestModel.findOne(filter)
            .select({
                __v: 0,
                _id: 0,
                updatedAt: 0,
            })
            .lean()
            .exec();

        return Promise.resolve({
            type: test.type.toUpperCase(),
            "Test ID": test.tid,
            name: test.name,
            gender: test.gender,
            "date of birth": moment(test.dob).format("DD/MM/YYYY"),
            employee: test.employee,
            entity: test.entity,
            phone: test.phone,
            department: test.department,
            email: test.email !== null ? email : "not applicable",
        });
    } catch (err) {
        return Promise.reject("test not found");
    }
}
