function TaskForm  ({ onAddTask }) {
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

  export default TaskForm;