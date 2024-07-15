import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PasswordReset from './components/PasswordReset';
import ProtectedRoute from './components/ProtectedRoute';
import CreateUser from './components/CreateUsers';

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
        <Route path="/create-user" element={
          <ProtectedRoute>
            <CreateUser />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
