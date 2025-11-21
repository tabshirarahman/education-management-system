"use client"

import { useState } from "react"
import { ResultForm } from "@/components/forms/result-form"
import { ResultsTable } from "@/components/results-table"
import { ResultDetailModal } from "@/components/result-detail-modal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import type { IResult } from "@/types"

export default function ResultsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingResult, setEditingResult] = useState<IResult | null>(null)
  const [viewingResult, setViewingResult] = useState<IResult | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingResult(null)
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleEdit = (result: IResult) => {
    setEditingResult(result)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this result?")) return

    try {
      const response = await fetch(`/api/results/${id}`, { method: "DELETE" })
      if (response.ok) {
        setRefreshTrigger((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Failed to delete result:", error)
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Results</h1>
          <p className="text-slate-600 mt-2">Manage student results and grades</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Result
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{editingResult ? "Edit Result" : "Create New Result"}</h2>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingResult(null)
              }}
              className="text-slate-500 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <ResultForm onSuccess={handleFormSuccess} initialData={editingResult} isEdit={!!editingResult} />
        </Card>
      )}

      <ResultsTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={setViewingResult}
        refreshTrigger={refreshTrigger}
      />

      <ResultDetailModal result={viewingResult} onClose={() => setViewingResult(null)} />
    </div>
  )
}
