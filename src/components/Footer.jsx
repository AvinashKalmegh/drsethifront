import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import MyContext from "../ContextApi/MyContext";
const Footer = () => {
  const [profileData, setProfileData] = useState({});

  const { api } = useContext(MyContext);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${api}/profile-info/`);
      setProfileData(res.data);
    } catch (err) {
      toast.error("Failed to load profile info");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <footer className="fixed  bg-cover bg-center bottom-0 bg-white text-black px-6 py-10 text-sm relative z-10">
      <div className=" max-w-7xl mx-auto flex flex-col md:flex-row justify-center  items-center md:items-center gap-5 md:gap-50">
        {/* Contact Section */}
        <div className="space-y-2 text-center md:text-left lg:text-left">
          <a
            href="tel:+19373446241"
            className="text-red-600 text-3xl font-semibold hover:underline block"
          >
            {profileData.phone}
          </a>
          <a
            href="mailto:vikram.sethi@wright.edu"
            className="hover:underline block"
          >
            {profileData.email}
          </a>
          {/* <p className="leading-snug">
            707 Miamisburg-Centerville Road<br />
            Dayton, OH 45459, STE 223
          </p> */}
        </div>

        {/* Social & Copyright */}
        <div className="text-center  lg:text-right md:text-right space-y-2">
          <div className=" flex justify-center md:justify-start lg:justify-start space-x-3">
            <a
              href={profileData?.facebook}
              target="_blank"
              rel="noreferrer"
              title="Facebook"
            >
              <FaFacebook className="text-red-600 hover:text-red-800 text-lg" />
            </a>
            <a
              href={profileData?.youtube}
              target="_blank"
              rel="noreferrer"
              title="Twitter"
            >
              <FaYoutube className="text-red-600 hover:text-red-800 text-lg" />
            </a>
            <a
              href={profileData?.linkedin}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
            >
              <FaLinkedin className="text-red-600 hover:text-red-800 text-lg" />
            </a>
          </div>
          <p className="text-xs">
            © 2025 Dr. Vikram Sethi, All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
