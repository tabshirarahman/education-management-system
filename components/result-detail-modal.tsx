"use client"

import type { IResult } from "@/types"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"


interface ResultDetailModalProps {
  result: IResult | null
  onClose: () => void
}

export function ResultDetailModal({ result, onClose }: ResultDetailModalProps) {
  if (!result) return null

  const student = result.student as any
  const department = result.department as any

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Result Details</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="text-sm text-slate-600">Student Name</p>
              <p className="text-lg font-semibold text-slate-900">{student?.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Student ID</p>
              <p className="text-lg font-semibold text-slate-900">{student?.studentId}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Department</p>
              <p className="text-lg font-semibold text-slate-900">{department?.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Total CGPA</p>
              <p className="text-lg font-semibold text-blue-600">{result.totalCGPA.toFixed(2)}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Subject-wise Marks</h3>
            <div className="space-y-2">
              {result.subjectMarks?.map((sm, index) => {
                const subject = sm.subject as any
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {subject?.subjectName}
                      </p>
                      <p className="text-sm text-slate-600">
                        {subject?.subjectCode}
                      </p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-sm text-slate-600">Marks</p>
                        <p className="text-lg font-semibold text-slate-900">
                          {sm.marks}/100
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-slate-600">Grade</p>
                        <p className="text-lg font-semibold text-blue-600">
                          {sm.grade}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
