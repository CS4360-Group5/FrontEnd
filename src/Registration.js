import React, { useState } from 'react';
import axios from 'axios';

const Registration = ({ setShowLoginForm, setShowRegistrationSuccess }) => {
  const [email, setEmail] = useState('');
  const [gamerTag, setGamerTag] = useState('');
  const [password, setPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email.trim() || !gamerTag.trim() || !password.trim()) {
      setRegistrationError('Please fill out all fields');
      return;
    }

    axios
      .post('http://localhost:8080/accounts/', {
        email,
        gamerTag,
        password,
        status: 'Offline',
      })
      .then((response) => {
        setRegistrationError('');
        setRegistrationSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setRegistrationError('Email/Username already in use');
      });
  };

  if (registrationSuccess) {
    setShowRegistrationSuccess(true);
    setShowLoginForm(true);
  }

  return (
    <div>
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
      {registrationError && <p style={{ color: 'red' }}>{registrationError}</p>}
      {registrationSuccess && (
        <div>
          <p>Registration Successful</p>
        </div>
      )}
    </div>
  );
};

export default Registration;