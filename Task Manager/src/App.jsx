import { useState } from 'react';
import './style.css';
import TaskList from './taskList'
import TaskForm from './taskForm' 

const App = () => {
  const [taskList, setTaskList] = useState([
    { id: 1, title: 'Walk the dog', completed: false },
    { id: 2, title: 'Empty the trash', completed: false },
    { id: 3, title: 'Cook dinner', completed: false },
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleAddTask = (newTask) => {
    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };
    setTaskList((prevTaskList) => [...prevTaskList, newTaskObj]);
    setShowForm(false);
  };

  const handleTaskComplete = (taskId) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
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






// for the next iteration of the project we need to
// Incorporate a Form component in your app
// Style the Form Component 
// Refactor your component hierarchy to lift and handle State in the proper higher-level components 

// 
