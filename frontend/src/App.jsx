import React, { useState } from "react"
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSelector } from "react-redux"
import ThemeToggle from "./components/ThemeToggle"
import { current } from "@reduxjs/toolkit"

const App = () => {
  const theme = useSelector((state) => state.user?.theme || "light");
  const currentUser = useSelector((state)=> state.user.currentUser)
  return (
    <BrowserRouter>
        <div className={`${theme === "dark" ? "dark bg-gray-900 text-slate-900" : "bg-white text-black"} min-h-screen transition-all`}>
          {/* <ThemeToggle /> */}
        
      <Routes>
        <Route path="/" element={!currentUser ? <Navigate to="/login" /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer position="top-center" />
      </div>
    </BrowserRouter>
  )
}

export default App
