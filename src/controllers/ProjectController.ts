import mongoose from "mongoose";
import type {Request, Response} from "express";
import colors from "colors";
import Project from "../models/Project";

export class ProjectController {

    // POST - CREATE A NEW PROJECT
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body);
        try {
            await project.save();
            return res.status(201).send("Project created successfully.");
        } catch (e) {
            console.log(colors.red("Error creating project"));
            console.log(e.message);
            return res.status(400).send({error: e.message});
        }
    }

    // GET - RETURN ALL PROJECTS
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({});
            return res.status(200).json(projects);
        } catch (e) {
            console.log(e)
        }
    }

    // GET - RETURN A PROJECT BY ID
    static getProjectById = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const project = await Project.findById(id);
            return res.status(200).json(project);
        } catch (e) {
            console.log(e)
        }
    }
}

