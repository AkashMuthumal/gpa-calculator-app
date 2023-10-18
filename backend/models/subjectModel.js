import mongoose from "mongoose";

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

export const Subject = mongoose.model("Subject", subjectSchema);
