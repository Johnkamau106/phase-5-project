import React from 'react';

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded shadow p-6 flex flex-col items-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-gray-600 mt-2">{title}</div>
    </div>
  );
};

export default StatCard;
