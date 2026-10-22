import React from "react";
import AppRoutes from "./AppRoutes";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
