import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import rout from "./Routing/Routs.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={rout} />
      <ToastContainer className="font-bitcount" data-theme="coffee"/>
    </AuthProvider>
  </StrictMode>
);
