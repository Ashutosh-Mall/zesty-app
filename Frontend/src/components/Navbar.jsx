import axios from "axios";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = Boolean(user?.userId);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        {withCredentials: true},
      );
    } catch (error) {
      console.error("Logout failed (server)", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("isLogin");
      navigate("/signin");
      setOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="bg-gray-800/10 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="text-3xl font-bold text-orange-500">Zesty</div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <i className="fa-solid fa-bars text-xl"></i>
            </button>

            <div className="hidden md:flex items-center gap-10">
              <div className="flex gap-6">
                <Link className="nav-link text-gray-300" to="/">
                  Home
                </Link>
                <Link className="nav-link text-gray-300" to="/about">
                  About
                </Link>
                <Link className="nav-link text-gray-300" to="/contact">
                  Contact
                </Link>
              </div>

              <div className="flex gap-4">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/signup"
                      className="rounded-md bg-orange-200 px-4 py-2 text-sm text-gray-700 hover:bg-orange-600 font-medium"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/signin"
                      className="rounded-md border border-gray-900 px-4 py-2 text-sm text-orange-700 hover:bg-orange-500 hover:text-white font-medium"
                    >
                      Log In
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      className="rounded-md px-4 py-2 text-sm text-orange-400 border border-orange-500 hover:bg-orange-500 hover:text-white font-medium"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 font-medium"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="bg-gray-900/80 backdrop-blur-md px-6 py-4 space-y-3">
            <Link
              onClick={() => setOpen(false)}
              className="block text-white"
              to="/"
            >
              Home
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="block text-white"
              to="/about"
            >
              About
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="block text-white"
              to="/contact"
            >
              Contact
            </Link>

            <hr className="border-white/10" />

            {!isLoggedIn ? (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  className="block text-white"
                  to="/signup"
                >
                  Sign Up
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  className="block text-white"
                  to="/signin"
                >
                  Log In
                </Link>
              </>
            ) : (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  className="block text-white"
                  to="/profile"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-left w-full text-red-400"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
