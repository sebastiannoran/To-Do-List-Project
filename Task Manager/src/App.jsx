import { useState } from 'react'
import './style.css'

const TaskList = ({ tasks, onTaskComplete }) => {
  const handleTaskComplete = (taskId ) => {
    onTaskComplete(taskId);
  }
  return (
    <ul>
      {tasks.map(task => (
         <li key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
          <input
          type = "checkbox"
          checked = {task.complete}
          onChange={() => handleTaskComplete(task.id)}
          />
          {task.title}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [newTask, setNewTask] = useState('');
  const [taskList, setTaskList] = useState([
    { id: 1, title: 'Walk the dog', completed: false },
    { id: 2, title: 'Empty the trash', completed: true },
    { id: 3, title: 'Cook dinner', completed: false },
  ]);

  const handleInputChange = event => {
    setNewTask(event.target.value); 
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: Date.now(),
        title: newTask,
        completed: false
      };

      setTaskList(prevTaskList => [...prevTaskList, newTaskObj]);
      setNewTask('');
    }
  };

  const handleTaskComplete = (taskId) => {
    setTaskList(prevTaskList =>
      prevTaskList.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <TaskList tasks={taskList} />
    </div>
  );
};

export default App;
