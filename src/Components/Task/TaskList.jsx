import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCloseForm = () => {
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Tasks</h2>

      <div className="mb-6 w-full flex justify-center shadow-md">
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 focus:shadow-lg"
        />
      </div>

      <div className="mb-6">
        <TaskForm existingTask={editingTask} onClose={handleCloseForm} />
      </div>

      {filteredTasks.length > 0 ? (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={handleEdit} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No tasks match your search.</p>
      )}
    </div>
  );
};

export default TaskList;
