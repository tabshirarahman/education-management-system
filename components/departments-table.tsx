"use client"

import { useEffect, useState } from "react"
import type { IDepartment } from "@/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit2, Trash2 } from "lucide-react"

interface DepartmentsTableProps {
  onEdit: (department: IDepartment) => void
  onDelete: (id: string) => void
  refreshTrigger: number
}

export function DepartmentsTable({ onEdit, onDelete, refreshTrigger }: DepartmentsTableProps) {
  const [departments, setDepartments] = useState<IDepartment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("/api/departments")
        const data = await res.json()
        setDepartments(data.data || [])
      } catch (error) {
        console.error("Failed to fetch departments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDepartments()
  }, [refreshTrigger])

  if (loading) return <div className="text-center py-8">Loading departments...</div>

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Code</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {departments.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No departments found. Create one to get started.
                </td>
              </tr>
            ) : (
              departments.map((department) => (
                <tr key={department._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{department.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{department.code}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{department.description || "-"}</td>
                  <td className="px-6 py-4 text-sm space-x-2 flex">
                    <Button size="sm" variant="outline" onClick={() => onEdit(department)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(department._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
