import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  // Carregar as tarefas
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8085/get-tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };
    fetchTasks();
  }, []);

  // Adicionar tarefa
  const addTask = async (newTask) => {
    try {
      const response = await axios.post("http://localhost:8085/insert-tasks", [
        newTask,
      ]);
      setTasks((prevTasks) => [...prevTasks, ...response.data]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.patch("http://localhost:8085/update-task-status", {
        id: taskId,
        status: newStatus,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8085/delete-task/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 flex justify-center p-6">
      <div className="w-[700px]">
        <h1 className="text-3xl text-slate-100 font-bold text-center pb-5">
          Gerenciador de Tarefas
        </h1>
        <TaskForm onAddTask={addTask} />
        <TaskList tasks={tasks} onStatusChange={handleStatusChange} onRemoveTask={deleteTask} />
      </div>
    </div>
  );
}

export default App;
