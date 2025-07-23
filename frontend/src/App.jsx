// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getUserFromLocalStorage } from './utils/auth.js';
import Donations from './pages/donations/Donations.jsx';
import HomePage from './pages/home/HomePage.jsx';
import Splash from './components/screens/Splash/Splash';
import HomeDetail from './pages/home/HomeDetail.jsx';
import AdminDashboard from './pages/admin/AdminDashboard';
import CaregiverDashboard from './pages/caregiver/CaregiverDashboard';
import DonorDashboard from './pages/donor/DonorDashboard';
import UserNavBar from './context/UserNavBar.jsx';
import Profile from './pages/profile/Profile'; 
import AuthPage from './pages/login/Login'; // or your correct path
import './App.css';

const App = () => {
  const [user, setUser] = useState(() => getUserFromLocalStorage());
  const [currentUser, setCurrentUser] = useState(() => getUserFromLocalStorage());


  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  const renderDashboard = () => {
    if (!user) return <Navigate to="/not-found" />;
    if (!user.roles || !Array.isArray(user.roles)) {
      console.error("User object does not have a valid 'roles' array:", user);
      return <Navigate to="/not-found" />;
    }
    if (user.roles.includes('admin')) return <AdminDashboard user={user} />;
    if (user.roles.includes('caregiver')) return <CaregiverDashboard user={user} />;
    if (user.roles.includes('donor')) return <DonorDashboard user={user} />;
    return <Navigate to="/not-found" />;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {user && <UserNavBar user={user} onLogout={handleLogout} />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<AuthPage onLogin={setUser} />} />

        {/* Private routes */}
        {user ? (
          <>
            <Route path="/home" element={<HomePage user={user} />} />
            <Route path="/homes/:id" element={<HomeDetail user={user} />} />
            <Route path="/donations" element={<Donations user={user} />} />
            <Route path="/dashboard" element={renderDashboard()} />
            <Route path="/admin" element={<AdminDashboard user={user} />} />
            <Route path="/caregiver" element={<CaregiverDashboard user={user} />} />
            <Route path="/donor" element={<DonorDashboard user={user} />} />
            <Route path="/profile" element={<Profile user={currentUser} />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
