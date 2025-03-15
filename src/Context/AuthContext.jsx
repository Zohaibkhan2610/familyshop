import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [stock, setStock] = useState();

  // Function to update stock globally
  const updateStock = (productName, quantityToDeduct) => {
    setStock((prevStock) => ({
      ...prevStock,
      [productName]: prevStock[productName] - quantityToDeduct,
    }));
  };

  const login = (credentials) => {
    setIsAuthenticated(true);
    setUser({ name: 'John Doe', email: credentials.email });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, stock, updateStock }}>
      {children}
    </AuthContext.Provider>
  );
};