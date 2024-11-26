import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!name.trim()) {
      setError('Name is required.');
      setLoading(false);
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      setName('');
      setEmail('');
      setPassword('');
      navigate('/login');
    } catch (err) {
      setError('Failed to create an account. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8"
      >
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className={`w-full text-white py-2 px-4 rounded ${
            loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <p className="text-gray-600 text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
