import React, { useState } from 'react';
import { motion }        from 'framer-motion';
import TaskCard          from './TaskCard';
import TaskGallery       from './TaskGallery';

export default function AddTaskButton() {
  const [formVisible, setFormVisible] = useState(false);
  const [tasks,       setTasks]       = useState([]);

  const handleAdd    = () => setFormVisible(true);
  const handleCancel = () => setFormVisible(false);
  const handleSubmit = (data) => setTasks(prev => [...prev, data]);

  return (
    // Only a fixed-width container — no min-h-screen or centering here
    <div className="relative w-[900px]">
      {/* LEFT PANEL */}
      <motion.div
        initial={{ left: '50%', x: '-50%' }}
        animate={tasks.length > 0 ? { left: 0, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="absolute top-0 w-[450px] bg-white shadow-xl rounded-2xl overflow-visible"
      >
        <div className="p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-center text-[#374151]">
            To Do List
          </h2>
          <p className="text-center text-[#374151]">
            Start with creating your first task.
          </p>

          <button
            onClick={handleAdd}
            className="mt-4 bg-[#7e22ce] text-white w-full py-3 rounded-lg font-bold hover:bg-purple-800 transition"
          >
            ➕ Add Task
          </button>

          {formVisible && (
            <div className="mt-6 overflow-visible">
              <TaskCard onClose={handleCancel} onSubmit={handleSubmit} />
            </div>
          )}
        </div>
      </motion.div>

      {/* RIGHT PANEL */}
      {tasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-0 left-[470px] w-[450px] bg-white shadow-xl rounded-2xl p-6 sm:p-8 overflow-visible"
        >
          <TaskGallery tasks={tasks} />
        </motion.div>
      )}
    </div>
  );
}
