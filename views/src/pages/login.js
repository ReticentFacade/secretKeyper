import { Link } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import AuthService from "./Auth/auth.js";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log("Form submission data: " + JSON.stringify(data));

    try {
      const response = await AuthService.login(data.username, data.password);
      //   console.log("Form submission response: " + JSON.stringify(response));

      // Saving the username in localStorage to get the username for navbar:
      localStorage.setItem("user", response.data.username);
      //   console.log("Username saved to localStorage:", response.data.username);
      //
      if (response.status === 200) {
        console.log("Login successful!");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log("Error: " + error.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-2xl font-bold mb-10">Login</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <div className="flex items-center justify-center mb-4">
          <label className="mb-1 mr-2 flex-shrink-0 w-20">Username</label>
          <input
            className="m-2 p-2 border border-gray-300 rounded bg-transparent"
            type="text"
            placeholder="Username"
            required
            {...register("username", {
              required: true,
              maxLength: 20,
              //   pattern: /username/i,
            })}
          />
        </div>

        <div className="flex items-center justify-center mb-4">
          <label className="mb-1 mr-2 flex-shrink-0 w-20">Password</label>
          <input
            className="m-2 p-2 border border-gray-300 rounded bg-transparent"
            type="password"
            placeholder="Password"
            required
            {...register("password", {
              required: true,
              maxLength: 10,
              //   pattern: /password/i,
            })}
          />
        </div>

        <input
          type="submit"
          className="m-2 p-2 btn text-white cursor-pointer w-1/2 rounded"
          value="Login"
        />
      </form>

      <div className="mt-4">
        <span>Not registered?</span>
        <Link to="/register" className="italic underline ml-1">
          Register Here
        </Link>
      </div>
    </div>
  );
};

export default Login;
