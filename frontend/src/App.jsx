// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
// import Navbar from './components/Navbar.jsx';
import HomePage from './pages/home/HomePage.jsx';
import Register from './pages/register.jsx';
import Login from './pages/login.jsx';

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
