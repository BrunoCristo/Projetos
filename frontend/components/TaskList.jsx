// components/TaskList.js
import React from 'react';

function TaskList({ tasks, onStatusChange }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {['todo', 'doing', 'done'].map(status => (
        <div key={status}>
          <h3>{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
          <ul>
            {tasks.filter(task => task.status === status).map((task) => (
              <li key={task.id}>
                {task.description} - {task.responsable} - {task.computer}
                <select
                  value={task.status}
                  onChange={(e) => onStatusChange(task.id, e.target.value)}
                >
                  <option value="todo">Todo</option>
                  <option value="doing">Doing</option>
                  <option value="done">Done</option>
                </select>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
