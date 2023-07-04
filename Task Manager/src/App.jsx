import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import './style.css';

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

const TaskList = ({ tasks, onTaskComplete }) => {
  const handleTaskComplete = (taskId) => {
    onTaskComplete(taskId);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task ${task.completed ? 'completed' : ''}`}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleTaskComplete(task.id)}
          />
          {task.title}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    // Fetch tasks from the server and update taskList state
    fetch('http://localhost:3000/categories')
      .then((response) => response.json())
      .then((data) => setTaskList(data));
  }, []);

  const handleAddTask = (newTask) => {
    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    // Add the new task to the server and update taskList state
    fetch('http://localhost:3000/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTaskObj),
    })
      .then((response) => response.json())
      .then((data) => {
        setTaskList((prevTaskList) => [...prevTaskList, data]);
      });
  };

  const handleTaskComplete = (taskId) => {
    // Update the completed status of the task on the server and update taskList state
    const updatedTaskList = taskList.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    fetch(`http://localhost:3000/categories/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTaskList.find((task) => task.id === taskId)),
    })
      .then((response) => response.json())
      .then(() => {
        setTaskList(updatedTaskList);
      });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        <li>
          <Link to="/general">General Tasks</Link>
        </li>
        <li>
          <Link to="/fitness">Fitness Tasks</Link>
        </li>
      </ul>
      <hr />
      <Route path="/general">
        <div>
          <h2>General Tasks</h2>
          <TaskForm onAddTask={handleAddTask} />
          <TaskList tasks={taskList} onTaskComplete={handleTaskComplete} />
        </div>
      </Route>
      <Route path="/fitness">
        <div>
          <h2>Fitness Tasks</h2>
          <TaskForm onAddTask={handleAddTask} />
          <TaskList tasks={taskList} onTaskComplete={handleTaskComplete} />
        </div>
      </Route>
    </div>
  );
};

export default App;


