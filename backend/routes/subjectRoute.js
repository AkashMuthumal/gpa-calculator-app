import express from "express";

import {
    getAllSubjects,
    getSubjectById,
    saveNewSubject,
    updateSubject,
    deleteSubjectById,
} from "../controllers/subjectController.js";

const router = express.Router();

// Route for get all subjects
router.get("/", getAllSubjects);

// Route for get subject by id
router.get("/:id", getSubjectById);

// Route for Save a new Subject
router.post("/", saveNewSubject);

// Route for update a Subject
router.put("/:id", updateSubject);

// Route for delete Subject by id
router.delete("/:id", deleteSubjectById);

export default router;