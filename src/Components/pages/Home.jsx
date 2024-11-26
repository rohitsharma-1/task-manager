import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Task Manager</h1>
      <p className="text-lg text-gray-600 mb-8">Manage your tasks efficiently and effortlessly.</p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;
