"use client"

import { useState } from "react"
import TaskColumn from "@/components/task-column"
import TaskList from "@/components/task-list"

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: "high" | "medium" | "low"
  dueDate: string
  assignee: string
  tags: string[]
  completed: boolean
}

interface TaskBoardProps {
  viewMode: "board" | "list"
  filter: "all" | "active" | "completed"
  setFilter: (filter: "all" | "active" | "completed") => void
  onEditTask: (task: Task) => void
}

const mockTasks = [
  {
    id: "1",
    title: "Diseñar interfaz de usuario",
    description: "Crear mockups y wireframes del dashboard",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-15",
    assignee: "👤 Juan",
    tags: ["diseño", "ui"],
    completed: false,
  },
  {
    id: "2",
    title: "Configurar base de datos",
    description: "Establecer conexión y esquema de BD",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-12",
    assignee: "👤 María",
    tags: ["backend", "bd"],
    completed: false,
  },
  {
    id: "3",
    title: "Implementar autenticación",
    description: "OAuth2 y JWT tokens",
    status: "todo",
    priority: "medium",
    dueDate: "2024-01-20",
    assignee: "👤 Carlos",
    tags: ["seguridad", "backend"],
    completed: false,
  },
  {
    id: "4",
    title: "Testing de componentes",
    description: "Unit tests y E2E tests",
    status: "todo",
    priority: "medium",
    dueDate: "2024-01-18",
    assignee: "👤 Laura",
    tags: ["testing", "qa"],
    completed: false,
  },
  {
    id: "5",
    title: "Documentación del API",
    description: "Swagger y postman collections",
    status: "done",
    priority: "low",
    dueDate: "2024-01-10",
    assignee: "👤 Pedro",
    tags: ["documentación"],
    completed: true,
  },
  {
    id: "6",
    title: "Deploy a producción",
    description: "Configurar CI/CD y desplegar",
    status: "done",
    priority: "high",
    dueDate: "2024-01-05",
    assignee: "👤 Admin",
    tags: ["devops", "deploy"],
    completed: true,
  },
]

export default function TaskBoard({ viewMode, filter, setFilter, onEditTask }: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)

  const handleAddTask = (newTask: any) => {
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      assignee: newTask.assignee,
      tags: newTask.tags,
      completed: newTask.completed,
    }
    setTasks([...tasks, task])
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const todoTasks = tasks.filter((t) => t.status === "todo")
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress")
  const doneTasks = tasks.filter((t) => t.status === "done")

  const getFilteredTasks = (taskList: typeof tasks) => {
    if (filter === "completed") return taskList.filter((t) => t.completed)
    if (filter === "active") return taskList.filter((t) => !t.completed)
    return taskList
  }

  if (viewMode === "list") {
    return (
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        filter={filter}
        setFilter={setFilter}
        onEditTask={onEditTask}
        onDeleteTask={handleDeleteTask}
      />
    )
  }

  return (
    <main className="flex-1 overflow-auto bg-background p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">Mis Tareas</h2>
        <div className="flex gap-2">
          {(["all", "active", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {f === "all" ? "Todas" : f === "active" ? "Activas" : "Completadas"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <TaskColumn
          title="Por Hacer"
          tasks={getFilteredTasks(todoTasks)}
          status="todo"
          color="bg-blue-100"
          borderColor="border-blue-200"
          onAddTask={handleAddTask}
          onEditTask={onEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <TaskColumn
          title="En Progreso"
          tasks={getFilteredTasks(inProgressTasks)}
          status="in-progress"
          color="bg-amber-100"
          borderColor="border-amber-200"
          onAddTask={handleAddTask}
          onEditTask={onEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <TaskColumn
          title="Completadas"
          tasks={getFilteredTasks(doneTasks)}
          status="done"
          color="bg-green-100"
          borderColor="border-green-200"
          onAddTask={handleAddTask}
          onEditTask={onEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </main>
  )
}
