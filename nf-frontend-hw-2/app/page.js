'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';


export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [incompleteCount, setIncompleteCount] = useState(0);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if(tasks.length){
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    const count = tasks.filter(task => !task.completed).length;
    setIncompleteCount(count);
  }, [tasks]);

  const handleAddTask = () => {
    if(inputValue !== '') setTasks([...tasks, {id: Date.now(), text: inputValue, completed: false}]);
    setInputValue('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const clearStorage = () => {
    const newTasks = tasks.filter(task => !task.completed)
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
        
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">

        <TaskList tasks={tasks} setTasks={setTasks} filter={filter} />

        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span> {incompleteCount} items left</span> 
          <div>
            <button onClick={() => setFilter("all")} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => setFilter("active")} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => setFilter("completed")} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={() => clearStorage()}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
