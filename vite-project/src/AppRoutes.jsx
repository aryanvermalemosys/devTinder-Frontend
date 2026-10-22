import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Feed from "./components/Feed";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/feed" element={<Feed />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
