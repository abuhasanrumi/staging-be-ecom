'use client'
import React from 'react'
import { useSelector } from 'react-redux';

const Home = () => {
  const token = useSelector(state => state.auth.token)
  return (
    <main>
      <div style={{ textAlign: "center", padding: "30vh 0", lineHeight: "5vh" }}>
        {
          token ? <h1>Please go to profile</h1> : <h1>You aren't logged in, please login</h1>
        }
      </div>
    </main>
  )
}

export default Home




