"use client"

import { useEffect, useState } from "react"
import type { INotice } from "@/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit2, Trash2, Eye } from "lucide-react"
import { format } from "date-fns"

interface NoticesTableProps {
  onEdit: (notice: INotice) => void
  onDelete: (id: string) => void
  onView: (notice: INotice) => void
  refreshTrigger: number
}

export function NoticesTable({ onEdit, onDelete, onView, refreshTrigger }: NoticesTableProps) {
  const [notices, setNotices] = useState<INotice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("/api/notices")
        const data = await res.json()
        setNotices(data.data || [])
      } catch (error) {
        console.error("Failed to fetch notices:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [refreshTrigger])

  if (loading) return <div className="text-center py-8">Loading notices...</div>

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Posted Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Last Updated</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {notices.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No notices found. Create one to get started.
                </td>
              </tr>
            ) : (
              notices.map((notice) => (
                <tr key={notice._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 max-w-xs truncate">{notice.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        notice.status === "active" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {notice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {format(new Date(notice.postedDate), "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {format(new Date(notice.updatedAt), "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2 flex">
                    <Button size="sm" variant="outline" onClick={() => onView(notice)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onEdit(notice)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(notice._id)}>
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
