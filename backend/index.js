import express from "express";
import { PORT } from "./config/app.js";

import connection from "./config/database.js";
// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
import "dotenv/config";

import userRouter from "./routes/userRoute.js";
import subjectRouter from "./routes/subjectRoute.js";
import enrollRouter from "./routes/enrollRoute.js";
import authRouter from "./routes/authRoutes.js";

import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import "./config/passport.js";

import { isAdmin, isAuth } from "./middleware/authMiddleware.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "http://172.20.10.4:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-type"],
        credentials: true,
    })
);

// session setup
const sessionStore = new MongoStore({
    client: connection.client,
    collection: "sessions",
});

app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// for debugging
// app.use((req, res, next) => {
//     console.log(req.session);
//     console.log(req.user);
//     next();
// });

// Middleware for handling routes
app.use("/auth", authRouter);
app.use("/users", isAuth, userRouter);
app.use("/subjects", isAuth, subjectRouter);
app.use("/enrolls", isAuth, enrollRouter);

connection.on("connected", () => {
    app.listen(PORT, () => {
        console.log(`app is listening on port ${PORT}`);
    });
});
