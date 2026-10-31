import { Router } from "express";
import {ProjectController} from "../controllers/ProjectController";
import { body, param } from "express-validator";
import {handleInputErrors} from "../middleware/validation";
import TaskController from "../controllers/TaskController";

const router = Router();

/** Projects routes */
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

router.put('/:id',
    // Validation
    param("id").isMongoId().withMessage("Project ID is required"),
    body("projectName").notEmpty().withMessage("Project name is required"),
    body("clientName").notEmpty().withMessage("Client name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    handleInputErrors,
    ProjectController.updateProject
)

router.delete('/:id',
    // Validation
    param("id").isMongoId().withMessage("Project ID is required"),
    handleInputErrors,
    ProjectController.deleteProject
)

/** Tasks routes */
router.post('/:projectId/tasks',
    TaskController.createTask
)

export default router;