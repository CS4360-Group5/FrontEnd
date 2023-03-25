import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthenticated, authenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      console.log(authenticated);
    }, [authenticated]);
  
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
      })
      .catch((error) => {
        console.log(error);
        setLoginError('Invalid Email/Password');
      });
  };
  
  
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button type="submit">Login</button>
        </form>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      </div>
    );
  };

  export default Login;