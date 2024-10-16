import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [values,setValues] = useState({username:"",email:"",password:"",address:""});
  const change=(e)=>{
    const {name,value}=e.target;
    setValues({...values,[name]:value});
  }
  const navigate = useNavigate();
  const submit=async(e)=>{
    e.preventDefault();
    try{
      if(values.username === '' ||
        values.email === '' ||
        values.password === '' ||
        values.address === '' 
      ){
        alert('All fields are required');
      }else{
        try{
          const response = await axios.post("http://localhost:1000/api/v1/signup",values);
          alert(response.data.message);
          navigate('/profile');
        }catch(error){
          console.log(error.request.response);
        }
      }
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white px-4">
      <form className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-md">
        <h1 className="text-3xl font-bold  mb-4">Sign Up</h1>
        
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full p-2 border border-gray-600 rounded-md bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={values.username}
            onChange={change}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
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
          <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
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

        <div className="mb-4">
          <label htmlFor="address" className="block mb-1 text-sm font-medium">Address</label>
          <textarea
            id="address"
            rows={3}
            className="w-full p-2 border border-gray-600 rounded-md bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Enter your address here..."
            name="address"
            required
            value={values.address}
            onChange={change}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-md font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-200"
          onClick={submit}
        >
          Sign Up
        </button>

        <h1 className="my-3 text-center text-sm">Or</h1>
        <p className="text-center text-sm">
          Already Have An Account?{' '}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
