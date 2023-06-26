import { useState } from 'react'
import './App.css'
import './style.css'

const TaskList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} className={task.completed ? 'completed' : ''}>
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
