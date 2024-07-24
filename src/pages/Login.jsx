// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getItem, setItem } from '../services/localStorageService';
import { post } from '../services/ApiService';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    //  Login api
    onSubmit: async (values) => {
      try {
        const response = await post("/admin-login", values);
        setItem('token', response.token)
        setItem("user", response);
        await delay(700)
        navigate("/dashboard");
        toast.success("Logined Successfully...!");
      } catch (error) {
        console.log(error);
      }
    },
  });
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  return (
    <>
      <section className="bg-[#0A1F44] relative flex min-h-screen flex-col items-center pt-16 sm:justify-center">
        <div className="login-container">
          <div className="login-form" id="loginForm">
            <h1>Sign In</h1>
            <form className="mt-16" onSubmit={formik.handleSubmit}>
              {/* {formik.errors.submit && <div className="text-xs text-red-600">{formik.errors.submit}</div>} */}
              <div className="container-login mb-8">
                <input
                  type="text"
                  name="email"
                  className="input-login w-full"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="label">Email</label>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-xs text-red-600">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="container-login mb-8">
                <input
                  type="password"
                  name="password"
                  className="input-login w-full"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="label">Password</label>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-xs text-red-600">{formik.errors.password}</div>
                ) : null}
              </div>
              <button type="submit" className="login-button" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              <Link to="#" className="text-center">Forgot Your Password?</Link>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
