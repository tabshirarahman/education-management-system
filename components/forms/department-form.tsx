"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createDepartmentSchema, type CreateDepartmentInput } from "@/lib/validations/department"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DepartmentFormProps {
  onSuccess: () => void
  initialData?: any
  isEdit?: boolean
}

export function DepartmentForm({ onSuccess, initialData, isEdit }: DepartmentFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDepartmentInput>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: CreateDepartmentInput) => {
    setIsLoading(true)
    try {
      const url = isEdit ? `/api/departments/${initialData._id}` : "/api/departments"
      const method = isEdit ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        onSuccess()
      } else {
        console.error("Failed to save department")
      }
    } catch (error) {
      console.error("Error saving department:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Department Name</Label>
          <Input
            id="name"
            placeholder="e.g., Computer Science"
            {...register("name")}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="code">Department Code</Label>
          <Input
            id="code"
            placeholder="e.g., CS"
            {...register("code")}
            className={errors.code ? "border-red-500" : ""}
          />
          {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            placeholder="Department description (optional)"
            {...register("description")}
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Saving..." : isEdit ? "Update Department" : "Add Department"}
        </Button>
      </form>
    </Card>
  )
}
