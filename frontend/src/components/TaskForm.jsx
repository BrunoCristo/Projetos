import React, { useState } from "react";
function TaskForm({ onAddTask }) {
  const [description, setDescription] = useState("");
  const [responsable, setResponsable] = useState("");
  const [status, setStatus] = useState("todo");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ description, responsable, status });
    setDescription("");
    setResponsable("");
    setStatus("todo");
  };
  // Verifica se todos os campos estão preenchidos
  const isFormValid = description && responsable && status;

  return (
    <div className="space-y-4 p-3 bg-slate-200 shadow rounded">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <input
            className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
          />

          <input
            className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            value={responsable}
            onChange={(e) => setResponsable(e.target.value)}
            placeholder="Responsável"
          />
          <select
            className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">A Fazer</option>
            <option value="doing">Em Andamento</option>
            <option value="done">Concluído</option>
          </select>
          <button
            disabled={!isFormValid}
            type="submit"
            className={`bg-slate-500 text-white px-4 py-2 rounded-md font-medium ${
              !isFormValid && "opacity-50 cursor-not-allowed"
            }`}
          >
            Adicionar Tarefa
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
