// controllers/taskController.js
const taskService = require('../services/taskService');

// Controller para inserir tarefas
const insertTasks = async (req, res) => {
    try {
      const createdTasks = await taskService.addTasks(req.body);
      res.status(201).json(createdTasks); // Retorna as tarefas criadas com ID e computador
    } catch (error) {
      console.error('Erro ao inserir tarefas:', error);
      res.status(500).json({ error: 'Erro ao inserir tarefas' });
    }
  };

// Controller para listar todas as tarefas
const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

// Controller para atualizar o status de uma tarefa
const updateTaskStatus = async (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: 'ID e novo status são obrigatórios' });
  }

  try {
    await taskService.updateTaskStatus(id, status);
    res.json({ message: 'Status atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar o status:', error);
    res.status(500).json({ error: 'Erro ao atualizar o status' });
  }
};

module.exports = {
  insertTasks,
  getTasks,
  updateTaskStatus,
};
