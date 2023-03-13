import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import LoginPage from "./views/pages/loginPage/loginPage";
import PrivateRoutes from "./views/utils/PrivateRoutes";
import LoggedRoutes from "./views/utils/LoggedRoutes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="897327783667-0bjjbancgdq8f6t06elcb2f39gn224v5.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
            <Route element={<App />} path="/" />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
