import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

import MyProvider from "./ContextApi/MyProvider";
import AppRoutes from "./AppRoutes"; // <-- Create this component

const App = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <HelmetProvider>
      <MyProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Router>
          <AppRoutes />
        </Router>
      </MyProvider>
    </HelmetProvider>
  );
};

export default App;
