import type {Request, Response, NextFunction} from 'express';
import Task, {ITask} from "../models/Task";

/** Global overwrite on Request interface to add the task info */
declare global {
    namespace Express {
        interface Request {
            task: ITask;
        }
    }
}

export async function validateTaskExists(req: Request, res: Response, next: NextFunction) {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);

    if (!task) {
        const error = new Error('Task not found');
        return res.status(404).json({error: error.message});
    }
    /** We are able to attach the task to the Request and
     * use it on the controller thanks to the global overwrite */
    req.task = task;
    next();
}

export async function validateTaskBelongsToProject(req: Request, res: Response, next: NextFunction) {
    if (req.task.project.toString() !== req.project._id.toString()) {
        const error = new Error('Invalid project');
        res.status(400).send(error.message);
    }
    next();
}