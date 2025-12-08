"use client"

import { Search, Layout as Layout2, List, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  viewMode: "board" | "list"
  setViewMode: (mode: "board" | "list") => void
}

export default function Header({ viewMode, setViewMode }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-8 py-4">
      <div className="flex items-center justify-between gap-6">
        {/* Buscador */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tareas..."
            className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Controles de vista */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "board" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("board")}
            className={viewMode === "board" ? "bg-primary hover:bg-primary/90" : ""}
          >
            <Layout2 className="w-4 h-4 mr-1" />
            Tablero
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-primary hover:bg-primary/90" : ""}
          >
            <List className="w-4 h-4 mr-1" />
            Lista
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
