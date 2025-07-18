
// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar.jsx';
import Donations from './pages/donations/Donations.jsx';
import HomePage from './pages/home/HomePage.jsx';
import Splash from './components/screens/Splash/Splash';
import HomeDetail from './pages/home/HomeDetail.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <Routes>
        <Route path="splash/" element={<Splash />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/homes/:id" element={<HomeDetail />} />
      </Routes>
    </div>
  );
};


export default App;
