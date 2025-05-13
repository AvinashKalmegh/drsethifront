// src/Routes/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("adminToken");
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
