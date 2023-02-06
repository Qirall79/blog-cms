import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import url from "../apiLink";
import fetchUser from "../helper/fetchUser";
import Navbar from "./Navbar";

const Login = () => {
  const [response, setResponse] = useState({});
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Get current user if exists
  const [user, setUser] = useState({
    isAuthenticated: false,
    userDetails: null,
  });

  const saveToken = (data) => {
    if (!data.token) {
      return;
    }
    localStorage.setItem("token", "Bearer " + data.token);
    return;
  };

  // Send data to server
  const sendData = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios
      .post(url + "/login", formData, config)
      .then((response) => {
        setResponse(response.data);
        setUser({
          isAuthenticated: true,
        });
        saveToken(response.data);
      })
      .catch((err) => {
        console.log(err);
        setResponse(err.response.data);
      });
  };

  // Update formData variable each time input is changed
  const updateFormData = (e) => {
    const target = e.target.getAttribute("name");
    const value = e.target.value;

    if (target === "email") {
      setFormData({ ...formData, email: value });
    }
    if (target === "password") {
      setFormData({ ...formData, password: value });
    }
    return;
  };

  useEffect(() => {
    fetchUser(user, setUser);
  }, []);

  // No need to login if already logged in
  if (user.isAuthenticated) {
    return (
      <div>
        <Navbar />
        <div className="w-full px-48 py-24">
          {/* if login was successful redirect to home page */}
          {response.success ? <Navigate replace to="/" /> : ""}
          <div>
            You're already authenticated as
            {user.userDetails ? " " + user.userDetails.first_name : ""}
          </div>
        </div>
      </div>
    );
  }

  // Display login form
  return (
    <div>
      <Navbar />
      <div className="w-full px-20 md:px-28 lg:px-48 py-24">
        <form method="post" className="w-full flex-col gap-20">
          <div className="form-group mb-5 w-1/2 min-w-[400px] flex flex-col gap-3 justify-between">
            <label htmlFor="email" className="mr-10 font-medium ">
              Email:{" "}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={updateFormData}
              className="border  px-2 py-1 text-sm w-3/4"
            />
          </div>
          <div className="form-group mb-5 w-1/2 min-w-[400px] flex flex-col gap-3 justify-between">
            <label htmlFor="password" className="mr-10 font-medium ">
              Password:{" "}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={updateFormData}
              className="border  px-2 py-1 text-sm w-3/4"
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="px-8 py-2 bg-emerald-500 rounded-md cursor-pointer font-medium"
            onClick={sendData}
          />
        </form>
        <div className="mt-5 text-red-500">
          {!response.success && response.message ? (
            <p>{response.message}</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
