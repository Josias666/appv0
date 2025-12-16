"use client"

import { useState } from "react"
import { TaskCard } from "@/components/task-card"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List, Sparkles } from "lucide-react"
import type { Task } from "@/components/task-manager"

interface TaskBoardProps {
  currentView: string
  searchQuery: string
  tasks: Task[]
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  onToggleComplete: (taskId: string) => void
  onToggleStar: (taskId: string) => void
}

export function TaskBoard({
  currentView,
  searchQuery,
  tasks,
  onEditTask,
  onDeleteTask,
  onToggleComplete,
  onToggleStar,
}: TaskBoardProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    if (!matchesSearch) return false

    switch (currentView) {
      case "completed":
        return task.status === "completed"
      case "today":
        return task.dueDate === new Date().toISOString().split("T")[0]
      case "upcoming":
        return task.status !== "completed"
      case "starred":
        return task.starred
      case "work":
      case "personal":
      case "learning":
        return task.project === currentView
      default:
        return true
    }
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-balance text-foreground">{getViewTitle(currentView)}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredTasks.length} {filteredTasks.length === 1 ? "tarea" : "tareas"}
          </p>
        </div>

        <div className="flex items-center gap-1 bg-secondary/50 backdrop-blur-sm rounded-lg p-1 border border-border/50">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="gap-2 transition-all"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="gap-2 transition-all"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Lista</span>
          </Button>
        </div>
      </div>

      <div
        className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-3"}
      >
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            viewMode={viewMode}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onToggleComplete={onToggleComplete}
            onToggleStar={onToggleStar}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center animate-scale-in">
          <div className="w-16 h-16 bg-muted/50 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 border border-border/50">
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No hay tareas</h3>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            No se encontraron tareas que coincidan con tu búsqueda o filtro
          </p>
        </div>
      )}
    </div>
  )
}

function getViewTitle(view: string): string {
  const titles: Record<string, string> = {
    all: "Todas las Tareas",
    today: "Tareas de Hoy",
    upcoming: "Próximas Tareas",
    completed: "Tareas Completadas",
    starred: "Tareas Favoritas",
    work: "Proyecto: Trabajo",
    personal: "Proyecto: Personal",
    learning: "Proyecto: Aprendizaje",
  }
  return titles[view] || "Tareas"
}
