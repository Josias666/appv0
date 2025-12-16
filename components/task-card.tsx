"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { MoreVertical, Calendar, Flag, Star, Pencil, Trash2, Copy } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Task } from "@/components/task-manager"

interface TaskCardProps {
  task: Task
  viewMode: "grid" | "list"
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onToggleComplete: (taskId: string) => void
  onToggleStar: (taskId: string) => void
}

const priorityConfig = {
  low: { label: "Baja", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: "text-emerald-600" },
  medium: { label: "Media", color: "bg-amber-100 text-amber-700 border-amber-200", icon: "text-amber-600" },
  high: { label: "Alta", color: "bg-rose-100 text-rose-700 border-rose-200", icon: "text-rose-600" },
}

const projectColors = {
  work: "bg-blue-100 text-blue-700 border-blue-200",
  personal: "bg-green-100 text-green-700 border-green-200",
  learning: "bg-purple-100 text-purple-700 border-purple-200",
}

export function TaskCard({ task, viewMode, onEdit, onDelete, onToggleComplete, onToggleStar }: TaskCardProps) {
  const isCompleted = task.status === "completed"
  const priorityStyle = priorityConfig[task.priority]

  if (viewMode === "list") {
    return (
      <Card
        className={cn(
          "p-4 hover:shadow-md transition-all duration-200 border-border hover:border-primary/30 animate-slide-in bg-gradient-to-br from-card to-card/50 backdrop-blur-sm",
          isCompleted && "opacity-60",
        )}
      >
        <div className="flex items-center gap-4">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="mt-1 transition-all"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3
                className={cn(
                  "font-medium text-card-foreground transition-all",
                  isCompleted && "line-through text-muted-foreground",
                )}
              >
                {task.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1">{task.description}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Badge variant="outline" className={cn("text-xs font-medium", priorityStyle.color)}>
              {priorityStyle.label}
            </Badge>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {formatDate(task.dueDate)}
            </div>

            <div className="flex gap-1">
              {task.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {task.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{task.tags.length - 2}
                </Badge>
              )}
            </div>

            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onToggleStar(task.id)}>
              <Star className={cn("w-4 h-4 transition-all", task.starred && "fill-amber-400 text-amber-500")} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-destructive focus:text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        "p-5 hover:shadow-lg transition-all duration-200 border-border hover:border-primary/30 group animate-slide-in bg-gradient-to-br from-card to-card/50 backdrop-blur-sm",
        isCompleted && "opacity-60",
      )}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Checkbox
              checked={isCompleted}
              onCheckedChange={() => onToggleComplete(task.id)}
              className="mt-1 transition-all"
            />
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  "font-semibold text-card-foreground text-balance mb-1 transition-all",
                  isCompleted && "line-through text-muted-foreground",
                )}
              >
                {task.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{task.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onToggleStar(task.id)}
            >
              <Star className={cn("w-4 h-4 transition-all", task.starred && "fill-amber-400 text-amber-500")} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-destructive focus:text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {task.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {task.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{task.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <Badge variant="outline" className={cn("text-xs font-medium", priorityStyle.color)}>
            <Flag className={cn("w-3 h-3 mr-1", priorityStyle.icon)} />
            {priorityStyle.label}
          </Badge>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {formatDate(task.dueDate)}
          </div>
        </div>
      </div>
    </Card>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date.toDateString() === today.toDateString()) {
    return "Hoy"
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return "Mañana"
  }

  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
}
