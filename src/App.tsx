import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./views/pages/homePage/HomePage";
import { useEffect } from "react";
import { useUserStore } from "./data/stores/useUserStore";
import LoginPage from "./views/pages/loginPage/loginPage";

function App() {
  const[isAuth, checkAuth] = useUserStore((state: any) =>[state.isAuth, state.checkAuth]);

  useEffect(() => {
    if(localStorage.getItem("token")){
      checkAuth()
    }
  }, [])
return (
  <>
    {isAuth ? <HomePage /> : <LoginPage />}
  </>
  )
}

export default App;
