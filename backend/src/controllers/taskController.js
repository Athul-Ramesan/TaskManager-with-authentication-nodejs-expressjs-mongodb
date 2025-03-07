const Task = require("../models/Task");


const createTask = async (req, res) => {
    const task = new Task({ ...req.body, user: req.userId });
    try {
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.log("🚀 ~ createTask ~ error:", error.message)
        res.json({ status: "error", message: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId });
        res.json(tasks);
    } catch (error) {
        console.log("🚀 ~ getTasks ~ error:", error.message)
        res.json({ status: "error", message: error.message });
    }
};

const updateTask = async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
        res.json(task);
    } catch (error) {
        console.log("🚀 ~ updateTask ~ error:", error.message)
        res.json({ status: "error", message: error.message });
    }
};

const deleteTask = async (req, res) => {
    const id = req.params.id
    try {
        await Task.findByIdAndDelete(id);
        res.json({ message: "Task deleted" });
    } catch (error) {
        console.log("🚀 ~ deleteTask ~ error:", error.message)
        res.json({ status: "error", message: error.message });
    }
};