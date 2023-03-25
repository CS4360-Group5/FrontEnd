import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ authenticated, onLogout }) => {
  return (
    <nav>
      <ul className="navbar">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        {authenticated ? (
          <li className="navbar-item">
            <Link to="/App">App</Link>
          </li>
        ) : null}
        <li className="navbar-item">
          <Link to="/about">About</Link>
        </li>
        <li className="navbar-item">
          {authenticated ? (
            <button onClick={onLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
      {authenticated ? <p>You are logged in.</p> : <p>You are not logged in.</p>}
    </nav>
  );
};

export default Navbar;