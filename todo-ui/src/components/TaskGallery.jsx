import React from 'react';

export default function TaskGallery({ tasks, onEditClick, onDelete }) {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <h3 className="text-2xl font-bold text-[#374151] text-center mb-4">
        New Task Gallery
      </h3>
      <div className="grid grid-cols-2 gap-6 flex-1 overflow-auto">
        {tasks.map((task, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl shadow p-4 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <p><strong>Name:</strong> {task.name}</p>
              <p><strong>Due Date:</strong> {task.date}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => onEditClick(idx)}
                className="flex-1 bg-gray-200 hover:bg-blue-500 hover:text-white text-gray-700 text-sm font-medium py-2 rounded transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(idx)}
                className="flex-1 bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 text-sm font-medium py-2 rounded transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
