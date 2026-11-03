import { Router } from "express";
import {ProjectController} from "../controllers/ProjectController";
import { body, param } from "express-validator";
import {handleInputErrors} from "../middleware/validation";
import TaskController from "../controllers/TaskController";
import {validateProjectExists} from "../middleware/project";

const router = Router();

/** PROJECTS ROUTES */
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

/** TASKS ROUTES */

// Middleware
router.param('projectId', validateProjectExists)

router.post('/:projectId/tasks',
    // Validation
    body("name").notEmpty().withMessage("Task name is required"),
    body("description").notEmpty().withMessage("Task description is required"),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

router.get('/:projectId/tasks/:taskId',
    // Validation
    param("taskId").isMongoId().withMessage("Invalid task id"),
    handleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
    // Validation
    param("taskId").isMongoId().withMessage("Invalid task id"),
    body("name").notEmpty().withMessage("Task name is required"),
    body("description").notEmpty().withMessage("Task description is required"),
    handleInputErrors,
    TaskController.updateTask
)

export default router;