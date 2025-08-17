import React, { createContext, useContext, useState, useEffect } from 'react';
import { Teacher } from '../types';
import { authAPI } from '../services/api';

interface AuthContextType {
  teacher: Teacher | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token on app load
    const token = localStorage.getItem('authToken');
    const storedTeacher = localStorage.getItem('teacher');
    
    if (token && storedTeacher) {
      setTeacher(JSON.parse(storedTeacher));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('teacher', JSON.stringify(response.teacher));
      setTeacher(response.teacher);
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await authAPI.register(name, email, password);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('teacher', JSON.stringify(response.teacher));
      setTeacher(response.teacher);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('teacher');
    setTeacher(null);
  };

  const value = {
    teacher,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};