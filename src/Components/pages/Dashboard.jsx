import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { loadTasks } from '../Store/taskSlice';
import TaskList from '../Task/TaskList';
import Logout from '../Auth/Logout';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const apiKey = import.meta.env.VITE_API_KEY;
console.log(apiKey); 


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        dispatch(loadTasks());
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (<>
  <Logout/>
    <div className="max-w-4xl mx-auto mt-8">
      <TaskList />
    </div>
    </>
  );
};

export default Dashboard;
