import React from 'react';
import Sidebar from '../components/Sidebar';

const ManageHomes = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-4">Manage Homes</h1>
        <p>This is the Manage Homes page. Add your content here.</p>
      </main>
    </div>
  );
};

export default ManageHomes;
