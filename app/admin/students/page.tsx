"use client"

import { useState } from "react"
import { StudentForm } from "@/components/forms/student-form"
import { StudentsTable } from "@/components/students-table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import type { IStudent } from "@/types"

export default function StudentsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState<IStudent | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingStudent(null)
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleEdit = (student: IStudent) => {
    setEditingStudent(student)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return

    try {
      const response = await fetch(`/api/students/${id}`, { method: "DELETE" })
      if (response.ok) {
        setRefreshTrigger((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Failed to delete student:", error)
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Students</h1>
          <p className="text-slate-600 mt-2">Manage student records</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Student
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{editingStudent ? "Edit Student" : "Add New Student"}</h2>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingStudent(null)
              }}
              className="text-slate-500 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <StudentForm onSuccess={handleFormSuccess} initialData={editingStudent} isEdit={!!editingStudent} />
        </Card>
      )}

      <StudentsTable onEdit={handleEdit} onDelete={handleDelete} refreshTrigger={refreshTrigger} />
    </div>
  )
}
