import type {Request, Response, NextFunction} from 'express';
import Project, {IProject} from "../models/Project";

/** Global overwrite on Request interface to add the project info */
declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

export async function validateProjectExists(req: Request, res: Response, next: NextFunction) {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId);

    if (!project) {
        const error = new Error('Project not found');
        return res.status(404).json({error: error.message});
    }
    /** We are able to attach the project to the Request and
     * use it on the controller thanks to the global overwrite */
    req.project = project;
    next();
}