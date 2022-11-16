import express from "express";
import { requireSignin, canUpdateDelete } from "../middlewares";

const router = express.Router();

// controllers
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  taskCount,
} = require("../controllers/task");

router.post("/task", requireSignin, createTask);
router.get("/tasks/:page", getTasks);
router.put("/task/:taskId", requireSignin, canUpdateDelete, updateTask);
router.delete("/task/:taskId", requireSignin, canUpdateDelete, deleteTask);
router.get("/task-count", taskCount);

export default router;
