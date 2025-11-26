import { z } from "zod"

export const subjectMarkSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  credit: z.number().min(1, "Credit is required"),
  marks: z.number().min(0).max(200, "Marks must be between 0-100"),
});

export const createResultSchema = z.object({
  student: z.string().min(1, "Student is required"),
  department: z.string().min(1, "Department is required"),
  subjectMarks: z.array(subjectMarkSchema).min(1, "At least one subject is required"),
})

export const updateResultSchema = createResultSchema.partial()

export type CreateResultInput = z.infer<typeof createResultSchema>
export type UpdateResultInput = z.infer<typeof updateResultSchema>
