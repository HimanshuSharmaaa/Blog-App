import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/Auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./component/index";
import { Outlet } from "react-router-dom";

function App() {
  let [loading, setLoading] = useState(true);
  let dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="outerContainer">
      <div className="innerContainer">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;