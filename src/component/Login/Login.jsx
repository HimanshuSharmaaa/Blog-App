import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authStoreLogin } from "../../store/authSlice";
import { Button, Input, Logo } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/Auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    console.log("UserData on Login Function :: ", data);
    setError("");
    try {
      // if session is true then , user is logged in.
      const session = await authService.login(data);
      if (session) {
        // extract the data of the logged in user.
        const userData = await authService.getCurrentUser();
        if (userData) {
          // logged in the user into store
          dispatch(authStoreLogin(userData));
          console.log('userData',userData);
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Component :: Login Component :: Login fun :: error", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <div>
        <div>
        <span><Logo width="80px" /></span>
        </div>
        <h2>Sign in to your account.</h2>
        <p>Don't have any account? <Link to="/signup">Sign Up</Link></p>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div>
            <Input
              label="Email : "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              label="Password : "
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit">Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 