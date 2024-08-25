import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/Auth";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  let dispatch = useDispatch();

  function handleLogoutBtn() {
    authService.logout().then(() => {
      dispatch(logout());
    }).catch((err) => {
      console.log("LogoutBtn :: handleLogoutBtn :: error", err);
    });
  }

  return <button onClick={handleLogoutBtn}>Logout</button>;
};

export default LogoutBtn;