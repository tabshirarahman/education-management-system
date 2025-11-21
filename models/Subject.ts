import mongoose, { Schema, type Document } from "mongoose"

export interface ISubject extends Document {
  subjectName: string
  subjectCode: string
  department: mongoose.Types.ObjectId
  credits?: number
  createdAt: Date
  updatedAt: Date
}

const subjectSchema = new Schema<ISubject>(
  {
    subjectName: { type: String, required: true },
    subjectCode: { type: String, required: true, unique: true },
    department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
    credits: { type: Number, default: 3 },
  },
  { timestamps: true },
)

export default mongoose.models.Subject || mongoose.model<ISubject>("Subject", subjectSchema)
