import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/Slice/UserSlice";

axios.defaults.withCredentials = true;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          email,
          password,
        },
      );
      dispatch(
        addUser({
          id: res?.data?.data?.userId,
          firstName: res?.data?.data?.firstName,
          lastName: res?.data?.data?.lastName,
          imageURL: res?.data?.data?.imageURL,
        }),
      );
      navigate("/feed");
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-2">Login</h2>

          <form className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text font-semibold">Email</span>
              </label>

              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                className="input input-bordered w-full"
                required
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text font-semibold">Password</span>
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don't have an account? <Link to="/">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
