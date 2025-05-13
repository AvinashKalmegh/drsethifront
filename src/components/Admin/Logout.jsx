// src/components/Admin/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminid");
    localStorage.removeItem("adminemail");
    localStorage.removeItem("firstName");
    navigate("/admin/login");
  }, [navigate]);

  return null; // or a spinner/loading indicator
};

export default Logout;
