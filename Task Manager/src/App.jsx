import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import GeneralTaskList from './General';
import FitnessTaskList from './Fitness';
import './style.css';

const App = () => {
  return (
    <Router>
      <div>
        <h1>To-Do List</h1>
        <ul>
          <li>
            <Link to="/general">General Tasks</Link>
          </li>
          <li>
            <Link to="/fitness">Fitness Tasks</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route path="/general" component={GeneralTaskList} />
          <Route path="/fitness" component={FitnessTaskList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

