import mongoose, { Schema, type Document } from "mongoose"

export interface INotice extends Document {
  title: string
  description: string
  status: "active" | "inactive"
  postedDate: Date
  createdAt: Date
  updatedAt: Date
}

const noticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    postedDate: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export default mongoose.models.Notice || mongoose.model<INotice>("Notice", noticeSchema)
