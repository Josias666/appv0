"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import TaskBoard from "@/components/task-board"
import Header from "@/components/header"

export default function Home() {
  const [viewMode, setViewMode] = useState<"board" | "list">("board")
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header viewMode={viewMode} setViewMode={setViewMode} />
        <TaskBoard viewMode={viewMode} filter={filter} setFilter={setFilter} />
      </div>
    </div>
  )
}
