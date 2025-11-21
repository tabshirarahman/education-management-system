import { z } from "zod"

export const createSubjectSchema = z.object({
  subjectName: z.string().min(2, "Subject name must be at least 2 characters"),
  subjectCode: z.string().min(1, "Subject code is required"),
  department: z.string().min(1, "Department is required"),
  credits: z.number().min(1).max(6).optional().default(3),
})

export const updateSubjectSchema = createSubjectSchema.partial()

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>
export type UpdateSubjectInput = z.infer<typeof updateSubjectSchema>
