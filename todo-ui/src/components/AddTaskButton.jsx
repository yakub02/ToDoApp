import React, { useState } from 'react';
import { TaskCard } from './TaskCard';
import { TaskGallery } from './TaskGallery';
import { motion } from 'framer-motion';

export const AddTaskButton = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks]           = useState([]);       // holds all submitted tasks

  const handleClick      = () => setShowTaskForm(true);
  const handleCloseForm  = () => setShowTaskForm(false);

  // Append the new task to our array
  const handleSubmit = (taskData) => {
    setTasks(prev => [...prev, taskData]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 overflow-visible">
      <div className="flex w-full max-w-4xl px-4 space-x-8">
        {/* ── LEFT PANEL (form) ── */}
        <motion.div
          initial={{ x: 0 }}
          animate={tasks.length > 0 ? { x: -200 } : { x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-3/4 max-w-md bg-white shadow-xl rounded-2xl overflow-visible"
        >
          <div className="flex flex-col p-6 sm:p-8">
            <div className="text-2xl font-bold text-center text-[#374151] pb-4">
              To Do List
            </div>
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

            {showTaskForm && (
              <div className="pt-6 overflow-visible">
                <TaskCard
                  onClose={handleCloseForm}
                  onSubmit={handleSubmit}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* ── RIGHT PANEL (gallery) ── */}
        {tasks.length > 0 && (
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0,   opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 bg-white shadow-xl rounded-2xl p-6 sm:p-8 overflow-visible"
          >
            <TaskGallery tasks={tasks} />
          </motion.div>
        )}
      </div>
    </div>
  );
};
