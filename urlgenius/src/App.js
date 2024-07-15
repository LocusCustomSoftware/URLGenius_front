import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PasswordReset from './components/PasswordReset';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/reset-password/:uid/:token" element={<PasswordReset />} /> 
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
