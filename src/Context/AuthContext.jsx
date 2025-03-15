import React, { createContext, useState } from 'react';
import { RegisterData } from '../Library/Registration'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Login Function
  const login = (credentials) => {
    const foundUser = RegisterData.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (foundUser) {
      setIsAuthenticated(true);
      setUser(foundUser);
      localStorage.setItem('token', 'fake-token'); // Simulate token storage
      localStorage.setItem('user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid email or password');
    }
  };

  // Logout Function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Register Function
  const register = (userData) => {
    // Check if the email already exists in RegisterData
    const emailExists = RegisterData.some((u) => u.email === userData.email);

    if (emailExists) {
      throw new Error('Email already exists');
    }

    // Add the new user to RegisterData
    const newUser = {
      id: RegisterData.length + 1,
      name: userData.name,
      email: userData.email,
      password: userData.password, // In a real app, hash the password before storing it!
      orders: [], // Initialize as empty
      addresses: [], // Initialize as empty
      wishlist: [], // Initialize as empty
    };

    RegisterData.push(newUser);

    // Log the updated RegisterData array
    console.log('Registered Users:', RegisterData);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};