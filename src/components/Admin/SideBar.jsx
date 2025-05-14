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
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [openCustomize, setOpenCustomize] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded transition duration-200 ${
      isActive ? "bg-indigo-700 font-semibold" : "hover:bg-indigo-600"
    }`;

  return (
    <>
      <Helmet>
        <title>Content Management</title>
      </Helmet>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="cursor-pointer p-2 bg-indigo-600 rounded text-white"
        >
          <Menu />
        </button>
      </div>

      {/* Sidebar + Backdrop */}
      <div>
        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

       <aside
  className={`fixed top-0 left-0 h-screen w-64 bg-[#1e1e2f] text-white p-5 shadow-lg z-50 transition-transform duration-300 transform
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0`}
>
          {/* Close button for mobile */}
          <div className="md:hidden flex justify-end mb-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="cursor-pointer text-white p-1"
            >
              <X />
            </button>
          </div>

          <h2 className="text-2xl font-extrabold mb-8 tracking-tight">
            Admin Panel
          </h2>

          <nav className="flex flex-col space-y-2 text-sm">
            <NavLink to="/admin/dashboard" onClick={()=>setSidebarOpen(false)} className={navItemClass}>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>

            <NavLink to="/admin/user" onClick={()=>setSidebarOpen(false)} className={navItemClass}>
              <Users size={18} /> User
            </NavLink>

            {/* Customize Dropdown */}
            <div className="space-y-1">
              <button
                onClick={() => setOpenCustomize(!openCustomize)}
                className="cursor-pointer w-full flex justify-between items-center p-2 rounded hover:bg-indigo-600"
                aria-expanded={openCustomize}
                aria-controls="customize-menu"
              >
                <span className="flex items-center gap-2">
                  <Brush size={18} /> Customize
                </span>
                {openCustomize ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              <div
                id="customize-menu"
                className={`transition-all duration-300 overflow-hidden flex flex-col ml-3 border-l border-gray-600 pl-3 space-y-1 ${
                  openCustomize
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <NavLink
                  to="/admin/banner"
                  onClick={()=>setSidebarOpen(false)}
                  className="py-1 px-2 rounded hover:bg-indigo-600"
                >
                  Banner
                </NavLink>
                <NavLink
                  to="/admin/sourcebanner"
                  onClick={()=>setSidebarOpen(false)}
                  className="py-1 px-2 rounded hover:bg-indigo-600"
                >
                  Source Banner
                </NavLink>
              </div>
            </div>

            <NavLink to="/admin/blog" onClick={()=>setSidebarOpen(false)} className={navItemClass}>
              <FileText size={18} /> Blog
            </NavLink>

            <NavLink to="/admin/media-gallery" onClick={()=>setSidebarOpen(false)} className={navItemClass}>
              <ImageIcon size={18} /> Media
            </NavLink>

            <NavLink to="/admin/photo-gallery" onClick={()=>setSidebarOpen(false)} className={navItemClass}>
              <ImageIcon size={18} /> Photo Gallery
            </NavLink>

            <NavLink to="/admin/video-gallery" onClick={()=>setSidebarOpen(false)} className={navItemClass}>
              <Video size={18} /> Video Gallery
            </NavLink>

            <NavLink to="/admin/offices" onClick={()=>setSidebarOpen(false)} className={navItemClass}>
              <MapPin size={18} /> Offices / Branches
            </NavLink>

            <NavLink to="/logout" className={navItemClass}>
              <LogOut size={18} /> Logout
            </NavLink>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
