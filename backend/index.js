import express, { request, response } from "express";
import { PORT } from "./config/app.js";
import { mongoDBURL } from "./config/database.js";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import subjectRouter from "./routes/subjectRoute.js";
import enrollRouter from "./routes/enrollRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-type"],
    })
);

// Middleware for handling books route
app.use("/users", userRouter);
app.use("/subjects", subjectRouter);
app.use("/enrolls", enrollRouter);

// database connection
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");

        // start server on port
        app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`);
        });
    })

    .catch((error) => {
        console.log(error);
    });