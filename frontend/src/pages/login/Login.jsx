import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../utils/api'; // adjust this
import '../login/Login.css'; 

const AuthPage = ({ onLogin }) => {
  const [tab, setTab] = useState('login');
  const [formData, setFormData] = useState({ email: '', password: '', confirm: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (tab === 'register' && formData.password !== formData.confirm) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      let response;
      if (tab === 'login') {
        response = await loginUser({ email: formData.email, password: formData.password });
      } else {
        await registerUser({ email: formData.email, password: formData.password });
        response = await loginUser({ email: formData.email, password: formData.password });
      }

      if (response.success) {
        onLogin(response.user); // This sets the user in App state
        localStorage.setItem('user', JSON.stringify(response.user)); // Store the whole user object
        navigate('/home');
      } else {
        setError(response.message || 'Authentication failed.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <div className="auth-page">
  <div className="auth-left">
    <img src="https://cdn3.iconfinder.com/data/icons/lovely-children1/256/Girl1-1-512.png" alt="Hope Image" />
    <h1>Hope Haven 🏠</h1>
    <p>A safe place for every child. Join us in making a difference.</p>
  </div>

  <div className="auth-right">
    <div className="auth-tabs">
      <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Login</button>
      <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => setTab('register')}>Register</button>
    </div>

    {error && <div className="auth-error">{error}</div>}

    <form onSubmit={handleSubmit} className="auth-form">
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
      {tab === 'register' && (
        <input name="confirm" type="password" placeholder="Confirm Password" value={formData.confirm} onChange={handleChange} />
      )}
      <button type="submit" className="auth-button" disabled={isLoading}>
        {isLoading ? 'Processing...' : tab === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  </div>
</div>
  );
};

export default AuthPage;
