import React from 'react';

export const TaskGallery = ({ tasks }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-[#374151] text-center">
      New Task Gallery
    </h3>

    {tasks.map((task, idx) => (
      <div
        key={idx}
        className="bg-white border border-gray-200 rounded-xl shadow p-4 space-y-1"
      >
        <p>
          <span className="font-semibold text-[#374151]">Name:</span> {task.name}
        </p>
        <p>
          <span className="font-semibold text-[#374151]">Due Date:</span> {task.date}
        </p>
        <p>
          <span className="font-semibold text-[#374151]">Priority:</span> {task.priority}
        </p>
      </div>
    ))}
  </div>
);
