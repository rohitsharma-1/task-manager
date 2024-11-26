import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../../firebase';

const loadTasksForUser = (userEmail) => {
  const tasks = localStorage.getItem(`tasks-${userEmail}`);
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksForUser = (userEmail, tasks) => {
  localStorage.setItem(`tasks-${userEmail}`, JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], status: 'idle', error: null },
  reducers: {
    loadTasks: (state) => {
      const user = auth.currentUser;
      if (user) {
        state.tasks = loadTasksForUser(user.email);
      } else {
        state.tasks = [];
      }
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      const user = auth.currentUser;
      if (user) saveTasksForUser(user.email, state.tasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      const user = auth.currentUser;
      if (user) saveTasksForUser(user.email, state.tasks);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        const user = auth.currentUser;
        if (user) saveTasksForUser(user.email, state.tasks);
      }
    },
    clearTasks: (state) => {
      state.tasks = [];
      const user = auth.currentUser;
      if (user) saveTasksForUser(user.email, state.tasks);
    },
  },
});

export const { loadTasks, addTask, deleteTask, updateTask, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
