"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Plus } from "lucide-react"

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (task: TaskData) => void
  initialTask?: {
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

export interface TaskData {
  id?: string
  title: string
  description: string
  status: string
  priority: "high" | "medium" | "low"
  dueDate: string
  assignee: string
  tags: string[]
  completed: boolean
}

export default function TaskModal({ isOpen, onClose, onSave, initialTask }: TaskModalProps) {
  const [formData, setFormData] = useState<TaskData>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: new Date().toISOString().split("T")[0],
    assignee: "",
    tags: [],
    completed: false,
  })

  const [tagInput, setTagInput] = useState("")

  useEffect(() => {
    if (initialTask) {
      setFormData(initialTask)
      setTagInput("")
    } else {
      setFormData({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: new Date().toISOString().split("T")[0],
        assignee: "",
        tags: [],
        completed: false,
      })
    }
  }, [initialTask, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onSave(formData)
      setFormData({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: new Date().toISOString().split("T")[0],
        assignee: "",
        tags: [],
        completed: false,
      })
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      })
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-foreground">{initialTask ? "Editar Tarea" : "Nueva Tarea"}</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Título de la tarea"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detalles de la tarea"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={3}
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Estado</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="todo">Por Hacer</option>
              <option value="in-progress">En Progreso</option>
              <option value="done">Completada</option>
            </select>
          </div>

          {/* Prioridad */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Prioridad</label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value as "high" | "medium" | "low",
                })
              }
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          {/* Fecha de vencimiento */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Fecha de Vencimiento</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Asignado a */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Asignado a</label>
            <input
              type="text"
              value={formData.assignee}
              onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
              placeholder="Nombre del asignado"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Etiquetas</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                placeholder="Agregar etiqueta"
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {formData.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 bg-accent/20 text-accent px-2.5 py-1 rounded-full text-xs"
                  >
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-accent/80">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Completada */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.completed}
              onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium text-foreground">Marcar como completada</label>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-secondary transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              {initialTask ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
