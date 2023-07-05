import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import TaskPage from './Functions/TaskPage';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />

        <div className="container">
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h1>To-Do List</h1>
                    <h2>Welcome to the Home Page</h2>
                  </>
                }
              />
              <Route
                path="/general-tasks"
                element={<TaskPage category="general" />} // Pass 'general' for the general-tasks route
              />
              <Route
                path="/fitness-tasks"
                element={<TaskPage category="fitness" />} // Pass 'fitness' for the fitness-tasks route
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;