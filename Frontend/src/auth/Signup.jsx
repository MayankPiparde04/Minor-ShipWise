import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaKey, FaUnlockAlt } from 'react-icons/fa'; // Updated icons
import SignUpImage from '../assets/Signup-image.png';
import axios from 'axios';
import { StarsCanvas } from '../components/StarBackground';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', { name, email, password });
      alert(response.data.message);
    } catch (error) {
      console.error(error.response?.data?.errors || "Registration failed");
      alert(error.response?.data?.errors || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      <StarsCanvas />
      {/* Container */}
      <div className="relative border-2 border-gray-400 flex flex-col md:flex-col-reverse lg:flex-row items-center justify-center w-[90%] md:w-[70%] max-w-6xl bg-gray-900 bg-opacity-80 shadow-2xl p-6 md:p-10 gap-6">
        {/* Left Section: Form */}
        <div className="md:w-2/3 lg:w-1/2 space-y-6 text-white w-[80%]">
          <h2 className="text-3xl md:text-4xl font-bold text-center ">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6 ">
            {/* Name Input */}
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="absolute left-3 top-10 text-gray-400">
                <FaUser />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="mt-1 block w-full pl-10 pr-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
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
                <FaKey />
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
            {/* Confirm Password Input */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="absolute left-3 top-10 text-gray-400">
                <FaUnlockAlt />
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                className="mt-1 block w-full pl-10 pr-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-gray-300 text-center mt-4">
            Already have an account?{' '}
            <a href="/auth/login" className="text-indigo-400 hover:text-indigo-500 font-medium">
              Log in
            </a>
          </p>
        </div>
        {/* Right Section: Image */}
        <div className="w-full lg:w-1/2 flex justify-center hidden lg:block md:block">
          <img
            src={SignUpImage}
            alt="Sign Up Illustration"
            className="rounded-lg shadow-xl hover:scale-105 transform transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
