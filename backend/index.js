// index.js
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const db = require('./firebaseConfig');  // Importa o Firestore já inicializado

const app = express();
const PORT = 8085;

app.use(cors());
app.use(express.json());

// Usa as rotas definidas no arquivo de rotas
app.use('/', taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
