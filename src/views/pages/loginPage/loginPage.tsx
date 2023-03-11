import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useUserStore } from "../../../data/stores/useUserStore";

import "./loginPage.scss";

const LoginPage = () => {
  const [
    tokens,
    setAccesToken,
    setRefreshToken,
    setUserData,
    toogleLoggedIn,
    setUserFiles,
    setUserFolders,
  ]: any = useUserStore((state) => [
    state.tokens,
    state.setAccesToken,
    state.setRefreshToken,
    state.setUserData,
    state.toogleLoggedIn,
    state.setUserFiles,
    state.setUserFolders,
  ]);

  const signIn = async (credentialResponse: any) => {
    const response = await axios.post(
      "http://localhost:3000/auth/google/login",
      {
        token: credentialResponse.credential,
      }
    );
    const data = response.data;
    setAccesToken(data.access_token);
    setRefreshToken(data.refresh_token);
    console.log(tokens);

    const userResponse = await axios.get("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });
    const userData = userResponse.data;
    setUserData(userData);

    const foldersResponse = await axios.get(
      `http://localhost:3000/folders/user/${userData.id}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );
    const userFolders = foldersResponse.data;
    setUserFolders(userFolders);

    const filesResponse = await axios.get(
      `http://localhost:3000/file/user/${userData.id}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );
    const userFiles = filesResponse.data;
    setUserFiles(userFiles);

    toogleLoggedIn();
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
