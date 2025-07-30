import React from 'react';
import DashboardLayout from '../admin/DashboardLayout';
import StatCard from '../components/StatCard';

const AdminDashboard = () => {
  // Updated stats data to match screenshot
  const stats = [
    { title: 'Total Homes', value: 5 },
    { title: 'Total Users', value: 120 },
    { title: 'Active Donations', value: '3,200' },
  ];

  return (
    <DashboardLayout>
      <section>
        <h1 className="text-3xl font-semibold mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} />
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboard;
