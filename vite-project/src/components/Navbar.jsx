import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import { MdStars } from "react-icons/md";

const Navbar = () => {
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const image = useSelector((state) => state.user.imageURL);
  const location = useLocation();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);

  const linkClass = (path) =>
    `rounded-lg px-4 py-3 text-sm font-medium text-white no-underline transition hover:bg-[#444] ${
      location.pathname === path ? "bg-[#444]" : ""
    }`;

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {
          withCredentials: true,
        },
      );

      toast.success(res.data.message);

      closeDrawer();
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }

      console.log(err);
    }
  };

  const handleUserProfileEdit = async () => {
    try {
      navigate("/edit/profile");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
      console.log(err);
    }
  };

  return (
    <nav className="shrink-0 bg-base-200 text-white md:min-h-screen md:w-60">
      <div className="flex items-center justify-between bg-base-200 p-4 md:hidden">
        <div className="flex items-center gap-3">
          {image ? (
            <img
              src={image}
              alt={firstName}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4a853] font-bold text-black">
              {firstName?.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold">{firstName}</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isDrawerOpen}
          onClick={() => setIsDrawerOpen(true)}
          className="rounded-lg p-2 transition hover:bg-[#444] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {isDrawerOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeDrawer}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-base-200 p-5 shadow-2xl transition-transform duration-300 md:static md:min-h-screen md:w-60 md:translate-x-0 md:shadow-none ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="mb-8 flex items-center justify-between cursor-pointer"
          onClick={handleUserProfileEdit}
        >
          <div className="flex items-center gap-3">
            {image ? (
              <img
                src={image}
                alt={firstName}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4a853] font-bold text-black">
                {firstName?.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm font-semibold">{firstName}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeDrawer}
            className="rounded-lg p-2 transition hover:bg-[#444] md:hidden"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <Link to="/feed" onClick={closeDrawer} className={linkClass("/feed")}>
            Explore
          </Link>
        </div>

        <div className="mt-auto">
          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white transition hover:bg-[#d4a853] hover:text-black"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
