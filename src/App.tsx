import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./views/pages/homePage/HomePage";

function App() {
  // const refreshTokens = async () => {
  //   const response = await axios.post("http://localhost:3000/auth/refresh", {
  //     headers: {
  //       Authorization: `Bearer ${tokens.refresh_token}`,
  //     },
  //   });
  //   const data = response.data;
  //   //setUserData()
  //   console.log(data);
  //   setAccesToken(data.access_token);
  //   setRefreshToken(data.refresh_token);
  // };

  return <HomePage />;
}

export default App;
