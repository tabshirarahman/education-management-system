"use client"

import { useEffect, useState } from "react"
import type { IStudent } from "@/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit2, Trash2 } from "lucide-react"

interface StudentsTableProps {
  onEdit: (student: IStudent) => void
  onDelete: (id: string) => void
  refreshTrigger: number
}

export function StudentsTable({ onEdit, onDelete, refreshTrigger }: StudentsTableProps) {
  const [students, setStudents] = useState<IStudent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students")
        const data = await res.json()
        setStudents(data.data || [])
      } catch (error) {
        console.error("Failed to fetch students:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [refreshTrigger])

  if (loading) return <div className="text-center py-8">Loading students...</div>

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Student ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Department</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  No students found. Create one to get started.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-900">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{student.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{student.phone}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{student.studentId}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{(student.department as any)?.name || "N/A"}</td>
                  <td className="px-6 py-4 text-sm space-x-2 flex">
                    <Button size="sm" variant="outline" onClick={() => onEdit(student)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(student._id)}>
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
