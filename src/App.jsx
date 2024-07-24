import { useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import Public from "./routes/Public";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import './App.css'
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {

  useEffect(() => {
    initFlowbite();
  });
  return (
    <>
      <BrowserRouter basename={"/admin"}>
        <Public />
        <ProtectedRoute />
      <ToastContainer/>
      </BrowserRouter>
    </>
  )
}

export default App
