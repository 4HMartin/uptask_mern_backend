import { Router } from "express";
import {ProjectController} from "../controllers/ProjectController";
import { body, param } from "express-validator";
import {handleInputErrors} from "../middleware/validation";

const router = Router();

router.post('/',
    // Validation
    body("projectName").notEmpty().withMessage("Project name is required"),
    body("clientName").notEmpty().withMessage("Client name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    handleInputErrors,

    ProjectController.createProject
);

router.get('/', ProjectController.getAllProjects);

router.get('/:id',
    // Validation
    param("id").isMongoId().withMessage("Project ID is required"),
    handleInputErrors,

    ProjectController.getProjectById
)

export default router;