
// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar.jsx';
import HomePage from './pages/home/HomePage.jsx';
import Splash from './components/screens/Splash/Splash';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <Routes>
        <Route path="splash/" element={<Splash />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};


export default App;
