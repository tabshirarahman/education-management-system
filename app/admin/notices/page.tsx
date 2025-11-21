"use client"

import { useState } from "react"
import { NoticeForm } from "@/components/forms/notice-form"
import { NoticesTable } from "@/components/notices-table"
import { NoticeDetailModal } from "@/components/notice-detail-modal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import type { INotice } from "@/types"

export default function NoticesPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingNotice, setEditingNotice] = useState<INotice | null>(null)
  const [viewingNotice, setViewingNotice] = useState<INotice | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingNotice(null)
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleEdit = (notice: INotice) => {
    setEditingNotice(notice)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return

    try {
      const response = await fetch(`/api/notices/${id}`, { method: "DELETE" })
      if (response.ok) {
        setRefreshTrigger((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Failed to delete notice:", error)
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Notices</h1>
          <p className="text-slate-600 mt-2">Post and manage announcements</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Post Notice
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{editingNotice ? "Edit Notice" : "Post New Notice"}</h2>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingNotice(null)
              }}
              className="text-slate-500 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <NoticeForm onSuccess={handleFormSuccess} initialData={editingNotice} isEdit={!!editingNotice} />
        </Card>
      )}

      <NoticesTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={setViewingNotice}
        refreshTrigger={refreshTrigger}
      />

      <NoticeDetailModal notice={viewingNotice} onClose={() => setViewingNotice(null)} />
    </div>
  )
}
