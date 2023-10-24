import mongoose from "mongoose";
import connection from "../config/database.js";

const subjectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        semester: {
            type: Number,
            require: true,
        },
        credit: {
            type: Number,
            require: true,
        },
        code: {
            type: String,
            require: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Subject = connection.model("Subject", subjectSchema);