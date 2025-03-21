import React, { createContext, useState, useEffect } from 'react';
import { RegisterData } from '../Library/Registration';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Initialize user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Validate that the user object has required fields
        if (parsedUser && parsedUser.email) {
          setUser(parsedUser);
          setIsAuthenticated(true);
        } else {
          console.error('Invalid user data in localStorage:', parsedUser);
        }
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    }
  }, []);

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
      avatar: "default-avatar.jpg", // Default avatar
      address: "", // Initialize as empty
      country: "Egypt", // Default country
      currency: "EGP", // Default currency
      language: "English", // Default language
      orders: [], // Initialize as empty
      addresses: [], // Initialize as empty
      wishlist: [], // Initialize as empty
    };

    RegisterData.push(newUser);

    // Log the updated RegisterData array
    console.log('Registered Users:', RegisterData);
  };

  // Update User Profile Function
  const updateUserProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Persist the updated user
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};