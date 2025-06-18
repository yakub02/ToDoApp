import React from 'react';

export default function TaskGallery({ tasks }) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#374151] text-center mb-4">
        New Task Gallery
      </h3>
      <div className="flex flex-wrap gap-6">
        {tasks.map((task, idx) => (
          <div
            key={idx}
            className="w-[30%] min-w-[180px] bg-white border border-gray-200 rounded-xl shadow p-4 space-y-1"
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
    </div>
  );
}
