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
      <h2 className="auth-title">{isRegister ? 'Register' : 'Login'}</h2>
      {error && <p className="auth-error">{error}</p>}
      {success && <p className="auth-success">{success}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        {isRegister && (
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              required={isRegister}
              autoComplete="username"
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
            autoComplete={isRegister ? 'new-password' : 'current-password'}
          />
        </div>
        <button type="submit" className="auth-button">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
