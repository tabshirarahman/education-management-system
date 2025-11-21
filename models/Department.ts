import mongoose, { Schema, type Document } from "mongoose"

export interface IDepartment extends Document {
  name: string
  code: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

const departmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true },
)

export default mongoose.models.Department || mongoose.model<IDepartment>("Department", departmentSchema)
