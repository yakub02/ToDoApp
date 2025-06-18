import React from "react";

export const TaskCard = ({ onClose }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-6 mt-6 space-y-5">
      <h3 className="text-xl font-bold text-[#374151]">Create New Task</h3>

      {/* Task Name */}
      <div>
        <label className="block text-sm font-medium text-[#374151] mb-1">Task Name</label>
        <input
          type="text"
          placeholder="Enter task name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7e22ce] shadow-sm"
        />
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-medium text-[#374151] mb-1">Due Date</label>
        <input
          type="date"
          placeholder="dd.mm.yyyy"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7e22ce] shadow-sm"
        />
      </div>

      {/* Priority */}
      <div>
        <label className="block text-sm font-medium text-[#374151] mb-1">Priority</label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7e22ce] shadow-sm"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <button className="bg-[#22c55e] hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg transition">
          Submit
        </button>
        <button
          onClick={onClose}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
