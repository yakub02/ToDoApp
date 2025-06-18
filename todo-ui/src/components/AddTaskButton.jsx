// src/components/AddTaskButton.jsx
import React, { useState, useEffect } from 'react'
import * as Dialog      from '@radix-ui/react-dialog'
import { motion }       from 'framer-motion'
import TaskCard         from './TaskCard'
import TaskGallery      from './TaskGallery'

export default function AddTaskButton() {
  // 1) Initialize tasks from localStorage (lazy initializer)
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem('tasks')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const [formVisible, setFormVisible] = useState(false)
  const [editingIdx,  setEditingIdx]  = useState(null)

  // 2) Save to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    } catch {}
  }, [tasks])

  const handleAdd       = ()   => setFormVisible(true)
  const handleCancelAdd = ()   => setFormVisible(false)
  const handleCreate    = data => setTasks(prev => [...prev, data])
  const handleDelete    = idx  => setTasks(prev => prev.filter((_,i)=>i!==idx))
  const handleEditClick = idx  => setEditingIdx(idx)
  const handleCloseEdit = ()   => setEditingIdx(null)
  const handleSaveEdit  = data => {
    setTasks(prev => prev.map((t,i) => i===editingIdx ? data : t))
    setEditingIdx(null)
  }

  // offset to center the left panel on first render
  const centerOffset = 225

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 pt-5 px-4 overflow-visible">
      <div className="flex w-full max-w-screen-xl items-stretch gap-6">
        {/* LEFT PANEL */}
        <motion.div
          initial={{ x: centerOffset }}
          animate={{ x: tasks.length ? 0 : centerOffset }}
          transition={{ duration: 0.5 }}
          className="w-[450px] bg-white shadow-xl rounded-2xl flex-shrink-0 overflow-visible"
        >
          <div className="p-6 sm:p-8 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-center text-[#374151] mb-2">
              To Do List
            </h2>
            <p className="text-center text-[#374151] mb-4">
              Start with creating your first task.
            </p>
            <button
              onClick={handleAdd}
              className="bg-[#7e22ce] text-white w-full py-3 rounded-lg font-bold hover:bg-purple-800 transition mb-6"
            >
              ➕ Add Task
            </button>
            {formVisible && (
              <TaskCard onClose={handleCancelAdd} onSubmit={handleCreate} />
            )}
          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        {tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 bg-white shadow-xl rounded-2xl p-6 sm:p-8 overflow-visible"
          >
            <TaskGallery
              tasks={tasks}
              onEditClick={handleEditClick}
              onDelete={handleDelete}
            />
          </motion.div>
        )}
      </div>

      {/* Radix Dialog for Edit */}
      <Dialog.Root open={editingIdx !== null} onOpenChange={open => !open && handleCloseEdit()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6"
          >
            <Dialog.Title className="text-xl font-bold mb-4">Edit Task</Dialog.Title>
            {editingIdx !== null && (
              <TaskCard
                initialTask={tasks[editingIdx]}
                onClose={handleCloseEdit}
                onSubmit={handleSaveEdit}
              />
            )}
            <Dialog.Close className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              ✕
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
