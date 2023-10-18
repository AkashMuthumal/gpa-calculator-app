import mongoose from "mongoose";
import express, { request, response } from "express";
import { Subject } from "../models/subjectModel.js";

const router = express.Router();

// Route for get all subjects
router.get("/", async (request, response) => {
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
});

// Route for get subject by id
router.get("/:id", async (request, response) => {
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
});

// Route for Save a new Subject
router.post("/", async (request, response) => {
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
        const newSubject = {
            name: request.body.name,
            semester: request.body.semester,
            credit: request.body.credit,
            code: request.body.code,
        };

        const subject = await Subject.create(newSubject);
        return response.status(201).send(subject);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for update a Subject
router.put("/:id", async (request, response) => {
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

        if(!result) {
            return response.status(404).send({
                message: `Subject not found`,
            })
        }

        return response.status(200).send({
            message: `Subject successfully updated!`,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for delete Subject by id
router.delete("/:id", async (request, response) => {
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
                message: `Subject successfully deleted!`
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
});

export default router;