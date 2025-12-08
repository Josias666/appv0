"use client"

import { Calendar, User } from "lucide-react"

interface TaskCardProps {
  task: {
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
}

const priorityConfig = {
  high: { label: "Alta", color: "bg-red-100 text-red-700" },
  medium: { label: "Media", color: "bg-amber-100 text-amber-700" },
  low: { label: "Baja", color: "bg-green-100 text-green-700" },
}

export default function TaskCard({ task }: TaskCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-lg p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
      <div className="space-y-3">
        {/* Título */}
        <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-2">
          {task.title}
        </h4>

        {/* Descripción */}
        {task.description && <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>}

        {/* Tags */}
        {task.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {task.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                {tag}
              </span>
            ))}
            {task.tags.length > 2 && (
              <span className="text-xs text-muted-foreground px-2 py-1">+{task.tags.length - 2}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-xs">
            <div className={`px-2 py-1 rounded font-medium ${priorityConfig[task.priority].color}`}>
              {priorityConfig[task.priority].label}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        </div>

        {/* Asignado a */}
        <div className="flex items-center gap-1.5 text-xs pt-2 border-t border-border">
          <User className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">{task.assignee}</span>
        </div>
      </div>
    </div>
  )
}
