import express from "express";
import { isAdmin, isAuth, isOwner } from "../middleware/authMiddleware.js";

import {
    getAllEnrollments,
    getEnrollmentById,
    getEnrollmentByUserId,
    getEnrollmentBySubjectId,
    saveNewEnroll,
    updateEnrollment,
    deleteEnrollmentById,
} from "../controllers/enrollController.js";

const router = express.Router();

// Route for get all enrollments
router.get("/", isAdmin, getAllEnrollments);

// Route for get enrollment by id
router.get("/:id", isOwner, getEnrollmentById);

// Route for get enrollment by user id
router.get("/user/:id", isOwner, getEnrollmentByUserId);

// Route for get enrollment by subject id
router.get("/subject/:id", isAdmin, getEnrollmentBySubjectId);

// Route for Save a new Enroll
router.post("/", saveNewEnroll);

// Route for update a Enrollment
router.put("/:id", isAdmin, updateEnrollment);

// Route for delete enrollment by id
router.delete("/:id", isOwner, deleteEnrollmentById);

export default router;