import { useState, useEffect } from 'react';
import './style.css';
import TaskForm from './Functions/TaskForm';
import TaskList from './Functions/TaskList';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes as Routes} from 'react-router-dom';
import {Route as Route} from 'react-router-dom';
import {Link as Link} from 'react-router-dom';
import Fitness from './Components/Fitness';

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [fetchButtonClicked, setFetchButtonClicked] = useState(false);

  useEffect(() => {
    if (fetchButtonClicked) {
      const fetchTasks = async () => {
        try {
          const response = await fetch('http://localhost:3000/categories');
          const categories = await response.json();
          const generalCategory = categories.find((category) => category.id === 1);
          if (generalCategory) {
            setTaskList(generalCategory.tasks);
          }
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
      await fetch('http://localhost:3000/categories/1/tasks', {
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
    <Router>
      <div>
        <h1>To-Do List</h1>
        {showForm && (
          <div className="form-overlay">
            <TaskForm onAddTask={handleAddTask} />
          </div>
        )}

        {/* General Tasks Button */}
        <Link to="/general-tasks">
          <button>General Tasks</button>
        </Link>

        {/* Fitness Tasks Button */}
        <Link to="/fitness-tasks">
          <button>Fitness Tasks</button>
        </Link>

        {/* Home Button */}
        <Link to="/">
          <button>Home</button>
        </Link>

        <Routes>
          <Route
            path="/general-tasks"
            element={
              <>
                <TaskList tasks={taskList} onTaskComplete={handleTaskComplete} />
                {!showForm && (
                  <button onClick={handleToggleForm}>Add Task</button>
                )}
                {!fetchButtonClicked && (
                  <button onClick={handleFetchTasks}>Fetch Tasks</button>
                )}
              </>
            }
          />
          <Route path="/fitness-tasks" element={<Fitness />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
