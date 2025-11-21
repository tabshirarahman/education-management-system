"use client"

import type React from "react"

interface StatsCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  description?: string
}

export function StatsCard({ title, value, icon, description }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          {description && <p className="text-xs text-slate-500 mt-2">{description}</p>}
        </div>
        <div className="text-blue-500">{icon}</div>
      </div>
    </div>
  )
}
