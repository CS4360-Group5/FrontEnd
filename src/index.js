import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Navbar from './Navbar';
import Login from './Login';
import App from './App';
import reportWebVitals from './reportWebVitals';

const Index = ({ authenticated, setAuthenticated }) => {
  const handleLogout = () => {
    setAuthenticated(false);
  };

  if (authenticated) {
    return (
      <React.StrictMode>
        <Navbar authenticated={authenticated} onLogout={handleLogout} />
        <App onLogout={handleLogout} authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </React.StrictMode>
    );
  } else {
    return (
      <React.StrictMode>
        <Navbar authenticated={authenticated} />
        <Login setAuthenticated={setAuthenticated} authenticated={authenticated} />
      </React.StrictMode>
    );
  }
};

const root = createRoot(document.getElementById('root'));

const LoginPageWithAuthentication = () => {
  const [authenticated, setAuthenticated] = React.useState(false);

  const handleLogout = () => {
    setAuthenticated(false);
  };

  if (authenticated) {
    return (
      <React.Fragment>
        <Index authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Navbar authenticated={authenticated} />
        <Login setAuthenticated={setAuthenticated} authenticated={authenticated} />
      </React.Fragment>
    );
  }
};

root.render(
  <Router>
    <LoginPageWithAuthentication />
  </Router>,
  document.getElementById('root')
);

reportWebVitals();