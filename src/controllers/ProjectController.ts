import mongoose from "mongoose";
import type {Request, Response} from "express";

export class ProjectController {
    static getAllProjects = async (req: Request, res: Response) => {
        return res.status(200).send("All Projects");
    }
}

