import { useContext, useEffect } from "react";
import MyContext from "../../ContextApi/MyContext";

const TopNavbar = () => {
  const { userName } = useContext(MyContext);

  useEffect(()=>{

  },[userName])

  return (
    <header
      className="
        bg-[#2c2f8c]
        text-white
        shadow-sm
        px-4 sm:px-6
        py-3
        flex justify-between items-center
        fixed top-0 left-0 right-0 z-40
        md:relative
      "
    >
      {/* Left: Title */}
      <div className="text-base sm:text-lg font-semibold tracking-wide ml-14 md:ml-0">
        Welcome
      </div>

      {/* Right: User Info */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/20 transition">
          <span className="text-sm font-medium">{userName}</span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
            {userName?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
