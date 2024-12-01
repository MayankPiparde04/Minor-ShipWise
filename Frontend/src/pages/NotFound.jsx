import React from 'react';

const NotFound = () => {
  return (
    <div className="flex z-20 items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Oops! The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="inline-block mt-4 text-lg text-blue-500 hover:text-blue-300 transition-colors"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
