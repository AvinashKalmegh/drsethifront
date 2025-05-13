import { Settings, Globe, ChevronDown } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../ContextApi/MyContext";

const TopNavbar = () => {
  const { userName } = useContext(MyContext);
  return (
    <header className="bg-[#2c2f8c] text-white shadow-sm px-6 py-3 flex justify-between items-center">
      {/* Left: Logo or page name */}
      <div className="text-lg font-semibold tracking-wide">Welcome</div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center space-x-6">
        {/* <Globe className="hover:text-gray-200 cursor-pointer" /> */}
        {/* <Settings className="hover:text-gray-200 cursor-pointer" /> */}

        {/* User dropdown (static for now) */}
        <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/20 transition">
          <span className="text-sm font-medium">{userName}</span>
          {/* <ChevronDown size={16} /> */}
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
            {userName?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
