"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search, Plus } from "lucide-react"

interface TaskHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onToggleSidebar: () => void
  onCreateTask: () => void
}

export function TaskHeader({ searchQuery, onSearchChange, onToggleSidebar, onCreateTask }: TaskHeaderProps) {
  return (
    <header className="border-b border-border bg-card px-6 py-4 animate-fade-in">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar tareas..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" className="gap-2 shadow-sm hover:shadow-md transition-shadow" onClick={onCreateTask}>
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nueva Tarea</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
