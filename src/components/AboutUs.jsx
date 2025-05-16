import React, { useContext, useEffect, useState } from "react";
import Loader from "./Loader/Loader";
import MyContext from "../ContextApi/MyContext";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("introduction");
  const [loading, setLoading] = useState(true);
  const { preview } = useContext(MyContext);

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on tab change (optional UX)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setLoading(true);
      setTimeout(() => {
        setActiveTab(tab);
        setLoading(false);
      }, 300); // simulate loading duration
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-white text-gray-800 mt-20">
      {/* Header Section */}
      <div
        className="relative w-full h-[200px] bg-cover bg-center"
        style={{ backgroundImage: `url(${preview})` }}
      >
        <div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: "rgba(73, 71, 71, 0.6)" }}
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center md:justify-start md:px-40">
          <p className="text-2xl md:text-4xl font-semibold text-white">
            {activeTab === "introduction" ? "INTRODUCTION" : "VISION & MISSION"}
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="text-sm flex flex-col text-justify lg:flex-row px-6 md:px-12 lg:px-24 py-12">
        {/* Main Text */}
        <div className="lg:w-3/4 space-y-6">
          {activeTab === "introduction" ? (
            <>
              <p>
                Dr. Vikram Sethi is a professor at the Raj Soin College of
                Business at Wright State University, Dayton Ohio. In 2006, he
                founded the Institute of Defense Studies and Education at Wright
                State University and served as its director. The activities of
                the institute included providing educational programs to the
                United States Department of Defense. He also set up the Center
                of Professional Education.
              </p>
              <p>
                In a career spanning more than two decades, Dr. Sethi has
                handled a variety of teaching, research, and consulting
                assignments in areas like information technology, data-intensive
                supply chains, defense studies, RFID and sensors, startup
                incubation, and global business development. He is also credited
                with developing the Stress Management and Determination
                Inventory (SMDI), a psychological assessment that combines 33
                stress factors into a single scale.
              </p>
              <p>
                Dr. Vikram Sethi has published more than 50 articles in highly
                cited peer-reviewed journals. His books include ‘Organizational
                Transformation Through Business Process Reengineering’ (1998,
                Prentice Hall) and contributions in ‘Weapons of Mass
                Psychological Destruction: And the People Who Use Them’ (2015,
                Praeger). He just released his new book entitled ‘Cyber Weapons
                of Mass Psychological Destruction,’ which examines the evolution
                of cyber warfare as a distinct discipline from the 1990s to the
                present day. His next book will be released in December, 2020,
                and is entitled “Cyber Fear, Trauma, and Psychosis.”
              </p>
              <p>
                Dr. Sethi studied at Thapar Institute of Engineering and
                Technology, India. He subsequently earned an MBA from Wright
                State University and a PhD from Joseph M. Katz Graduate School
                of Business, University of Pittsburgh, Pennsylvania.
              </p>
              <p>
                Dr. Sethi supports entrepreneurship globally and has advised
                startup organizations from the ground up and guided them toward
                improved performance and success.
              </p>
            </>
          ) : (
            <p className=" text-gray-700">
              Dr. Sethi supports entrepreneurship globally and has advised
              startup organizations from the ground up and guided them toward
              improved performance and success.
            </p>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4 mt-12 lg:mt-0 lg:pl-12">
          <div className="border-l-4 border-red-600 pl-4 mb-4">
            <h2 className="text-xl font-semibold text-red-600">ABOUT US</h2>
          </div>
          <div className="flex flex-col gap-4">
            <button
              className={`cursor-pointer px-4 py-2 rounded-full border transition ${
                activeTab === "introduction"
                  ? "bg-red-600 text-white"
                  : "text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              }`}
              onClick={() => handleTabChange("introduction")}
            >
              Introduction
            </button>
            <button
              className={`cursor-pointer px-4 py-2 rounded-full border transition ${
                activeTab === "vision"
                  ? "bg-red-600 text-white"
                  : "text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              }`}
              onClick={() => handleTabChange("vision")}
            >
              Vision & Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
