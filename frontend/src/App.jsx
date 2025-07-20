
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
import UserNavBar from './context/UserNavBar.jsx';

const App = () => {
  const userRole = localStorage.getItem('role'); // Simulated login role
   const username = localStorage.getItem('username'); // Simulated username

  const user = userRole ? { role: userRole, username } : null;

  const renderDashboard = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard user={user} />;
      case 'caregiver':
        return <CaregiverDashboard user={user} />;
      case 'donor':
        return <DonorDashboard user={user} />;
      default:
        return <Navigate to="/not-found" />;
    }
    
  };
  console.log('Role from localStorage:', userRole);
  return (
    <div className="min-h-screen bg-gray-100">
        {/* Show navbar only when logged in */}
        {user && <UserNavBar user={user} />}


        <Routes>
          {/* Public route */}
          <Route path="/" element={!user ? <Splash /> : <Navigate to="/home" />} />

          {/* Private Routes - require login */}
          {user ? (
            <>
              <Route path="/home" element={<HomePage user={user} />} />
              <Route path="/homes/:id" element={<HomeDetail user={user} />} />
              <Route path="/donations" element={<Donations user={user} />} />
              <Route path="/dashboard" element={renderDashboard()} />
              <Route path="/admin" element={<AdminDashboard user={user} />} />
              <Route path="/caregiver" element={<CaregiverDashboard user={user} />} />
              <Route path="/donor" element={<DonorDashboard user={user} />} />
            </>
          ) : (
            // Redirect if not logged in
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
    </div>
    
  );
};


export default App;
