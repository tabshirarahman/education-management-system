"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createNoticeSchema, type CreateNoticeInput } from "@/lib/validations/notice"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface NoticeFormProps {
  onSuccess: () => void
  initialData?: any
  isEdit?: boolean
}

export function NoticeForm({ onSuccess, initialData, isEdit }: NoticeFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNoticeInput>({
    resolver: zodResolver(createNoticeSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: CreateNoticeInput) => {
    setIsLoading(true)
    try {
      const url = isEdit ? `/api/notices/${initialData._id}` : "/api/notices"
      const method = isEdit ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        onSuccess()
      } else {
        console.error("Failed to save notice")
      }
    } catch (error) {
      console.error("Error saving notice:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="e.g., Holiday Announcement"
            {...register("title")}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            placeholder="Enter the notice content..."
            {...register("description")}
            className={`w-full px-3 py-2 border rounded-md ${errors.description ? "border-red-500" : ""}`}
            rows={6}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <select id="status" {...register("status")} className="w-full px-3 py-2 border rounded-md">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Saving..." : isEdit ? "Update Notice" : "Post Notice"}
        </Button>
      </form>
    </Card>
  )
}
