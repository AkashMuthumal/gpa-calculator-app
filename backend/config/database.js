import mongoose from "mongoose";
import "dotenv/config";
import { seedSubjects } from "../data/seed.js";

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectToDatabase = async () => {
    try {
        await mongoose.connection; // Reuse the existing connection
        console.log("App connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
};

connectToDatabase();
// seedSubjects();