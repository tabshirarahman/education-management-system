"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createSubjectSchema, type CreateSubjectInput } from "@/lib/validations/subject"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { IDepartment } from "@/types"

interface SubjectFormProps {
  onSuccess: () => void
  initialData?: any
  isEdit?: boolean
}

export function SubjectForm({ onSuccess, initialData, isEdit }: SubjectFormProps) {
  const [departments, setDepartments] = useState<IDepartment[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSubjectInput>({
    resolver: zodResolver(createSubjectSchema),
    defaultValues: initialData,
  })

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("/api/departments")
        const data = await res.json()
        setDepartments(data.data || [])
      } catch (error) {
        console.error("Failed to fetch departments:", error)
      }
    }

    fetchDepartments()
  }, [])

  const onSubmit = async (data: CreateSubjectInput) => {
    setIsLoading(true)
    try {
      const url = isEdit ? `/api/subjects/${initialData._id}` : "/api/subjects"
      const method = isEdit ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        onSuccess()
      } else {
        console.error("Failed to save subject")
      }
    } catch (error) {
      console.error("Error saving subject:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="subjectName">Subject Name</Label>
          <Input
            id="subjectName"
            placeholder="e.g., Data Structures"
            {...register("subjectName")}
            className={errors.subjectName ? "border-red-500" : ""}
          />
          {errors.subjectName && <p className="text-red-500 text-sm mt-1">{errors.subjectName.message}</p>}
        </div>

        <div>
          <Label htmlFor="subjectCode">Subject Code</Label>
          <Input
            id="subjectCode"
            placeholder="e.g., CS101"
            {...register("subjectCode")}
            className={errors.subjectCode ? "border-red-500" : ""}
          />
          {errors.subjectCode && <p className="text-red-500 text-sm mt-1">{errors.subjectCode.message}</p>}
        </div>

        <div>
          <Label htmlFor="department">Department</Label>
          <select id="department" {...register("department")} className="w-full px-3 py-2 border rounded-md">
            <option value="">Select a department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>}
        </div>

        <div>
          <Label htmlFor="credits">Credits</Label>
          <Input id="credits" type="number" min="1" max="6" {...register("credits", { valueAsNumber: true })} />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Saving..." : isEdit ? "Update Subject" : "Add Subject"}
        </Button>
      </form>
    </Card>
  )
}
