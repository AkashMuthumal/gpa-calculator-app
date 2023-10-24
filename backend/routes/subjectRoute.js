import express from "express";
import { isAdmin, isAuth } from "../middleware/authMiddleware.js";

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
router.post("/", isAdmin, saveNewSubject);

// Route for update a Subject
router.put("/:id", isAdmin, updateSubject);

// Route for delete Subject by id
router.delete("/:id", isAdmin, deleteSubjectById);

export default router;