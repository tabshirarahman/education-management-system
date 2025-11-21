"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createStudentSchema, type CreateStudentInput } from "@/lib/validations/student"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { IDepartment } from "@/types"

interface StudentFormProps {
  onSuccess: () => void
  initialData?: any
  isEdit?: boolean
}

export function StudentForm({ onSuccess, initialData, isEdit }: StudentFormProps) {
  const [departments, setDepartments] = useState<IDepartment[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateStudentInput>({
    resolver: zodResolver(createStudentSchema),
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

  const department = watch("department")

  const onSubmit = async (data: CreateStudentInput) => {
    setIsLoading(true)
    try {
      const url = isEdit ? `/api/students/${initialData._id}` : "/api/students"
      const method = isEdit ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        onSuccess()
      } else {
        console.error("Failed to save student")
      }
    } catch (error) {
      console.error("Error saving student:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Student full name"
            {...register("name")}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="student@example.com"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="1234567890"
            {...register("phone")}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="department">Department</Label>
          <select
            id="department"
            {...register("department")}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a department</option>
            {departments && departments?.map((dept) => (
              <option key={String(dept._id)} value={String(dept._id)}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-red-500 text-sm mt-1">
              {errors.department.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Saving..." : isEdit ? "Update Student" : "Add Student"}
        </Button>
      </form>
    </Card>
  );
}
