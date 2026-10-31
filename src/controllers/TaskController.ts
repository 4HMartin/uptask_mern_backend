import {Request, Response} from 'express';

import Task from "../models/Task";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {

        try {
            const task = await Task.create(req.body);
            task.project = req.project._id;
            req.project.tasks.push(task._id);

            await task.save()
            await req.project.save()

            return res.status(201).send("Task created successfully.");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e.message);
        }
    }
}
export default TaskController;