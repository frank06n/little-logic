import axios from 'axios';
import { Student, Teacher, AuthResponse, School } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
};

// Students API
export const studentsAPI = {
  getAll: async (): Promise<Student[]> => {
    const response = await api.get('/students');
    return response.data;
  },
  
  getById: async (id: string): Promise<Student> => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },
  
  create: async (student: Omit<Student, '_id'>): Promise<Student> => {
    const response = await api.post('/students', student);
    return response.data;
  },
  
  update: async (id: string, student: Partial<Student>): Promise<Student> => {
    const response = await api.put(`/students/${id}`, student);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/students/${id}`);
  },
};

// School API
export const schoolAPI = {
  get: async (): Promise<School> => {
    const response = await api.get('/school');
    return response.data;
  },
  
  update: async (school: School): Promise<School> => {
    const response = await api.put('/school', school);
    return response.data;
  },
};