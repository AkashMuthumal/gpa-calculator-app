import express from "express";
import { PORT } from "./config/app.js";
import "./config/database.js";
import userRouter from "./routes/userRoute.js";
import subjectRouter from "./routes/subjectRoute.js";
import enrollRouter from "./routes/enrollRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-type"],
    })
);

// Middleware for handling books route
app.use("/users", userRouter);
app.use("/subjects", subjectRouter);
app.use("/enrolls", enrollRouter);

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
});