import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";
import url from "../apiLink";

const Signup = () => {
  const [response, setResponse] = useState({
    success: true,
    user: { first_name: "", last_name: "", email: "" },
    errors: [],
  });
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const sendData = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    axios
      .post(url + "/signup", formData)
      .then((response) => {
        console.log(response.data);
        setResponse(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        setResponse(err.response.data);
      });
  };

  const updateFormData = (e) => {
    const target = e.target.getAttribute("name");
    const value = e.target.value;

    setFormData({ ...formData, [target]: value });
    setResponse({ ...response, user: { ...response.user, [target]: value } });
  };

  return (
    <div>
      {response.success && response.user._id ? <Navigate to="/login" /> : ""}
      <Navbar />
      <div className="w-full px-20 md:px-28 lg:px-48 py-24">
        <form method="post" className="w-full flex-col gap-20">
          <div className="form-group mb-5 w-1/2 min-w-[400px] flex flex-col gap-3 justify-between">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={
                response.success && response.user._id
                  ? ""
                  : response.user.first_name
              }
              onChange={updateFormData}
              className="border h-[35px] px-2 py-1 text-sm w-3/4"
            />
          </div>
          <div className="form-group mb-5 w-1/2 min-w-[400px] flex flex-col gap-3 justify-between">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={
                response.success && response.user._id
                  ? ""
                  : response.user.last_name
              }
              onChange={updateFormData}
              className="border h-[35px] px-2 py-1 text-sm w-3/4"
            />
          </div>
          <div className="form-group mb-5 w-1/2 min-w-[400px] flex flex-col gap-3 justify-between">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={
                response.success && response.user._id ? "" : response.user.email
              }
              onChange={updateFormData}
              className="border h-[35px] px-2 py-1 text-sm w-3/4"
            />
          </div>
          <div className="form-group mb-5 w-1/2 min-w-[400px] flex flex-col gap-3 justify-between">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={updateFormData}
              className="border h-[35px] px-2 py-1 text-sm w-3/4"
            />
          </div>
          <div className="form-group mb-5 w-1/2 min-w-[400px] flex flex-col gap-3 justify-between">
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              onChange={updateFormData}
              className="border h-[35px] px-2 py-1 text-sm w-3/4"
            />
          </div>
          <input
            type="submit"
            value="Sign up"
            onClick={sendData}
            className="px-8 py-2 bg-emerald-500 rounded-md cursor-pointer font-medium"
          />
        </form>
        <div className="text-red-500">
          {!response.errors.length
            ? ""
            : response.errors.map((err) => {
                return <p>- {err.msg}</p>;
              })}
        </div>
      </div>
    </div>
  );
};

export default Signup;
