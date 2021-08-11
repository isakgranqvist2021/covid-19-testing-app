import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const testSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: null },
    tid: { type: String, required: [] },
    type: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    phone: { type: String, required: true },
    entity: { type: String, required: true },
    employee: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: false, default: null }
});

const TestModel = mongoose.model('Test', testSchema);

export async function createTest(data) {
    try {
        return await new TestModel(data).save();
    } catch(err) {
        if(err.name === 'ValidationError') {
            switch(Object.values(err.errors).map(val => val.message)[0]) {
                case 'Cast to date failed for value "Invalid Date" (type Date) at path "dob"': return Promise.reject('invalid date of birth');
                case 'Path `identifier` is required.': return Promise.reject('missing identifier');
                case 'Path `name` is required.': return Promise.reject('missing name');
                case 'Path `phone` is required.': return Promise.reject('missing phone');
                case 'Path `entity` is required.': return Promise.reject('missing entity');
                case 'Path `employee` is required.': return Promise.reject('missing employee');
                case 'Path `department` is required.': return Promise.reject('missing department');
                default: return Promise.reject('an error has occured');
            }
            
        } else {
            return Promise.reject('an error has occured');
        }
    }
}