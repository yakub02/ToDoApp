// src/components/AddTaskButton.jsx
import React, { useState, useEffect } from 'react'
import axios             from 'axios'
import * as Dialog       from '@radix-ui/react-dialog'
import { motion }        from 'framer-motion'
import TaskCard          from './TaskCard'
import TaskGallery       from './TaskGallery'

const API = axios.create({
  baseURL: 'http://localhost:3000', // your NestJS server
  headers: { 'Content-Type': 'application/json' }
})

export default function AddTaskButton() {
  const [formVisible, setFormVisible] = useState(false)
  const [tasks,       setTasks]       = useState([])
  const [editingIdx,  setEditingIdx]  = useState(null)

  // load on mount
  useEffect(() => {
    API.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(console.error)
  }, [])

  const handleAdd       = ()   => setFormVisible(true)
  const handleCancelAdd = ()   => setFormVisible(false)

  const handleCreate = data => {
    API.post('/tasks', data)
      .then(res => setTasks(prev => [...prev, res.data]))
      .catch(console.error)
  }

  const handleDelete = idx => {
    const task = tasks[idx]
    API.delete(`/tasks/${task.id}`)
      .then(() => setTasks(prev => prev.filter((_,i) => i!==idx)))
      .catch(console.error)
  }

  const handleEditClick = idx => setEditingIdx(idx)
  const handleCloseEdit = ()   => setEditingIdx(null)

  const handleSaveEdit = data => {
    const task = tasks[editingIdx]
    API.patch(`/tasks/${task.id}`, data)       // ← using PATCH now
      .then(res => {
        setTasks(prev =>
          prev.map((t,i) => i===editingIdx ? res.data : t)
        )
        setEditingIdx(null)
      })
      .catch(console.error)
  }

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
      <Dialog.Root
        open={editingIdx !== null}
        onOpenChange={open => !open && handleCloseEdit()}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2
                       bg-white rounded-2xl shadow-xl p-6"
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
