import React, { useState, useEffect } from 'react';

const TaskPage = ({ category }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          category === 'general'
            ? 'http://localhost:3000/tasks'
            : 'http://localhost:3001/fitness'
        );
        const data = await response.json();
        if (data) {
          setTasks(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTasks();
  }, [category]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = async (event) => {
  event.preventDefault();
  if (newTask.trim() !== '') {
    const newTaskObj = {
      id: Date.now(),
      category,
      title: newTask,
      completed: false,
    };

    try {
      await fetch(
        category === 'general'
          ? 'http://localhost:3000/tasks'
          : 'http://localhost:3001/fitness',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTaskObj),
        }
      );

      setTasks((prevTasks) => [...prevTasks, newTaskObj]);
      setNewTask('');
    } catch (error) {
      console.error('Error:', error);
    }
  }
};

const handleTaskComplete = async (taskId) => {
  const updatedTasks = tasks.filter((task) => task.id !== taskId);

  try {
    await fetch(
      category === 'general'
        ? `http://localhost:3000/tasks/${taskId}`
        : `http://localhost:3001/fitness/${taskId}`,
      {
        method: 'DELETE',
      }
    );

    setTasks(updatedTasks);
  } catch (error) {
    console.error('Error:', error);
  }
};

return (
  <div className="task-page-container">
    <h1>{`${category.charAt(0).toUpperCase()}${category.slice(1)} Tasks`}</h1>
    <div className="add-task-window">
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
    <ul className="task-list">
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
  </div>
);
};

export default TaskPage;
