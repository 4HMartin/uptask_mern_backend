import mongoose from "mongoose";
import { exit } from 'node:process';
import colors from "colors";

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.DATABASE_URL);
        const url = `${connection.host}:${connection.port}`;

        console.log(colors.magenta.bold(`Connected to DB: ${url}`));
    } catch (error) {
        console.log(colors.red.bold("Could not connect to DB."));
        console.log(error);
        exit(1);
    }
}