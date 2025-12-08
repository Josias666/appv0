"use client"

import { Plus, Edit2, Trash2 } from "lucide-react"
import TaskCard from "@/components/task-card"
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

interface TaskColumnProps {
  title: string
  tasks: Task[]
  status: string
  color: string
  borderColor: string
  onAddTask: (task: any) => void
  onEditTask: (task: Task) => void
  onDeleteTask: (id: string) => void
}

export default function TaskColumn({
  title,
  tasks,
  status,
  color,
  borderColor,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: TaskColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <span className="bg-secondary text-muted-foreground text-sm font-medium px-2.5 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      <div className={`rounded-xl border-2 p-4 space-y-3 min-h-96 bg-white/50 ${borderColor}`}>
        {tasks.map((task) => (
          <div key={task.id} className="group relative">
            <TaskCard task={task} />
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEditTask(task)}
                className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                title="Editar"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                title="Eliminar"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          className="w-full mt-4 border-dashed border-2 text-muted-foreground hover:text-foreground hover:bg-secondary bg-transparent"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar tarea
        </Button>
      </div>
    </div>
  )
}
