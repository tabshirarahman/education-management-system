"use client"

import { useState } from "react"
import { SubjectForm } from "@/components/forms/subject-form"
import { SubjectsTable } from "@/components/subjects-table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import type { ISubject } from "@/types"

export default function SubjectsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingSubject, setEditingSubject] = useState<ISubject | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingSubject(null)
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleEdit = (subject: ISubject) => {
    setEditingSubject(subject)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subject?")) return

    try {
      const response = await fetch(`/api/subjects/${id}`, { method: "DELETE" })
      if (response.ok) {
        setRefreshTrigger((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Failed to delete subject:", error)
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Subjects</h1>
          <p className="text-slate-600 mt-2">Manage course subjects</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Subject
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{editingSubject ? "Edit Subject" : "Add New Subject"}</h2>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingSubject(null)
              }}
              className="text-slate-500 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <SubjectForm onSuccess={handleFormSuccess} initialData={editingSubject} isEdit={!!editingSubject} />
        </Card>
      )}

      <SubjectsTable onEdit={handleEdit} onDelete={handleDelete} refreshTrigger={refreshTrigger} />
    </div>
  )
}
