"use client"

import { useEffect, useState } from "react"
import type { IResult } from "@/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit2, Trash2, Eye } from "lucide-react"

interface ResultsTableProps {
  onEdit: (result: IResult) => void
  onDelete: (id: string) => void
  onView: (result: IResult) => void
  refreshTrigger: number
}

export function ResultsTable({ onEdit, onDelete, onView, refreshTrigger }: ResultsTableProps) {
  const [results, setResults] = useState<IResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch("/api/results")
        const data = await res.json()
        setResults(data.data || [])
      } catch (error) {
        console.error("Failed to fetch results:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [refreshTrigger])

  if (loading) return <div className="text-center py-8">Loading results...</div>

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Student Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Student ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Department</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">CGPA</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Subjects</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {results.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  No results found. Create one to get started.
                </td>
              </tr>
            ) : (
              results.map((result) => {
                const student = result.student as any
                const department = result.department as any

                return (
                  <tr key={result._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{student?.name || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{student?.studentId || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{department?.name || "N/A"}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">{result.totalCGPA.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{result.subjectMarks?.length || 0} subjects</td>
                    <td className="px-6 py-4 text-sm space-x-2 flex">
                      <Button size="sm" variant="outline" onClick={() => onView(result)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => onEdit(result)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => onDelete(result._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
