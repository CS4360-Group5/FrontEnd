import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Registration from './Registration';

const Login = ({ setAuthenticated, authenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [responseData, setResponseData] = useState(null); // added state for response data
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false); // added state for registration success
  const navigate = useNavigate();

  useEffect(() => {
    console.log(authenticated);
    if (showRegistrationSuccess) {
      setShowLoginForm(true);
      setShowRegistrationSuccess(false); // reset showRegistrationSuccess state
    }
  }, [authenticated, showRegistrationSuccess]);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:8080/accounts/login/', {
        email,
        password,
      })
      .then((response) => {
        const { accountId, email, gamerTag, status } = response.data;
        localStorage.setItem('token', accountId);
        setAuthenticated(true);
        navigate('/');
        setLoginError('');
        console.log(`Logged in as ${email} with gamer tag ${gamerTag} and status ${status}.`);
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoginError('Invalid Email/Password');
      });
  };

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
  };

  const handleShowRegistrationForm = () => {
    setShowLoginForm(false);
  };

  return (
    <div className="login-container">
      <h2>{showLoginForm ? 'Login' : 'Registration'}</h2>
      {showLoginForm ? (
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button type="submit">Login</button>
        </form>
      ) : (
        <Registration setShowLoginForm={setShowLoginForm} setShowRegistrationSuccess={setShowRegistrationSuccess} />
      )}
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      {showLoginForm ? (
        <p>
          Don't have an account?{' '}
          <a href="#" onClick={handleShowRegistrationForm}>
            Register here
          </a>
        </p>
      ) : (
        <p>
          Already have an account?{' '}
          <a href="#" onClick={handleShowLoginForm}>
            Login here
          </a>
        </p>
      )}
    </div>
  );
};

export default Login;