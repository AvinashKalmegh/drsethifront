import React, { useContext, useEffect, useState } from "react";
import Loader from "./Loader/Loader";
import contactBg from "../assets/about.jpg";
import MyContext from "../ContextApi/MyContext";
import axios from "axios";

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const { preview, api } = useContext(MyContext);
  const [offices, setOffices] = useState([]);
  const [profileData, setProfileData] = useState({});


   const fetchProfile = async () => {
    try {
      const res = await axios.get(`${api}/profile-info/`);
      setProfileData(res.data);
      console.log(res.data)
    } catch (err) {
      toast.error("Failed to load profile info");
    }
  };

  const getOffices = async () => {
    try {
      const response = await fetch(`${api}/offices/`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setOffices(data);
    } catch (error) {
      console.error("Error fetching offices:", error);
      throw error; // Rethrow so calling code can handle it if needed
    }
  };

  useEffect(() => {
    getOffices();
    fetchProfile();
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="relative w-full bg-cover bg-center text-whit mt-20 mb-10">
      <div
        className="relative w-full h-[200px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${preview})`,
        }}
      >
        <div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: "rgba(73, 71, 71, 0.6)" }}
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center md:justify-start md:px-40">
          <p className="text-2xl md:text-4xl font-semibold text-white">
            CONTACT US
          </p>
        </div>
      </div>
      {/* Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-start justify-start mt-5  md:pl-40  text-center md:text-left">
        <div className="w-full md:w-1/2">
          {/* <h2 className="text-4xl font-bold mb-0">CONTACT US</h2> */}
          {offices.length > 0 &&
            offices.map((el, idx) => (
              <div key={idx} className="mt-5">
                <h3 className="text-lg font-semibold text-red-500 border-b-2 border-red-500 inline-block mb-4">
                  {el.branch_name}
                </h3>
                <div
                  className="blog-description text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: el.address }}
                />
              </div>
            ))}

          <p className="text-base mb-2 mt-5">
            <p className="text-black">Call Us</p>
            <span className="text-red-500 font-normal text-2xl">
              {profileData.phone}
            </span>
          </p>

          <p className="text-normal mt-5">
            <p className="text-black">Email Us</p>
            <span className="text-red-500 font-normal text-xl">
              {profileData.email}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
