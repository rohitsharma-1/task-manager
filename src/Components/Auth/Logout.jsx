import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
   <div className='p-3'>
     <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
    >
      Logout
    </button>
   </div>
  );
};

export default Logout;
