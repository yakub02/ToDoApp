import React, { useState, useEffect } from 'react';

export default function TaskCard({ initialTask, onSubmit, onClose }) {
  // defaults only calculated once
  const randomName = `Task ${Math.floor(Math.random() * 1000)}`;
  const todayISO   = new Date().toISOString().slice(0,10);

  const [name, setName]         = useState(initialTask?.name     || randomName);
  const [date, setDate]         = useState(initialTask?.date     || todayISO);
  const [priority, setPriority] = useState(initialTask?.priority || 'Low');

  // refill when switching into edit mode
  useEffect(() => {
    if (initialTask) {
      setName(initialTask.name);
      setDate(initialTask.date);
      setPriority(initialTask.priority);
    }
  }, [initialTask]);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, date, priority });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
      <h3 className="text-xl font-bold text-[#374151]">
        {initialTask ? 'Edit Task' : 'Create New Task'}
      </h3>

      <div>
        <label className="block text-sm font-medium text-[#374151] mb-1">
          Task Name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#7e22ce] focus:ring-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#374151] mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#7e22ce] focus:ring-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#374151] mb-1">
          Priority
        </label>
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#7e22ce] focus:ring-2"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          {initialTask ? 'Save' : 'Submit'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
