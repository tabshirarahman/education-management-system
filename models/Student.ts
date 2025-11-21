import mongoose, { Schema, type Document } from "mongoose"

export interface IStudent extends Document {
  name: string
  email: string
  phone: string
  studentId: string
  department: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const studentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
  },
  { timestamps: true },
)

export default mongoose.models.Student || mongoose.model<IStudent>("Student", studentSchema)
