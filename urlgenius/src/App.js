// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login/Login';
// import Dashboard from './components/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";
import Login from './pages/Login/Login';

// components
import Navbar from "./components/Navbar";
// import { SearchForm } from "./components/SearchForm";
import CampaignsTable from './pages/CampaignsTable';
import AddUser from './pages/AddUser';
import ResetPassword from './pages/ResetPassword';
import { AuthProvider, useAuth } from './context/AuthContext';
import UserArea from "./pages/Users/UserArea";
import CreateUser from "./pages/Users/CreateUser";
import UserManagement from "./pages/Users/UserManagement";
import UserDetails from "./pages/Users/UserDetails";
import Campaigns from "./pages/Campaings/Campaing";
import NewCampaign from "./pages/Campaings/CreateCampaing";
import CampaignCreation from "./pages/Campaings/CampaingChoiceCreate";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route index element={<Home />} />
              <Route path="/products/:id/info" element={<Info />} />
              <Route path="/campaigns/:campanhaId" element={<CampaignsTable />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/create-campaign" element={<NewCampaign />} />
              <Route path="/campaing-choice" element={<CampaignCreation />} />
              <Route path="/reset_password" element={<ResetPassword />} />
              <Route path="/user-area" element={<UserArea />} />
              <Route path="/add_user" element={<AddUser />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/user-details/:id" element={<UserDetails />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  const user = {
    'name': 'Locus'
  }
  return isAuthenticated ? (
    <>
      <Navbar user={user} />
      <Outlet /> {/* Renderiza as rotas internas */}
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default App;
