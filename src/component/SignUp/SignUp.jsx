import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/Auth";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "../index";
import { login as authStoreLogin } from "../../store/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const CreateAccount = async (data) => {
    setError("");
    try {
      const createUser = await authService.createAccount(data);
      if (createUser) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authStoreLogin(userData));
          console.log(userData);
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div>
        <div>
          <span>
            <Logo width="80px" />
          </span>
        </div>
        <h2>Sign in to your account.</h2>
        <p>
          Already have any account? <Link to="/signin">Sign In</Link>
        </p>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(CreateAccount)}>
          <div>
            <Input
              label="Full Name: "
              placeholder="Enter your full name here.."
              {...register("name", {
                required: "true",
              })}
            />
            <Input
              label="Email : "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              label="password"
              placeholder="enter your password here.."
              type="password"
              {...register("password", {
                required: "true",
              })}
            />
            <Button type="submit">Create Account</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;