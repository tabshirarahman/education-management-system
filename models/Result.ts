  import mongoose, { Schema, type Document } from "mongoose"

  export interface ISubjectMark {
    subject: mongoose.Types.ObjectId
    marks: number
    grade: string
  }

  export interface IResult extends Document {
    student: mongoose.Types.ObjectId
    department: mongoose.Types.ObjectId
    subjectMarks: ISubjectMark[]
    totalCGPA: number
    createdAt: Date
    updatedAt: Date
  }

  const subjectMarkSchema = new Schema<ISubjectMark>({
    subject: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    marks: { type: Number, required: true, min: 0, max: 100 },
    grade: { type: String },
  })

  const resultSchema = new Schema<IResult>(
    {
      student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
      department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
      subjectMarks: [subjectMarkSchema],
      totalCGPA: { type: Number, default: 0 },
    },
    { timestamps: true },
  )

  export default mongoose.models.Result || mongoose.model<IResult>("Result", resultSchema)
