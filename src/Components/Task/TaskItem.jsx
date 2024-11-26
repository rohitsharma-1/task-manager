
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../Store/taskSlice';

const Taskitem = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div className="bg-gray-100 shadow-md rounded p-4 mb-4">
      <h4 className="text-lg font-bold">{task.title}</h4>
      <p className="text-gray-700">{task.description}</p>
      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Taskitem;
