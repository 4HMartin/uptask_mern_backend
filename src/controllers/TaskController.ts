import {Request, Response} from 'express';

import Task from "../models/Task";

export class TaskController {

    // POST - CREATE A NEW TASK
    static createTask = async (req: Request, res: Response) => {

        try {
            const task = await Task.create(req.body);
            task.project = req.project._id;
            req.project.tasks.push(task._id);

            // await task.save()
            // await req.project.save()
            await Promise.allSettled([task.save(), req.project.save()])

            return res.status(201).send("Task created successfully.");
        } catch (e) {
            console.log(e);
            return res.status(500).send(e.message);
        }
    }

    // GET - GET ALL PROJECT TASKS
    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            /** Search the tasks with common project id.
             * Retrieve the project id using "populate"
             * like JOIN in relational db.*/
            const tasks = await Task.find({ project: req.project._id }).populate('project');
            return res.status(200).json(tasks);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    // GET - GET TASK BY ID
    static getTaskById = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params;
            const task = await Task.findById(taskId);
            if (!task) {
                const error = new Error('Task Not Found');
                res.status(404).send(error.message);
            }
            if (task.project.toString() !== req.project._id.toString()) {
                const error = new Error('Invalid project');
                res.status(400).send(error.message);
            }

            return res.status(200).json(task);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    // PUT - UPDATE A TASK
    static updateTask = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params;
            const task = await Task.findByIdAndUpdate(taskId, req.body);
            if (!task) {
                const error = new Error('Task Not Found');
                res.status(404).json(error.message);
            }
            if (task.project.toString() !== req.project._id.toString()) {
                const error = new Error('Invalid project');
                res.status(400).json(error.message);
            }
            task.save()
            res.send("Task updated successfully.");
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
}
export default TaskController;