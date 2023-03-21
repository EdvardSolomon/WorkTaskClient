import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Page403 from "./views/pages/403Page/403Page";
import Page404 from "./views/pages/404Page/404Page";
import LoginPage from "./views/pages/loginPage/loginPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId="897327783667-0bjjbancgdq8f6t06elcb2f39gn224v5.apps.googleusercontent.com">
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/*" />
        <Route element={<Page403 />} path="/403" />
        <Route element={<Page404 />} path="/404" />
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
