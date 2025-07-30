import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/manage-homes', label: 'Manage Homes' },
    { to: '/admin/manage-users', label: 'Manage Users' },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <div className="p-6 text-xl font-bold border-b border-gray-200">
        Admin Panel
      </div>
      <nav className="mt-6">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-6 py-3 hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
