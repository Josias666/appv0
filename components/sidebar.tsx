"use client"

import type React from "react"

import { useState } from "react"
import { CheckSquare2, ListTodo, Calendar, Archive, Settings, Plus, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  badge?: number
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [workspaces] = useState([
    { id: "personal", name: "Mi Workspace", icon: "👤" },
    { id: "work", name: "Trabajo", icon: "💼" },
    { id: "projects", name: "Proyectos", icon: "📊" },
  ])

  const navItems: NavItem[] = [
    { id: "inbox", label: "Bandeja de Entrada", icon: <CheckSquare2 className="w-5 h-5" />, badge: 5 },
    { id: "today", label: "Hoy", icon: <Calendar className="w-5 h-5" /> },
    { id: "tasks", label: "Mis Tareas", icon: <ListTodo className="w-5 h-5" />, badge: 12 },
    { id: "archive", label: "Archivo", icon: <Archive className="w-5 h-5" /> },
  ]

  return (
    <aside
      className={`flex flex-col bg-card border-r border-border transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"} h-screen`}
    >
      {/* Header del Sidebar */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-sm">
                TF
              </div>
              <h1 className="text-xl font-bold text-foreground">TaskFlow</h1>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 h-auto">
            <ChevronDown className={`w-5 h-5 transition-transform ${isCollapsed ? "rotate-90" : "-rotate-90"}`} />
          </Button>
        </div>
      </div>

      {/* Botón de nueva tarea */}
      <div className="p-4">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="w-4 h-4" />
          {!isCollapsed && "Nueva Tarea"}
        </Button>
      </div>

      {/* Navegación Principal */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors group"
          >
            {item.icon}
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-accent">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>

      {/* Sección de Workspaces */}
      {!isCollapsed && (
        <div className="px-3 py-4 border-t border-border">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-3">Workspaces</h3>
          <div className="space-y-2">
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <span className="text-lg">{ws.icon}</span>
                <span>{ws.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer del Sidebar */}
      <div className="p-4 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full justify-center">
          <Settings className={`w-5 h-5 ${!isCollapsed && "mr-2"}`} />
          {!isCollapsed && "Configuración"}
        </Button>
      </div>
    </aside>
  )
}
