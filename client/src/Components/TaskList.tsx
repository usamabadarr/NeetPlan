import React from 'react';

type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
};

type TaskListProps = {
  tasks: Task[];
};

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="task-list">
      <h3>Your Tasks</h3>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <strong>{task.title}</strong> - Priority: {task.priority} 
              {task.completed && <span> (Completed)</span>}
            </li>
          ))
        ) : (
          <li>No tasks available</li>
        )}
      </ul>
    </div>
  );
};

export default TaskList;

