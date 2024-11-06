// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [responsable, setResponsable] = useState('');
  const [status, setStatus] = useState('todo');

  // Carregar as tarefas
  useEffect(() => {
    // Função para buscar tarefas
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8085/get-tasks');
        setTasks(response.data); // Atualiza o estado com as tarefas carregadas


      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };
  
    fetchTasks(); // Chama a função para buscar as tarefas
  }, []); // A lista vazia [] faz com que o efeito seja executado apenas uma vez, ao montar o componente
  
  // Adicionar tarefa
  const addTask = async () => {
    const newTask = { description, responsable, status };
  
    try {
      // Faz a chamada para o endpoint de inserção de tarefas
      await axios.post('http://localhost:8085/insert-tasks', [newTask]);
  
      // Atualiza o estado de tasks para exibir a nova tarefa imediatamente
      setTasks((prevTasks) => [...prevTasks, { ...newTask, id: prevTasks.length + 1 }]);
  
      // Limpa os campos do formulário após a adição
      setDescription('');
      setResponsable('');
      setStatus('todo');
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Atualiza o status no backend
      await axios.patch('http://localhost:8085/update-task-status', { id: taskId, status: newStatus });

      // Atualiza o estado local com o novo status
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  return (
    <div>
    <h1>Gerenciador de Tarefas</h1>
    <TaskForm onAddTask={addTask} />
    <TaskList tasks={tasks} onStatusChange={handleStatusChange} />
  </div>
  );
}

export default App;
