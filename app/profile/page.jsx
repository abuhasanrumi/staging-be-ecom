"use client";

import React, { useState } from "react";
import profileStyle from "../../styles/profile.module.scss";
import jwt from "jsonwebtoken";
import { useDispatch, useSelector } from "react-redux";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { changePass } from "../redux/authSlice";

const page = () => {
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const dispatch = useDispatch();

  const { confirm } = Modal;

  const showConfirm = (e) => {
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        const handleSubmit = async (event) => {
          const result = await dispatch(
            changePass({
              currentPassword: currPass,
              newPassword: newPass,
              confirmPassword: confirmPass,
            })
          );
          console.log(result);
        };

        handleSubmit();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const token = useSelector((state) => state.auth.token);
  const decodedToken = jwt.decode(token);
  const { email, _id } = decodedToken;

  return (
    <div className="profile-wrapper">
      <div>
        <h1 className="title">Profile</h1>
        <h2>Email: {email}</h2>
        <br />
        <div className={profileStyle.changePassSection}>
          <h3>Change Password</h3>
          <label htmlFor="currPass" />
          <input
            type="text"
            id="currPass"
            name="current-password"
            placeholder="Current Password"
            value={currPass}
            onChange={(e) => {
              setCurrPass(e.target.value);
            }}
          />
          <label htmlFor="newPass" />
          <input
            type="password"
            id="newPass"
            name="new-password"
            placeholder="New Password"
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
            }}
          />
          <label htmlFor="confirmPass" />
          <input
            type="password"
            id="confirmPass"
            name="confirm-password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
          />
          <button className="btn" type="submit" onClick={showConfirm}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
