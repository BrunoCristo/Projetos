// components/TaskForm.js
import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [description, setDescription] = useState('');
  const [responsable, setResponsable] = useState('');
  const [status, setStatus] = useState('todo');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ description, responsable, status });
    setDescription('');
    setResponsable('');
    setStatus('todo');
  };

  return (
    <div>
      <h2>Adicionar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
        />
        <input
          value={responsable}
          onChange={(e) => setResponsable(e.target.value)}
          placeholder="Responsável"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button type="submit">Adicionar Tarefa</button>
      </form>
    </div>
  );
}

export default TaskForm;
