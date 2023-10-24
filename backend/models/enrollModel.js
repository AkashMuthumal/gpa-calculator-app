import mongoose from "mongoose";
import connection from "../config/database.js";

const enrollSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject', // Reference to the Subject model
            required: true
        },
        grade: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

export const Enroll = connection.model("Enroll", enrollSchema);