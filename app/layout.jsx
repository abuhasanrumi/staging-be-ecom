import Link from "next/link";
import "../styles/globals.scss";
import navStyle from "../styles/navbar.module.scss";
import React from "react";
import { Providers } from "./redux/provider";

export default function RootLayout({ children }) {
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

                <Link href="/login">
                  <li className="navbar-items">Login</li>
                </Link>

                <Link href="/sign-up">
                  <li className="navbar-items">Signup</li>
                </Link>
              </ul>
            </nav>

            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
