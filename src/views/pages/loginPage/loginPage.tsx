import { GoogleLogin } from "@react-oauth/google";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../data/stores/useUserStore";
import "./loginPage.scss";

const LoginPage = () => {
  const history = useNavigate();
  const [login, isLoading]: any = useUserStore((state) => [
    state.login,
    state.isLoading,
  ]);

  const signIn = async (credentialResponse: any) => {
    localStorage.setItem("token", credentialResponse.credential);
    await login();
    history("/");
  };

  if (isLoading) {
    return (
      <>
        <Row>
          <Col md="12">
            <p className="text-center small text-center my-5">Loading...</p>
          </Col>
        </Row>
      </>
    );
  }
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
          width={"300"}
        />
      </div>
    </div>
  );
};

export default LoginPage;
