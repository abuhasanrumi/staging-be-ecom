"use client";

import Link from "next/link";
import "../styles/globals.scss";
import navStyle from "../styles/navbar.module.scss";
import React from "react";
import { Providers } from "./redux/provider";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/store";

export default function RootLayout({ children }) {
  // const email = useSelector((state) => state.auth.email);
  const email = localStorage.getItem("email");
  // const dispatch = useDispatch();

  const handleClick = () => {
    // dispatch(logout());
    localStorage.clear();
    window.location.reload();
  };
  return (
    <html lang="en">
      <Provider store={store}>
        <body>
          <div className="container">
            {/* nav area */}
            <nav className={navStyle.navbar}>
              <div className={navStyle.logo}>Logo</div>
              <ul className={navStyle.navbarUl}>
                <Link href="/">
                  <li className="navbar-items">Home</li>
                </Link>
                {email ? (
                  <Link href="/profile">
                    <li className="navbar-items">Profile</li>
                  </Link>
                ) : (
                  <Link href="/sign-up">
                    <li className="navbar-items">Sign up</li>
                  </Link>
                )}
                {email ? (
                  <Link href="" onClick={handleClick}>
                    <li className="navbar-items">Logout</li>
                  </Link>
                ) : (
                  <Link href="/login">
                    <li className="navbar-items">Login</li>
                  </Link>
                )}
              </ul>
            </nav>

            {children}
          </div>
        </body>
      </Provider>
    </html>
  );
}
