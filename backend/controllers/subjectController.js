import mongoose from "mongoose";
import { Subject } from "../models/subjectModel.js";

export async function getAllSubjects(request, response) {
    try {
        const subjects = await Subject.find();

        if (subjects.length > 0) {
            return response.status(200).json({
                count: subjects.length,
                data: subjects,
            });
        } else {
            return response.status(404).json({ message: "No subjects found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching subjects." });
    }
}

export async function getSubjectById(request, response) {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid subject id`,
            });
        }

        const subject = await Subject.findById(id).exec();

        if (subject) {
            return response.status(200).json(subject);
        } else {
            return response.status(404).json({ message: "Subject not found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching subject." });
    }
}

export async function saveNewSubject(request, response) {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid subject id`,
            });
        }

        const subject = await Subject.findById(id).exec();

        if (subject) {
            return response.status(200).json(subject);
        } else {
            return response.status(404).json({ message: "Subject not found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching subject." });
    }
}

export async function updateSubject(request, response) {
    try {
        if (
            !request.body.name ||
            !request.body.semester ||
            !request.body.credit ||
            !request.body.code
        ) {
            return response.status(400).send({
                message: `Send all required fields: name, semester, credit, code`,
            });
        }

        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid subject id`,
            });
        }

        const result = await Subject.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({
                message: `Subject not found`,
            });
        }

        return response.status(200).send({
            message: `Subject successfully updated!`,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}

export async function deleteSubjectById(request, response) {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid subject id`,
            });
        }

        const result = await Subject.findByIdAndRemove(id);

        if (result) {
            return response.status(404).json({
                message: `Subject successfully deleted!`,
            });
        } else {
            return response.status(404).json({ message: "Subject not found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching users." });
    }
}