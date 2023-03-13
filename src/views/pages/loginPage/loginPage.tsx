import { GoogleLogin } from "@react-oauth/google";
import { useUserStore } from "../../../data/stores/useUserStore";

import "./loginPage.scss";

const LoginPage = () => {
  const [ login, isAuth] : any = useUserStore((state) => [state.login, state.isAuth]);

  const signIn = (credentialResponse: any) => {
    localStorage.setItem('token', credentialResponse.credential);
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
