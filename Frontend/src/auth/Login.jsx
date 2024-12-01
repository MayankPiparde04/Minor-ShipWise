import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Updated icons
import LoginImage from '../assets/Login-image.png';
import { StarsCanvas } from '../components/StarBackground';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      console.error(err.response?.data?.errors || "Login failed");
      alert(err.response?.data?.errors || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      <StarsCanvas />
      {/* Container */}
      <div className="relative border-2 border-gray-400 flex flex-col md:flex-col-reverse lg:flex-row items-center justify-center w-[90%] md:w-[70%] max-w-6xl bg-gray-900 bg-opacity-80 shadow-2xl p-6 md:p-10 gap-6">
        {/* Left Section: Form */}
        <div className=" md:w-2/3 lg:w-1/2 space-y-6 text-white w-[80%]">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="absolute left-3 top-10 text-gray-400">
                <FaEnvelope />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="mt-1 block w-full pl-10 pr-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {/* Password Input */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="absolute left-3 top-10 text-gray-400">
                <FaLock />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="mt-1 block w-full pl-10 pr-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Log In
            </button>
          </form>
          <p className="text-sm text-gray-300 text-center mt-4">
            Don't have an account?{' '}
            <a href="/auth/signup" className="text-indigo-400 hover:text-indigo-500 font-medium">
              Sign up
            </a>
          </p>
        </div>
        {/* Right Section: Image */}
        <div className="w-full lg:w-1/2 flex justify-center hidden lg:block md:block">
          <img
            src={LoginImage}
            alt="Login Illustration"
            className="rounded-lg shadow-xl hover:scale-105 transform transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
