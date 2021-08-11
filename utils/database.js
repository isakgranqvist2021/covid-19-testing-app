import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function connect() {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB has connected');
    } catch (err) {
        console.log(err);
    }
}

export async function disconnect() {
    try {
        await mongoose.disconnect();

        console.log('MongoDB has disconnected');
    } catch (err) {
        console.log(err);
    }
}
