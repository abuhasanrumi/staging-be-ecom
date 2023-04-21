'use client'

import HomePage from './profile/page.jsx';
import navStyle from "../styles/navbar.module.scss";
import Link from 'next/link.js';
import { useSelector } from 'react-redux';


export default function Home() {
  const email = useSelector(state => state.auth.email)
  return (
    <main>
      <div style={{ textAlign: "center", padding: "30vh 0", lineHeight: "5vh" }}>
        {
          email ? <h1>Please go to profile</h1> : <h1>You aren't logged in, please login</h1>
        }
      </div>
    </main>
  )
}