import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, fetchUserProfile, updateUserProfile } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('spotify_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('spotify_token') || null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('spotify_token');
      if (storedToken) {
        try {
          const res = await fetchUserProfile(storedToken);
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('spotify_user', JSON.stringify(res.user));
          } else {

            logout();
          }
        } catch (error) {
          console.error('Failed to verify user session:', error);
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginUser(email, password);
      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('spotify_token', res.token);
        localStorage.setItem('spotify_user', JSON.stringify(res.user));
        return { success: true, message: res.message, user: res.user };
      } else {
        return { success: false, message: res.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: error.message || 'Network error during login' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await registerUser(name, email, password);
      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('spotify_token', res.token);
        localStorage.setItem('spotify_user', JSON.stringify(res.user));
        return { success: true, message: res.message, user: res.user };
      } else {
        return { success: false, message: res.message || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, message: error.message || 'Network error during registration' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_user');
  };

  const updateProfile = async (profileData) => {
    if (!token) return { success: false, message: 'Not logged in' };
    try {
      const res = await updateUserProfile(token, profileData);
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('spotify_user', JSON.stringify(res.user));
        return { success: true, message: res.message, user: res.user };
      } else {
        return { success: false, message: res.message || 'Profile update failed' };
      }
    } catch (error) {
      return { success: false, message: error.message || 'Network error during update' };
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user && token),
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

