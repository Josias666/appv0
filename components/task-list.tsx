"use client"
import { Check, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface TaskListProps {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  filter: "all" | "active" | "completed"
  setFilter: (filter: "all" | "active" | "completed") => void
}

const priorityConfig = {
  high: { label: "Alta", color: "bg-red-100 text-red-700" },
  medium: { label: "Media", color: "bg-amber-100 text-amber-700" },
  low: { label: "Baja", color: "bg-green-100 text-green-700" },
}

const statusConfig = {
  todo: { label: "Por Hacer", color: "bg-blue-100 text-blue-700" },
  "in-progress": { label: "En Progreso", color: "bg-amber-100 text-amber-700" },
  done: { label: "Completada", color: "bg-green-100 text-green-700" },
}

export default function TaskList({ tasks, setTasks, filter, setFilter }: TaskListProps) {
  const getFilteredTasks = () => {
    if (filter === "completed") return tasks.filter((t) => t.completed)
    if (filter === "active") return tasks.filter((t) => !t.completed)
    return tasks
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const filteredTasks = getFilteredTasks()

  return (
    <main className="flex-1 overflow-auto bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
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

        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-card rounded-lg border border-border p-4 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                    task.completed ? "bg-primary border-primary" : "border-border hover:border-primary"
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold text-foreground transition-all ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && <p className="text-sm text-muted-foreground mt-1">{task.description}</p>}

                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded ${
                        statusConfig[task.status as keyof typeof statusConfig].color
                      }`}
                    >
                      {statusConfig[task.status as keyof typeof statusConfig].label}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded ${priorityConfig[task.priority].color}`}>
                      {priorityConfig[task.priority].label}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDate(task.dueDate)}</span>
                    <span className="text-xs text-muted-foreground">{task.assignee}</span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:text-destructive"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
