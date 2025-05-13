import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Users,
  Brush,
  ImageIcon,
  Video,
  FileText,
  MapPin,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const [openCustomize, setOpenCustomize] = useState(false);

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded transition duration-200 ${
      isActive ? "bg-indigo-700 font-semibold" : "hover:bg-indigo-600"
    }`;

  return (
    <>
      <Helmet>
        <title>Content Management</title>
      </Helmet>

      <aside className="w-64 h-screen bg-[#1e1e2f] text-white p-5 fixed top-0 left-0 overflow-y-auto shadow-lg z-40">
        <h2 className="text-2xl font-extrabold mb-8 tracking-tight">Admin Panel</h2>

        <nav className="flex flex-col space-y-2 text-sm">
          <NavLink to="/admin/dashboard" className={navItemClass}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink to="/admin/user" className={navItemClass}>
            <Users size={18} /> User
          </NavLink>

          {/* Customize with dropdown submenu */}
          <div className="space-y-1">
            <button
              onClick={() => setOpenCustomize(!openCustomize)}
              className="w-full flex justify-between items-center p-2 rounded hover:bg-indigo-600 focus:outline-none transition"
              aria-expanded={openCustomize}
              aria-controls="customize-menu"
            >
              <span className="flex items-center gap-2">
                <Brush size={18} /> Customize
              </span>
              {openCustomize ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            <div
              id="customize-menu"
              className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col ml-3 border-l border-gray-600 pl-3 space-y-1 ${
                openCustomize
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <NavLink to="/admin/banner" className="py-1 px-2 rounded hover:bg-indigo-600">
                Banner
              </NavLink>
              <NavLink to="/admin/sourcebanner" className="py-1 px-2 rounded hover:bg-indigo-600">
                Source Banner
              </NavLink>
            </div>
          </div>

          <NavLink to="/admin/blog" className={navItemClass}>
            <FileText size={18} /> Blog
          </NavLink>

           <NavLink to="/admin/media-gallery" className={navItemClass}>
            <ImageIcon size={18} /> Media
          </NavLink>

          <NavLink to="/admin/photo-gallery" className={navItemClass}>
            <ImageIcon size={18} /> Photo Gallery
          </NavLink>

          <NavLink to="/admin/video-gallery" className={navItemClass}>
            <Video size={18} /> Video Gallery
          </NavLink>

          <NavLink to="/admin/offices" className={navItemClass}>
            <MapPin size={18} /> Offices / Branches
          </NavLink>

          <NavLink to="/logout" className={navItemClass}>
            <LogOut size={18} /> Logout
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;