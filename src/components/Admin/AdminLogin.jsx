import React, { useContext, useEffect, useState } from "react";
import loginbg from "../../assets/loginbg.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import MyContext from "../../ContextApi/MyContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {api} = useContext(MyContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        setLoader(true);
      const response = await axios.post(`${api}/login/`, {
        email:username,
        password,
      });

      const data = response.data.user;
      console.log(data)
      setLoader(false)

      // ✅ Save token or user data as needed
      localStorage.setItem("adminToken", "true"); // simulate token
      localStorage.setItem("adminid", response.data.user.id); // simulate token
      localStorage.setItem("adminemail",response.data.user.email);
      localStorage.setItem("firstName",response.data.user.first_name);
      toast.success("Login successful");

      // ✅ Redirect to admin dashboard (if using React Router)
      navigate("/admin/dashboard");


    } catch (error) {
        setLoader(false);
      console.error(error);
      if (error.response && error.response.data) {
        const errors = error.response.data;
        // Show first error message
        const firstKey = Object.keys(errors)[0];
        toast.error(`${firstKey}: ${errors[firstKey]}`);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  useEffect(() => {
  if (localStorage.getItem("adminToken")) {
    navigate("/admin/dashboard");
  }
}, []);


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-md w-[350px] shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-white mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-white/80 placeholder-gray-600 text-black focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-6 rounded bg-white/80 placeholder-gray-600 text-black focus:outline-none"
          />
          <button
          disabled={loader}
            type="submit"
            className="cursor-pointer w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition"
          >
           {loader ? "Loading..." : "Login"} 
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
