import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
// import TaskList from './Functions/TaskList';
// import TaskForm from './Functions/TaskForm';
import TaskPage from './Functions/TaskPage';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />

        <div className="container">
          <h1>To-Do List</h1>

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h2>Welcome to the Home Page</h2>
                </>
              }
            />
            <Route
              path="/general-tasks"
              element={<TaskPage category="General" />}
            />
            <Route
              path="/fitness-tasks"
              element={<TaskPage category="Fitness" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
