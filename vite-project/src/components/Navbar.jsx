import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { removeUser } from "../redux/Slice/UserSlice";

const Navbar = () => {
  const { firstName, lastName } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);

  const links = [{ name: "Explore", path: "/feed" }];

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        withCredentials: true,
      });

      dispatch(removeUser());
        toast.success("Logged out successfully");
      closeDrawer();
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <nav className="shrink-0 bg-[#442825] text-white md:min-h-screen md:w-60">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <p className="font-semibold">
          {firstName} {lastName}
        </p>

        <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
          {isDrawerOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#442825] p-5 transition-transform md:static md:min-h-screen md:w-60 md:translate-x-0 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-lg font-bold">Admin Panel</h2>

          <button
            onClick={closeDrawer}
            className="md:hidden"
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeDrawer}
              className={`rounded-lg px-4 py-3 text-sm transition hover:bg-[#444] ${
                location.pathname === link.path ? "bg-[#444]" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition hover:bg-[#d4a853] hover:text-black"
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
