import { z } from "zod"

export const createStudentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{11}$/, "Phone must be 11 digits"),
  department: z.string().min(1, "Department is required"),
})

export const updateStudentSchema = createStudentSchema.partial()

export type CreateStudentInput = z.infer<typeof createStudentSchema>
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>
