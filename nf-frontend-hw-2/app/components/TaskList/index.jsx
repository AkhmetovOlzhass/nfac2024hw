import React, { useEffect,useState } from 'react';
import TaskItem from '../TaskItem';

const TaskList = ({tasks, setTasks, filter}) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    filterTasks();
  }, [tasks, filter])

  const handleToggleTask = (id) => {
    const newTasks = tasks.map((t) => {
      if (t.id === id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    })

    setTasks(newTasks)
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const filterTasks = () => {
    let newFilteredTasks;
    switch (filter) {
      case 'active':
        newFilteredTasks = tasks.filter(task => !task.completed);
        break;
      case 'completed':
        newFilteredTasks = tasks.filter(task => task.completed);
        break;
      case 'all':
      default:
        newFilteredTasks = tasks;
        break;
    }
    setFilteredTasks(newFilteredTasks);
  };

  
  return (
    <>
      <ul>
        {
            filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                handleToggleTask={handleToggleTask}
                handleDeleteTask={handleDeleteTask}
              />
            ))
        }
      </ul>
    </>
  );
};

export default TaskList;
