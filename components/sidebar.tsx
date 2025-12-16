"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutGrid,
  Calendar,
  CheckCircle2,
  Clock,
  Star,
  Plus,
  Briefcase,
  GraduationCap,
  User,
  Sparkles,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  currentView: string
  onViewChange: (view: string) => void
}

const navigation = [
  { id: "all", name: "Todas las Tareas", icon: LayoutGrid },
  { id: "today", name: "Hoy", icon: Calendar },
  { id: "upcoming", name: "Próximas", icon: Clock },
  { id: "completed", name: "Completadas", icon: CheckCircle2 },
  { id: "starred", name: "Favoritas", icon: Star },
]

const projects = [
  { id: "work", name: "Trabajo", color: "bg-blue-500", icon: Briefcase },
  { id: "personal", name: "Personal", color: "bg-green-500", icon: User },
  { id: "learning", name: "Aprendizaje", color: "bg-purple-500", icon: GraduationCap },
]

export function Sidebar({ isOpen, currentView, onViewChange }: SidebarProps) {
  if (!isOpen) return null

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col animate-fade-in">
      <div className="p-6 border-b border-border bg-gradient-to-br from-sidebar to-sidebar/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-sidebar-foreground">TaskFlow</h1>
            <p className="text-xs text-muted-foreground">Gestiona tu día</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 text-sm font-medium transition-all duration-200",
                  currentView === item.id
                    ? "bg-secondary text-secondary-foreground shadow-sm"
                    : "hover:bg-secondary/50",
                )}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Button>
            )
          })}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Proyectos</h3>
            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-secondary/50 transition-colors">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <div className="space-y-1">
            {projects.map((project) => {
              const ProjectIcon = project.icon
              return (
                <Button
                  key={project.id}
                  variant={currentView === project.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 text-sm transition-all duration-200",
                    currentView === project.id
                      ? "bg-secondary text-secondary-foreground shadow-sm"
                      : "hover:bg-secondary/50",
                  )}
                  onClick={() => onViewChange(project.id)}
                >
                  <div className={cn("w-2 h-2 rounded-full", project.color)} />
                  <ProjectIcon className="w-4 h-4" />
                  {project.name}
                </Button>
              )
            })}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-gradient-to-br from-secondary to-secondary/50 backdrop-blur-sm rounded-xl p-4 space-y-2 border border-border/50">
          <p className="text-xs font-medium text-secondary-foreground">Mejora tu productividad</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Organiza mejor tus tareas con etiquetas y proyectos
          </p>
        </div>
      </div>
    </aside>
  )
}
