"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TaskBoard } from "@/components/task-board"
import { TaskHeader } from "@/components/task-header"
import { TaskDialog } from "@/components/task-dialog"

export interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "todo" | "in-progress" | "completed"
  dueDate: string
  tags: string[]
  project: string
  starred?: boolean
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Diseñar nuevo dashboard",
    description: "Crear mockups y prototipos para el nuevo panel de administración",
    priority: "high",
    status: "in-progress",
    dueDate: "2025-12-20",
    tags: ["diseño", "ui/ux"],
    project: "work",
    starred: true,
  },
  {
    id: "2",
    title: "Revisar documentación del API",
    description: "Actualizar la documentación con los nuevos endpoints",
    priority: "medium",
    status: "todo",
    dueDate: "2025-12-18",
    tags: ["desarrollo", "api"],
    project: "work",
  },
  {
    id: "3",
    title: "Implementar autenticación",
    description: "Configurar OAuth y JWT para el sistema de usuarios",
    priority: "high",
    status: "in-progress",
    dueDate: "2025-12-22",
    tags: ["desarrollo", "seguridad"],
    project: "work",
  },
  {
    id: "4",
    title: "Preparar presentación Q4",
    description: "Slides con métricas y resultados del último trimestre",
    priority: "medium",
    status: "todo",
    dueDate: "2025-12-25",
    tags: ["reuniones", "reportes"],
    project: "work",
  },
  {
    id: "5",
    title: "Estudiar Next.js 16",
    description: "Revisar las nuevas características y mejoras de rendimiento",
    priority: "low",
    status: "todo",
    dueDate: "2025-12-30",
    tags: ["aprendizaje", "frontend"],
    project: "learning",
  },
  {
    id: "6",
    title: "Configurar CI/CD pipeline",
    description: "Automatizar despliegues con GitHub Actions",
    priority: "high",
    status: "completed",
    dueDate: "2025-12-15",
    tags: ["devops", "automatización"],
    project: "work",
  },
]

export function TaskManager() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentView, setCurrentView] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const handleCreateTask = () => {
    setEditingTask(null)
    setDialogOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setDialogOpen(true)
  }

  const handleSaveTask = (taskData: Omit<Task, "id">) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...taskData, id: editingTask.id } : t)))
    } else {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
      }
      setTasks([newTask, ...tasks])
    }
    setDialogOpen(false)
    setEditingTask(null)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId))
  }

  const handleToggleComplete = (taskId: string) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, status: t.status === "completed" ? "todo" : "completed" } : t)),
    )
  }

  const handleToggleStar = (taskId: string) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, starred: !t.starred } : t)))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} currentView={currentView} onViewChange={setCurrentView} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TaskHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onCreateTask={handleCreateTask}
        />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <TaskBoard
            currentView={currentView}
            searchQuery={searchQuery}
            tasks={tasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
            onToggleStar={handleToggleStar}
          />
        </main>
      </div>

      <TaskDialog open={dialogOpen} onOpenChange={setDialogOpen} task={editingTask} onSave={handleSaveTask} />
    </div>
  )
}
