import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const disptach = useDispatch();
  

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    if (values.email === '' || values.password === '') {
      setErrorMessage('All fields are required');
      return; // Exit early if fields are empty
    }

    try {
      const response = await axios.post("http://localhost:1000/api/v1/login", values);

      if (response.status === 200) {
        alert('Login successful');
        disptach(authActions.login())
        disptach(authActions.changeRole(response.data.role));
        localStorage.setItem('id',response.data.id);
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('role',response.data.role);

        navigate('/profile'); // Redirect after successful login
      }
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed. Please try again.");
      } else {
        setErrorMessage("Network error. Please try again later.");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white px-4">
      <form className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-md" onSubmit={submit}>
        <h1 className="text-3xl font-bold mb-6 mt-2">Login</h1>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-600 rounded-md bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={values.email}
            onChange={change}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-600 rounded-md bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={values.password}
            onChange={change}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-200"
        >
          Login
        </button>

        {/* Or divider */}
        <h1 className="my-3 text-md text-center">Or</h1>

        {/* Signup link */}
        <p className="text-center text-sm">
          Don't Have An Account?{' '}
          <NavLink to="/signup" className="text-blue-500 hover:underline">
            Signup
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
