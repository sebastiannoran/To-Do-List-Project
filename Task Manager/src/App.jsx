import { useState, useEffect } from 'react';
import './style.css';

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

const TaskForm = ({ onAddTask, onLoadTasks }) => {
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      try {
        const response = await fetch('http://localhost:3000/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newTask,
            completed: false,
          }),
        });
        const task = await response.json();
        onAddTask(task);
        setNewTask('');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleLoadTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/task');
      const tasks = await response.json();
      onLoadTasks(tasks);
    } catch (error) {
      console.error('Error:', error);
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
      <button onClick={handleLoadTasks}>Load Tasks</button>
    </div>
  );
};

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
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
  }, []);

  const handleAddTask = (task) => {
    setTaskList((prevTaskList) => [...prevTaskList, task]);
    setShowForm(false);
  };

  const handleTaskComplete = async (taskId) => {
    try {
      const task = taskList.find((task) => task.id === taskId);
      const updatedTask = { ...task, completed: !task.completed };
      await fetch(`http://localhost:3000/task/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      setTaskList((prevTaskList) =>
        prevTaskList.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
     console.error('Error:', error);
    }
  };

  const handleToggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      {!showForm && (
        <button onClick={handleToggleForm}>Add Task</button>
      )}
      {showForm && (
        <div className="form-overlay">
          <TaskForm
            onAddTask={handleAddTask}
            onLoadTasks={setTaskList}
          />
        </div>
      )}
      <TaskList tasks={taskList} onTaskComplete={handleTaskComplete} />
    </div>
  );
};

export default App;









// for the next iteration of the project we need to
// Incorporate a Form component in your app
// Style the Form Component 
// Refactor your component hierarchy to lift and handle State in the proper higher-level components 

// 
