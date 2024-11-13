import { useState } from "react"; // Importando o useState
import { translateStatus } from "../utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import TaskDetails from "./TaskDetails"; // Importando o componente TaskDetails

function TaskList({ tasks, onStatusChange, onRemoveTask }) {
  const [selectedTask, setSelectedTask] = useState(null); // Novo estado para armazenar a tarefa selecionada

  // Função para abrir os detalhes da tarefa
  const handleTaskClick = (task) => {
    setSelectedTask(task); // Define a tarefa selecionada
  };

  // Função para fechar os detalhes da tarefa
  const handleCloseDetails = () => {
    setSelectedTask(null); // Limpa o estado da tarefa selecionada
  };

  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 mt-2">
      {["todo", "doing", "done"].map((status) => (
        <div key={status}>
          <div className="space-y-4 p-3 bg-slate-200 shadow rounded">
            <h3>{translateStatus(status)}</h3>

            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div
                  className="space-y-4 bg-slate-400 my-1 p-2 rounded-md shadow cursor-pointer"
                  key={task.id} // Quando a tarefa for clicada, abre o detalhamento
                >
                  <ul className="text-white" onClick={() => handleTaskClick(task)}>
                    <li className="font-bold text-ellipsis overflow-hidden whitespace-nowrap">{task.description}</li>
                    <li className="text-sm">{task.responsable}</li>
                    <li className="text-sm">{task.group}</li>
                    <li className="text-sm">{task.computer}</li>
                  </ul>
                  <div className="flex items-center justify-between">
                    <select
                      className="border border-slate-300 outline-slate-400 px-2 py-1 text-sm rounded"
                      value={task.status}
                      onChange={(e) => onStatusChange(task.id, e.target.value)}
                    >
                      <option value="todo">A Fazer</option>
                      <option value="doing">Em Andamento</option>
                      <option value="done">Concluído</option>
                    </select>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Previne a propagação do click para evitar abrir o detalhe
                        onRemoveTask(task.id);
                      }}
                      className="text-gray-500 hover:text-black"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Exibe o componente TaskDetails se uma tarefa for selecionada */}
      {selectedTask && <TaskDetails task={selectedTask} onClose={handleCloseDetails} />}
    </div>
  );
}

export default TaskList;
