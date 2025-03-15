import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { MdFamilyRestroom } from "react-icons/md";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Profile dropdown state
  const [categoryOpen, setCategoryOpen] = useState(false); // Desktop category dropdown state
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false); // Mobile category dropdown state
  const location = useLocation(); // Get current path
  const navigate = useNavigate(); // For navigation

  // Get authentication state and logout function from AuthContext
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-bold font-serif"
      : "text-gray-700 font-serif font-[500] hover:text-blue-600";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-menu")) setDropdownOpen(false);
      if (!event.target.closest(".category-menu")) setCategoryOpen(false);
      if (!event.target.closest(".mobile-menu")) setIsOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    setDropdownOpen(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-white fixed z-50 w-full border-b border-gray-200 px-4 py-3 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
          <MdFamilyRestroom className="mr-2" /> Family Shop
        </Link>

        {/* Search bar for desktop */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/About" className={isActive("/About")}>About</Link>
          <Link to="/Services" className={isActive("/Services")}>Services</Link>

          {/* Desktop Categories Dropdown */}
          <div className="relative category-menu">
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="text-gray-700 font-serif font-[600] hover:text-blue-600"
            >
              Categories
            </button>
            {categoryOpen && (
              <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <Link onClick={() => setCategoryOpen(false)}
                  to="/Men"
                  className="block px-4 py-2 hover:bg-gray-100"
                >Men</Link>
                <Link onClick={() => setCategoryOpen(false)}
                  to="/Women"
                  className="block px-4 py-2 hover:bg-gray-100"
                >Women</Link>
                <Link onClick={() => setCategoryOpen(false)}
                  to="/Children"
                  className="block px-4 py-2 hover:bg-gray-100"
                >Children</Link>
              </div>
            )}
          </div>

          <Link to="/Contact" className={isActive("/Contact")}>Contact</Link>
        </div>

        {/* Profile Dropdown */}
        <div className="relative profile-menu">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                <img src={user?.avatar || "robot.jpg"} alt="User Avatar"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                    Sign out
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="text-gray-700 font-serif font-[600] hover:text-blue-600">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700 font-serif font-[600] focus:outline-none ml-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`fixed top-16 left-0 h-full w-64 bg-white shadow-lg transform mobile-menu ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-500 ease-in-out p-4 space-y-4 z-50`}>
        
        {/* Close Button */}
        <button className="text-gray-700 font-serif font-[600] focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes size={24} />
        </button>

        {/* Mobile Search Bar */}
        <SearchBar />

        {/* Mobile Links */}
        <Link to="/" className={`block py-2 ${isActive("/")}`} onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/About" className={`block py-2 ${isActive("/About")}`} onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/Services" className={`block py-2 ${isActive("/Services")}`} onClick={() => setIsOpen(false)}>Services</Link>

        {/* Mobile Categories Dropdown */}
        <button onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
          className="text-gray-700 font-serif font-[600] hover:text-blue-600"
        >
          Categories
        </button>
        {mobileCategoryOpen && (
          <div className="pl-4">
            <Link to="/Men" className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => { setMobileCategoryOpen(false); setIsOpen(false); }}>
              Men
            </Link>
            <Link to="/Women" className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => { setMobileCategoryOpen(false); setIsOpen(false); }}>
              Women
            </Link>
            <Link to="/Children" className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => { setMobileCategoryOpen(false); setIsOpen(false); }}>
              Children
            </Link>
          </div>
        )}

        <Link to="/Contact" className={`block py-2 ${isActive("/Contact")}`}
          onClick={() => setIsOpen(false)}
        >Contact</Link>

        {/* Auth Links */}
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="block py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              Profile
            </Link>
            <button onClick={handleLogout} className="block w-full text-left py-2 text-red-600 hover:bg-gray-100">
              Sign out
            </button>
          </>
        ) : (
          <Link to="/login" className="block py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;