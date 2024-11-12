const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Rota para inserir tarefas
router.post("/insert-tasks", taskController.insertTasks);

// Rota para listar tarefas
router.get("/get-tasks", taskController.getTasks);

// Rota para atualizar o status de uma tarefa
router.patch("/update-task-status", taskController.updateTaskStatus);

router.delete("/delete-task/:id", taskController.deleteTask);

module.exports = router;
