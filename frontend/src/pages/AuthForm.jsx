import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import './AuthForm.css';

const AuthForm = () => {
  const { register, login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentMode, setCurrentMode] = useState('register');

  const isRegister = currentMode === 'register';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (isRegister) {
        await register(formData.username, formData.email, formData.password);
        setSuccess('Registration successful! Please login now.');
        setCurrentMode('login');
        setFormData({ username: '', email: '', password: '' });
      } else {
        await login(formData.email, formData.password);
        setSuccess('Login successful!');
        setFormData({ username: '', email: '', password: '' });
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">{isRegister ? 'Create new account' : 'Log in'}</h2>
      {error && <p className="auth-error">{error}</p>}
      {success && <p className="auth-success">{success}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        {isRegister && (
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
            required={isRegister}
            autoComplete="username"
          />
        )}
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email address or phone number"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          required
          autoComplete="email"
        />
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
          required
          autoComplete={isRegister ? 'new-password' : 'current-password'}
        />
        <button type="submit" className="auth-button">
          {isRegister ? 'Create new account' : 'Log in'}
        </button>
      </form>
      {!isRegister && (
        <p className="forgot-password">Forgotten password?</p>
      )}
      <p className="toggle-mode" onClick={() => {
        setCurrentMode(isRegister ? 'login' : 'register');
        setError('');
        setSuccess('');
        setFormData({ username: '', email: '', password: '' });
      }}>
        {isRegister ? 'Log in' : 'Create new account'}
      </p>
    </div>
  );
};

export default AuthForm;
