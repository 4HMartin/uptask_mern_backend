import {Request, Response} from 'express';
import Project from "../models/Project";
import Task from "../models/Task";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        const projectId = req.params.projectId;
        const project = await Project.findById(projectId);

        if (!project) {
            const error = new Error('Project not found');
            return res.status(404).json({error: error.message});
        }

        try {
            const task = await Task.create(req.body);
            task.project = project._id;
            project.tasks.push(task._id);

            await task.save()
            await project.save()

            return res.status(201).send("Task created successfully.");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e.message);
        }
    }
}
export default TaskController;