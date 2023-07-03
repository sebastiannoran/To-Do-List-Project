import React from 'react';
import { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = React.useState('');

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

const FitnessTaskList = () => {
  const [taskList, setTaskList] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3000/fitnessTasks')
      .then((response) => response.json())
      .then((data) => setTaskList(data));
  }, []);

  const handleAddTask = (newTask) => {
    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    fetch('http://localhost:3000/fitnessTasks', {
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
    const updatedTaskList = taskList.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    fetch(`http://localhost:3000/fitnessTasks/${taskId}`, {
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
      <h2>Fitness Tasks</h2>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={taskList} onTaskComplete={handleTaskComplete} />
    </div>
  );
};

export default FitnessTaskList;