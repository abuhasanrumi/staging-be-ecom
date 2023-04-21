"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/globals.scss";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/authSlice";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const signup = await dispatch(signUpUser({ name, email, password }));
    if (signup.payload.isOtpSend == true) {
      router.push("/verify");
    } else {
      alert("Please try again with correct email");
    }
  };

  return (
    <div className="signup-wrapper">
      <div>
        <h1 className="title">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
