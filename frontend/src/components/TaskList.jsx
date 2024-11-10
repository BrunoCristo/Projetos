
import { translateStatus } from '../utils';

function TaskList({ tasks, onStatusChange }) {
  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 mt-2">
      {['todo', 'doing', 'done'].map(status => (
        <div  key={status}>
          <div className="space-y-4 p-3 bg-slate-200 shadow rounded
          ">
            <h3> {translateStatus(status)} </h3>
            
              {tasks.filter(task => task.status === status).map((task) => (
                <div className="space-y-4 bg-slate-400  my-1 p-2 rounded-md shadow" key={task.id}>
                  <ul className="text-white">
                    <li className="font-bold">{task.description}</li>
                    <li className="text-sm">{task.responsable}</li>
                    <li className="text-sm">{task.computer}</li>
                  </ul>
                  <div>
                    <select
                      className='border border-slate-300 outline-slate-400 px-2 py-1 text-sm rounded'
                      value={task.status}
                      onChange={(e) => onStatusChange(task.id, e.target.value)}
                    >
                      <option value="todo">A Fazer</option>
                      <option value="doing">Em Andamento</option>
                      <option value="done">Concluído</option>
                    </select>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
