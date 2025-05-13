import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import MyContext from "../../ContextApi/MyContext";

const Dashboard = () => {
  const [profileData, setProfileData] = useState({
    facebook: "",
    twitter: "",
    youtube: "",
    linkedin: "",
    phone: "",
    whatsapp: "",
    email: "",
    country_state: ""
  });

  const {api} = useContext(MyContext);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${api}/profile-info/`);
      setProfileData(res.data);
    } catch (err) {
      toast.error("Failed to load profile info");
    }
  };

  const updateProfile = async () => {
    try {
      await axios.put(`${api}/profile-info/`, profileData);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef0fb] to-[#f4f4fc]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
        {/* Social Profile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 border"
        >
          <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-[#2c2f8c]">
            🔗 SOCIAL PROFILE
          </h2>
          {["facebook", "twitter", "youtube", "linkedin"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium mb-1 capitalize">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={profileData[field] || ""}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-indigo-100 focus:border-indigo-500"
              />
            </div>
          ))}

          <button
            onClick={updateProfile}
            className="bg-gradient-to-r from-[#2c2f8c] to-indigo-600 text-white py-2 px-5 rounded-lg text-sm hover:from-indigo-800 transition"
          >
            Update
          </button>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 border"
        >
          <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-[#2c2f8c]">
            📞 CONTACT
          </h2>

          {[
            { name: "phone", label: "Phone *" },
            { name: "whatsapp", label: "WhatsApp (Optional)" },
            { name: "email", label: "Email *" },
            { name: "country_state", label: "Country / State *" },
          ].map(({ name, label }) => (
            <div key={name} className="mb-4">
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type="text"
                name={name}
                value={profileData[name] || ""}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-indigo-100 focus:border-indigo-500"
              />
            </div>
          ))}

          <button
            onClick={updateProfile}
            className="bg-gradient-to-r from-[#2c2f8c] to-indigo-600 text-white py-2 px-5 rounded-lg text-sm hover:from-indigo-800 transition"
          >
            Update
          </button>
        </motion.div>
      </div>

      <footer className="text-center text-sm py-6 text-gray-500 border-t">
        © 2025 All Rights Reserved
      </footer>
    </div>
  );
};

export default Dashboard;
