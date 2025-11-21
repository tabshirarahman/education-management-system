"use client"

import { useState } from "react"
import { DepartmentForm } from "@/components/forms/department-form"
import { DepartmentsTable } from "@/components/departments-table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import type { IDepartment } from "@/types"

export default function DepartmentsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<IDepartment | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingDepartment(null)
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleEdit = (department: IDepartment) => {
    setEditingDepartment(department)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this department?")) return

    try {
      const response = await fetch(`/api/departments/${id}`, { method: "DELETE" })
      if (response.ok) {
        setRefreshTrigger((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Failed to delete department:", error)
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Departments</h1>
          <p className="text-slate-600 mt-2">Manage academic departments</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Department
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{editingDepartment ? "Edit Department" : "Add New Department"}</h2>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingDepartment(null)
              }}
              className="text-slate-500 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <DepartmentForm onSuccess={handleFormSuccess} initialData={editingDepartment} isEdit={!!editingDepartment} />
        </Card>
      )}

      <DepartmentsTable onEdit={handleEdit} onDelete={handleDelete} refreshTrigger={refreshTrigger} />
    </div>
  )
}
