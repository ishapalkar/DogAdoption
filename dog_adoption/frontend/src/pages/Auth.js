import React, { useState } from 'react';
import axios from '../utils/axios';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/users/login', credentials);
      localStorage.setItem('token', res.data.token);
      alert('Login Successful!');
      navigate('/');
    } catch (err) {
      alert('Login Failed!');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (credentials.name.length < 2) {
      alert('Name must be at least 2 characters long.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(credentials.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (credentials.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    try {
      await axios.post('/users/register', credentials);
      alert('Registration Successful!');
    } catch (err) {
      alert('Registration Failed!');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login / Register</h2>
      <form>
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
}

export default Auth;
