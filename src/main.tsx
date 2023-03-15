import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import LoginPage from "./views/pages/loginPage/loginPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId="897327783667-0bjjbancgdq8f6t06elcb2f39gn224v5.apps.googleusercontent.com">
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/*" />
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
