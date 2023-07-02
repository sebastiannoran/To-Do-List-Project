// import { useState } from "react";

// function TaskList ({ tasks, onTaskComplete }) {
//     const handleTaskComplete = (taskId) => {
//       onTaskComplete(taskId);
//     };
  
//     return (
//       <ul>
//         {tasks.map((task) => (
//           <li
//             key={task.id}
//             className={`task ${task.completed ? 'completed' : ''}`} // question mark sytax used for simplistic if.. else conditions
//           >
//             <input
//               type="checkbox"
//               checked={task.completed}
//               onChange={() => handleTaskComplete(task.id)}
//             />
//             {task.title}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   export default TaskList;