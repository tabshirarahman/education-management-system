"use client"

import type React from "react"

import { AdminSidebar } from "./sidebar"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto mt-6">{children}</main>
    </div>
  )
}
