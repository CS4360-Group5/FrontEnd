import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ authenticated, onLogout, responseData }) => {
  const gamerTag = responseData ? responseData.gamerTag : null;

  const handleCharactersClick = () => {
    const url = '/profiles?authenticated=' + authenticated + '&gamerTag=' + encodeURIComponent(responseData.gamerTag);
    window.open(url, 'Characters', 'width=600,height=400');
  };

  return (
    <nav>
      <ul className="navbar">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          {authenticated ? (
            <button onClick={onLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
      {authenticated && responseData ? (
        <p>Welcome {gamerTag}!</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </nav>
  );
};

export default Navbar;