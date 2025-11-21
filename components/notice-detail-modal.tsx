"use client"

import type { INotice } from "@/types"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import { format } from "date-fns"

interface NoticeDetailModalProps {
  notice: INotice | null
  onClose: () => void
}

export function NoticeDetailModal({ notice, onClose }: NoticeDetailModalProps) {
  if (!notice) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{notice.title}</h2>
            <p className="text-sm text-slate-600 mt-1">
              Posted on {format(new Date(notice.postedDate), "MMM dd, yyyy")}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              notice.status === "active" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"
            }`}
          >
            {notice.status}
          </span>
        </div>

        <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap">{notice.description}</div>

        <div className="mt-6 pt-4 border-t text-xs text-slate-500">
          Last updated: {format(new Date(notice.updatedAt), "MMM dd, yyyy HH:mm")}
        </div>
      </Card>
    </div>
  )
}
