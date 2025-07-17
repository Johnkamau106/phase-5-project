import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (username, email, password) => {
    // Simulate registration API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && email && password) {
          setUser({ username, email });
          resolve({ username, email });
        } else {
          reject('Invalid registration details');
        }
      }, 1000);
    });
  };

  const login = async (email, password) => {
    // Simulate login API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          setUser({ email });
          resolve({ email });
        } else {
          reject('Invalid login details');
        }
      }, 1000);
    });
  };

  const value = {
    user,
    register,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
