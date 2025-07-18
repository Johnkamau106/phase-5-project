// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
// import Navbar from './components/Navbar.jsx';
import HomePage from './pages/home/HomePage.jsx';
import AuthForm from './pages/AuthForm.jsx';

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<AuthForm mode="register" />} />
          <Route path="/login" element={<AuthForm mode="login" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
