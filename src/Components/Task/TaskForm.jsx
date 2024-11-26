import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../Store/taskSlice';

const TaskForm = ({ existingTask, onClose }) => {
  const [title, setTitle] = useState(existingTask?.title || '');
  const [description, setDescription] = useState(existingTask?.description || '');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return alert('Both fields are required.');
    }

    const newTask = {
      id: existingTask ? existingTask.id : Date.now(),
      title,
      description,
    };

    if (existingTask) {
      dispatch(updateTask(newTask));
    } else {
      dispatch(addTask(newTask));
    }

    if (onClose) onClose();
    setTitle('');
    setDescription('');
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

      <h3 className="text-xl font-bold mb-4">
        {existingTask ? 'Edit Task' : 'Add New Task'}
      </h3>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      />
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {existingTask ? 'Update Task' : 'Add Task'}
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
    </>
  );
};

export default TaskForm;
