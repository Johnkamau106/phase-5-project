import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../utils/api'; // adjust this
import './AuthPage.css'; // Optional: add your custom styles

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
        onLogin(response.user);
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
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Art Section */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-800 to-gray-900">
        <img
          src="https://img.freepik.com/free-vector/painting-elements-round-concept_1284-38221.jpg"
          alt="Art"
          className="w-36 h-36 rounded-full mb-6 object-cover border-4 border-blue-500 shadow-lg"
        />
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          ArtVault 🎨
        </h1>
        <p className="text-gray-400 mt-4 text-center max-w-md">
          Catalog, tag, and organize your digital art collection.
        </p>
      </div>

      {/* Right Auth Section */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-gray-800">
        {/* Toggle Tabs */}
        <div className="flex space-x-4 mb-6 bg-gray-700 p-1 rounded-full">
          <button
            className={`px-5 py-2 rounded-full font-semibold ${
              tab === 'login'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-300'
            }`}
            onClick={() => setTab('login')}
          >
            Login
          </button>
          <button
            className={`px-5 py-2 rounded-full font-semibold ${
              tab === 'register'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-300'
            }`}
            onClick={() => setTab('register')}
          >
            Register
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {error && (
            <div className="text-red-400 bg-red-900/20 p-3 rounded text-sm text-center">
              {error}
            </div>
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {tab === 'register' && (
            <input
              name="confirm"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirm}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-3 bg-blue-600 rounded hover:bg-blue-700 transition-all font-semibold disabled:opacity-50"
          >
            {isLoading
              ? 'Processing...'
              : tab === 'login'
              ? 'Login'
              : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
