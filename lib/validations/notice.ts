import { z } from "zod"

export const createNoticeSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["active", "inactive"]).default("active"),
})

export const updateNoticeSchema = createNoticeSchema.partial()

export type CreateNoticeInput = z.infer<typeof createNoticeSchema>
export type UpdateNoticeInput = z.infer<typeof updateNoticeSchema>
