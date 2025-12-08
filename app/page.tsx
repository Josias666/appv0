"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import TaskBoard from "@/components/task-board"
import Header from "@/components/header"
import TaskModal from "@/components/task-modal"
import type { TaskData } from "@/components/task-modal"

export default function Home() {
  const [viewMode, setViewMode] = useState<"board" | "list">("board")
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<any>(null)

  const handleSaveTask = (task: TaskData) => {
    if (editingTask) {
      setEditingTask(null)
    }
    setIsModalOpen(false)
  }

  const handleNewTask = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const handleEditTask = (task: any) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header viewMode={viewMode} setViewMode={setViewMode} onNewTask={handleNewTask} />
        <TaskBoard viewMode={viewMode} filter={filter} setFilter={setFilter} onEditTask={handleEditTask} />
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTask(null)
        }}
        onSave={handleSaveTask}
        initialTask={editingTask}
      />
    </div>
  )
}
