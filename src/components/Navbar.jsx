import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      // Lock background scroll without jumping
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Restore scroll
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileOpen]);

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white backdrop-blur-sm shadow-md py-2"
          : "bg-white py-1"
      }`}
    >
      <div
        className={`max-w-[1320px] mx-auto px-4 md:px-10 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? "h-[65px]" : "h-[85px]"
        }`}
      >
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className={`transition-all duration-500 w-auto 
                ${
                  isScrolled
                    ? "h-[50px] md:h-[60px] lg:h-[70px]"
                    : "h-[55px] md:h-[80px] lg:h-[85px]"
                }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link
              to="/"
              className="text-red-600 text-[16px] font-normal hover:text-[#2fa3dc] transition-all duration-300"
            >
              Home
            </Link>
          </li>

          {/* Dropdown Menu on Hover */}
          <li className="relative group">
            <Link to="/about" className="text-red-600 font-normal flex items-center hover:text-[#2fa3dc] transition-all duration-300">
              About
            </Link>
          </li>

          <li className="relative group">
            <button className="text-red-600 font-normal flex items-center hover:text-[#2fa3dc] transition-all duration-300 cursor-pointer">
              Media
            </button>
            <ul className="absolute mt-2 w-40 bg-red-600 border border-gray-700 shadow-lg rounded-md z-40 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
              <li>
                <Link
                  to="/articles"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  to="/photos"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                >
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/videos"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                >
                  Video Gallery
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <Link to="/blogs" className="text-red-600 font-normal flex items-center hover:text-[#2fa3dc] transition-all duration-300">
              Blogs
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-red-600 text-[16px] font-normal hover:text-[#2fa3dc] transition-all duration-300"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileOpen ? (
              <X size={34} color="red" />
            ) : (
              <Menu size={34} color="red" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[999] flex justify-end">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={toggleMobileMenu}
          ></div>

          {/* Sidebar */}
          <div className="relative w-[170px] bg-[#e30613] h-screen shadow-lg z-[1000] px-6 py-4 flex flex-col justify-between animate-slide-in-right">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-white font-bold text-lg">CLOSE</span>
                <button onClick={toggleMobileMenu}>
                  <X size={22} color="white" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-2 text-white">
                {/* Home */}
                <a
                  onClick={() => {
                    navigate("/");
                    toggleMobileMenu();
                  }}
                  className="text-base"
                >
                  Home
                </a>

                {/* About Us */}
                <a
                  className="text-base flex justify-between items-center"
                  onClick={() => {
                    navigate("/about");
                    toggleMobileMenu();
                  }}
                >
                  About
                </a>

                {/* Products */}
                <button
                  className="text-base flex justify-between items-center"
                  onClick={() => setProductsOpen(!productsOpen)}
                >
                  Media
                </button>
                <div
                  className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out transform ${
                    productsOpen
                      ? "max-h-60 opacity-100 scale-y-100"
                      : "max-h-0 opacity-0 scale-y-0"
                  }`}
                >
                  <a
                    onClick={() => {
                      navigate("/articles");
                      toggleMobileMenu();
                      setProductsOpen(false);
                    }}
                    className="block text-sm"
                  >
                    Articles
                  </a>
                  <a
                    onClick={() => {
                      navigate("/books");
                      toggleMobileMenu();
                      setProductsOpen(false);
                    }}
                    className="block text-sm"
                  >
                    Books
                  </a>
                  <a
                    onClick={() => {
                      navigate("/photos");
                      toggleMobileMenu();
                      setProductsOpen(false);
                    }}
                    className="block text-sm"
                  >
                    Photo Gallery
                  </a>
                  <a
                    onClick={() => {
                      navigate("/videos");
                      toggleMobileMenu();
                      setProductsOpen(false);
                    }}
                    className="block text-sm"
                  >
                    Video Gallery
                  </a>
                </div>

                {/* Services */}
                <button
                  className="text-base flex justify-between items-center"
                  onClick={() => {navigate("/blogs");
                    toggleMobileMenu();
                    setProductsOpen(false)}}
                >
                  Blogs
                </button>

                {/* Contact & News */}
                <a
                  onClick={() => {
                    navigate("/contact");
                    toggleMobileMenu();
                  }}
                  className="text-base"
                >
                  Contact
                </a>
              </nav>
            </div>

            {/* Footer Social Icons */}
            <div className="text-white text-xs mt-8">
              <p className="mb-2">— FOLLOW US ON —</p>
              <div className="flex space-x-4 text-md     justify-center">
                <a
                  href="https://www.facebook.com/cyberweaponsbyDrVikramSethi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=tn416PYU7ZI&t=8s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/vikram-sethi-4aa859/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   return (
//     <nav className="bg-black shadow-md position-fixed">
//       <div className="max-w-7xl mx-auto px-20 py-3 flex items-center justify-between">
//         {/* Logo */}
//         <a href="/index.html">
//           <img src={logo} alt="Logo" className="h-20 w-90" />
//         </a>

//         {/* Navigation Links */}
//         <ul className="flex items-center gap-6">
//           <li>
//             <Link
//               to="/"
//               className="text-red-600 font-normal hover:text-blue-600"
//             >
//               Home
//             </Link>
//           </li>

//           {/* Dropdown Menu on Hover */}
//           <li className="relative group">
//             <button className="text-red-600 font-normal flex items-center">
//               About Us
//             </button>
//             <ul className="absolute mt-2 w-40 bg-red-600 border border-gray-700 shadow-lg rounded-md z-10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
//               <li>
//                 <a
//                   href="/page/introduction.html"
//                   className="block px-4 py-2 text-white hover:bg-gray-800"
//                 >
//                   Introduction
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/page/mission.html"
//                   className="block px-4 py-2 text-white hover:bg-gray-800"
//                 >
//                   Mission
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/page/mission.html"
//                   className="block px-4 py-2 text-white hover:bg-gray-800"
//                 >
//                   Vision
//                 </a>
//               </li>
//             </ul>
//           </li>

//           <li className="relative group">
//             <button className="text-red-600 font-normal flex items-center">
//               Products
//             </button>
//             <ul className="absolute mt-2 w-50 bg-red-600 border border-gray-700 shadow-lg rounded-md z-10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
//               <li>
//                 <a
//                   href="/page/introduction.html"
//                   className="block px-4 py-2 text-white hover:bg-gray-800"
//                 >
//                   Intelligent HR Solutions
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/page/mission.html"
//                   className="block px-4 py-2 text-white hover:bg-gray-800"
//                 >
//                   Knowledge Portals
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/page/mission.html"
//                   className="block px-4 py-2 text-white hover:bg-gray-800"
//                 >
//                   Smart Health
//                 </a>
//               </li>
//             </ul>
//           </li>
//           <li className="relative group">
//             <button className="text-red-600 font-normal flex items-center">
//               Services
//             </button>
//             <ul className="absolute mt-2 w-50 bg-red-600 border border-gray-700 shadow-lg rounded-md z-10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
//               <li>
//                 <a
//                   href="/page/introduction.html"
//                   className="block px-4 py-2 text-white hover:bg-gray-800"
//                 >
//                   AS400/IBMi Services
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/page/mission.html"
//                   className="block px-4 py-2 text-white hover:bg-gray-800"
//                 >
//                   Staffing Services
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/page/mission.html"
//                   className="block px-4 py-2 text-white hover:bg-gray-800"
//                 >
//                   Architecture Analysis
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/page/mission.html"
//                   className="block px-4 py-2 text-white hover:bg-gray-800"
//                 >
//                   Cyber Resiliency
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/page/mission.html"
//                   className="block px-4 py-2 text-white hover:bg-gray-800"
//                 >
//                   Data Management
//                 </a>
//               </li>

//               <li>
//                 <a
//                   href="/page/mission.html"
//                   className="block px-4 py-2 text-white hover:bg-gray-800"
//                 >
//                   Digital Transformation
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/page/mission.html"
//                   className="block px-4 py-2 text-white hover:bg-gray-800"
//                 >
//                   Enterprise Applications
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/page/mission.html"
//                   className="block px-4 py-2 text-white hover:bg-gray-800"
//                 >
//                   Programming Services
//                 </a>
//               </li>
//             </ul>
//           </li>
//           <li>
//             <Link
//               to="/contact"
//               className="text-red-600 font-normal hover:text-blue-600"
//             >
//               Contact
//             </Link>
//           </li>
//           <li>
//             <a
//               href="/index.html"
//               className="text-red-600 font-normal hover:text-blue-600"
//             >
//               News
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
