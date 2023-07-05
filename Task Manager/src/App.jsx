import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import TaskList from './Functions/TaskList';
import TaskForm from './Functions/TaskForm';
import Fitness from './Components/Fitness';


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
              element={
                <>
                  <h2>General Tasks</h2>
                  <TaskList categoryId={1} />
                  <TaskForm categoryId={1} />
                </>
              }
            />
            <Route
              path="/fitness-tasks"
              element={
                <>
                  <h2>Fitness Tasks</h2>
                  <TaskList categoryId={2} />
                  <TaskForm categoryId={2} />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
