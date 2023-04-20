"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/globals.scss";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const login = await dispatch(loginUser({ email, password }));
    if (login.payload.token) {
      router.push("/home");
    } else {
      alert("Authentication failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div>
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
