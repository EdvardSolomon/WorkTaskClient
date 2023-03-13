import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../data/stores/useUserStore";

import "./loginPage.scss";

const LoginPage = () => {
  const history = useNavigate();
  const [login, checkAuth]: any = useUserStore((state) => [
    state.login,
    state.isAuth,
    state.checkAuth,
  ]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history("/");
    }
  }, []);

  const signIn = (credentialResponse: any) => {
    localStorage.setItem("token", credentialResponse.credential);
    login();
  };

  return (
    <div className="loginPage">
      <div className="loginPage__title">
        <h3 className="loginPage__header">VrealSoft test task</h3>
      </div>
      <h4 className="loginPage__subHeader">Sign in/Sign up</h4>
      <div className="loginPage__googleButton">
        <GoogleLogin
          onSuccess={(credentialResponse) => signIn(credentialResponse)}
          onError={() => {
            console.log("Login Failed");
          }}
          width={"350"}
        />
      </div>
    </div>
  );
};

export default LoginPage;
