import React, { useState } from 'react';
import { TaskCard } from './TaskCard';

export const AddTaskButton = () => {
  const [showTaskCard, setShowTaskCard] = useState(false);

  const handleClick = () => setShowTaskCard(true);
  const handleClose = () => setShowTaskCard(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-3/4 max-w-md bg-white shadow-xl rounded-2xl">
        <div className="flex flex-col p-6 sm:p-8">
          <div className="text-2xl font-bold text-center text-[#374151] pb-4">To Do List</div>
          <div className="text-base sm:text-lg text-center text-[#374151]">
            Start with creating your first task.
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={handleClick}
              className="bg-[#7e22ce] text-white w-full font-bold text-base p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform"
            >
              ➕ Add Task
            </button>
          </div>

          {showTaskCard && (
            <div className="pt-6">
              <TaskCard onClose={handleClose} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
