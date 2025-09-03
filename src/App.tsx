import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { SchoolDescription } from "./components/SchoolDescription";

// Wrapper for protecting private routes
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { teacher, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return teacher ? <>{children}</> : <Navigate to="/login" replace />;
};

// Home page (public)
const Home: React.FC = () => (
  <div className="min-h-screen">
    <Navigation />
    <main>
      <HeroSection />
      <SchoolDescription />
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/students/certificate"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/students/details"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
