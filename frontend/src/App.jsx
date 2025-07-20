
// src/App.jsx
import React from 'react';
import  { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar.jsx';
import Donations from './pages/donations/Donations.jsx';
import HomePage from './pages/home/HomePage.jsx';
import Splash from './components/screens/Splash/Splash';
import HomeDetail from './pages/home/HomeDetail.jsx';
import AdminDashboard from './pages/admin/AdminDashboard';
import CaregiverDashboard from './pages/caregiver/CaregiverDashboard';
import DonorDashboard from './pages/donor/DonorDashboard';

const App = () => {
  const userRole = localStorage.getItem('role'); // Simulated login role
  


  const renderDashboard = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'caregiver':
        return <CaregiverDashboard />;
      case 'donor':
        return <DonorDashboard />;
      default:
        return <Navigate to="/not-found" />;
    }
    
  };
  console.log('Role from localStorage:', userRole);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/homes" element={<HomePage />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/homes/:id" element={<HomeDetail />} />

        {/* Dashboards */}
        <Route path="/dashboard" element={renderDashboard()} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/caregiver" element={<CaregiverDashboard />} />
        <Route path="/donor" element={<DonorDashboard />} />
      </Routes>
    </div>
    
  );
};


export default App;
