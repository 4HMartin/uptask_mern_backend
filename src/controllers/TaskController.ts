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
            return res.status(200).json(req.task);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    // PUT - UPDATE A TASK
    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name;
            req.task.description = req.body.description;
            await req.task.save();

            res.send("Task updated successfully.");
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    // DELETE - DELETE A TASK
    static deleteTask = async (req: Request, res: Response) => {
        try {
            // Remove task from associated array
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task._id.toString());

            await Promise.allSettled([ req.task.deleteOne(), req.project.save() ])
            res.send("Task deleted successfully.");
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    // POST - UPDATE TASK STATUS
    static updateStatus = async (req: Request, res: Response) => {
        const { status } = req.body;
        req.task.status = status;
        await req.task.save();
        res.send("Task updated successfully.");
    }
}
export default TaskController;