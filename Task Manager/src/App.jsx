import { useState, useEffect } from 'react';
import './style.css';
import TaskForm from './Functions/TaskForm';
import TaskList from './Functions/TaskList';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes as Routes} from 'react-router-dom';
import {Route as Route} from 'react-router-dom';
import {Link as Link} from 'react-router-dom';

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [fetchButtonClicked, setFetchButtonClicked] = useState(false);

  useEffect(() => {
    if (fetchButtonClicked) {
      const fetchTasks = async () => {
        try {
          const response = await fetch('http://localhost:3000/task');
          const tasks = await response.json();
          setTaskList(tasks);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchTasks();
    }
  }, [fetchButtonClicked]);

  const handleAddTask = async (newTask) => {
    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    try {
      await fetch('http://localhost:3000/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaskObj),
      });

      setTaskList((prevTaskList) => [...prevTaskList, newTaskObj]);
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleTaskComplete = (taskId) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFetchTasks = () => {
    setFetchButtonClicked(true);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      {!showForm && (
        <button onClick={handleToggleForm}>Add Task</button>
      )}
      {!fetchButtonClicked && (
        <button onClick={handleFetchTasks}>Fetch Tasks</button>
      )}
      {showForm && (
        <div className="form-overlay">
          <TaskForm onAddTask={handleAddTask} />
        </div>
      )}
      <TaskList tasks={taskList} onTaskComplete={handleTaskComplete} />
    </div>
  );
};

export default App;


