import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route as Route, Switch as Switch } from 'react-router-dom';
import App from './App.jsx';
import './style.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

