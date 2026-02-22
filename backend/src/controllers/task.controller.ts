import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

// create task
export const createTask = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                userId: req.user!.userId,
            },
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// fetch all tasks
export const getTasks = async (req: AuthRequest, res: Response) => {
    try {
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);

        const status =
            typeof req.query.status === "string"
                ? req.query.status
                : undefined;

        const search =
            typeof req.query.search === "string"
                ? req.query.search
                : undefined;

        const whereCondition: any = {
            userId: req.user!.userId,
            title: search
                ? { contains: search, mode: "insensitive" as const }
                : undefined,
        };

        if (status) {
            whereCondition.status = status;
        }

        const total = await prisma.task.count({
            where: whereCondition,
        });

        const tasks = await prisma.task.findMany({
            where: whereCondition,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: "desc" },
        });

        res.json({
            total,
            page,
            limit,
            tasks,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// fetch task by id
export const getTaskById = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;

        const task = await prisma.task.findFirst({
            where: {
                id,
                userId: req.user!.userId,
            },
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// update task
export const updateTask = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;
        const { title, description, status } = req.body;

        const task = await prisma.task.findFirst({
            where: {
                id,
                userId: req.user!.userId,
            },
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(status !== undefined && { status }),
            },
        });

        res.json(updatedTask);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// delete task
export const deleteTask = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;

        const task = await prisma.task.findFirst({
            where: {
                id,
                userId: req.user!.userId,
            },
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await prisma.task.delete({
            where: { id },
        });

        res.json({ message: "Task deleted successfully" });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// toggle status
export const toggleTaskStatus = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;

        const task = await prisma.task.findFirst({
            where: {
                id,
                userId: req.user!.userId,
            },
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                status: task.status === "pending" ? "completed" : "pending",
            },
        });

        res.json(updatedTask);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};