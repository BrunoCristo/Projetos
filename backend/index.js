const express = require('express');
const admin = require('firebase-admin');
const app = express();
const cors = require('cors'); // Importa o CORS
const PORT = 8085;

// Inicialize o Firebase
const serviceAccount = require('./firebase-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

app.use(cors())
app.use(express.json());

// Endpoint para inserir tarefas
app.post('/insert-tasks', async (req, res) => {
  const tasks = req.body;
  const computerName = require('os').hostname();  // Nome do computador

  const batch = db.batch();
  tasks.forEach((task) => {
    const taskRef = db.collection('tasks').doc();
    batch.set(taskRef, { ...task, computer: computerName });
  });
  await batch.commit();

  res.send({ message: 'Tarefas inseridas com sucesso!' });
});

// Endpoint para listar tarefas
app.get('/get-tasks', async (req, res) => {
  const tasksSnapshot = await db.collection('tasks').get();
  const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(tasks);
});

// Endpoint para atualizar o status de uma tarefa
app.patch('/update-task-status', async (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: 'ID e novo status são obrigatórios' });
  }

  try {
    const taskRef = db.collection('tasks').doc(id);
    await taskRef.update({ status });
    res.json({ message: 'Status atualizado com sucesso!' });
  } catch (error) {
    console.error("Erro ao atualizar o status:", error);
    res.status(500).json({ error: 'Erro ao atualizar o status' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
