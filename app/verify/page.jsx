"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/globals.scss";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../redux/authSlice";

const page = () => {
  const [otp, setOtp] = useState("");
  // const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const storeEmail = useSelector((state) => state.auth.email);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const verify = await dispatch(verifyEmail({ otp, email: storeEmail }));
    if (verify.payload.success) {
      router.push("/home");
    } else {
      alert("Authentication failed");
    }
  };

  return (
    <div className="verify-wrapper">
      <div>
        <h1 className="title">Verify</h1>
        <form onSubmit={handleSubmit}>
          {/* <input
            type="text"
            name="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          /> */}
          <input
            type="text"
            name="otp"
            value={otp}
            placeholder="Enter otp"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          <button type="submit" className="btn">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
