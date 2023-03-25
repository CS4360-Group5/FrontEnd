import React, { useState } from 'react';
import axios from 'axios';

const Registration = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [gamerTag, setGamerTag] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/accounts/', {
        email,
        gamerTag,
        password,
        status,
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        setAuthenticated(true);
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleRegister}>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Gamer Tag:</label>
        <input type="text" value={gamerTag} onChange={(e) => setGamerTag(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;