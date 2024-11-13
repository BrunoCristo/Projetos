import React from "react";
import { translateStatus } from "../utils";

function TaskDetails({ task, onClose }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-2xl font-bold mb-4">Detalhes da Tarefa</h2>
        <div className="mb-4">
          <strong>Descrição:</strong>
          <p>{task.description}</p>
        </div>
        <div className="mb-4">
          <strong>Status:</strong>
          <p>{translateStatus(task.status)}</p>
        </div>
        <div className="mb-4">
          <strong>Responsável:</strong>
          <p>{task.responsable}</p>
        </div>
        <div className="mb-4">
          <strong>Grupo:</strong>
          <p>{task.group}</p>
        </div>
        <div className="mb-4">
          <strong>Computador:</strong>
          <p>{task.computer}</p>
        </div>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default TaskDetails;
