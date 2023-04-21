"use client";

import Link from "next/link";
import "../styles/globals.scss";
import navStyle from "../styles/navbar.module.scss";
import React from "react";
import { Providers } from "./redux/provider";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  // const email = useSelector((state) => state.auth.email);
  const token = localStorage.getItem("token");
  // const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    // dispatch(logout());
    localStorage.clear();
    router.push("/");
  };
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="container">
            {/* nav area */}
            <nav className={navStyle.navbar}>
              <div className={navStyle.logo}>Logo</div>
              <ul className={navStyle.navbarUl}>
                <Link href="/">
                  <li className="navbar-items">Home</li>
                </Link>
                {token ? (
                  <Link href="/profile">
                    <li className="navbar-items">Profile</li>
                  </Link>
                ) : (
                  <Link href="/sign-up">
                    <li className="navbar-items">Sign up</li>
                  </Link>
                )}
                {token ? (
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
        </Providers>
      </body>
    </html>
  );
}
