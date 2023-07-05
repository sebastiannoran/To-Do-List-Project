import React from "react";
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded shadow">
        <div className="container">
          <Link className="navbar-brand" to="/">
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/general-tasks">
                  General Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/fitness-tasks">
                  Fitness Tasks
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;