import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db/connect"
import Result from "@/models/Result"
import Student from "@/models/Student"
import type { ApiResponse, IResult } from "@/types"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { studentId, department } = await request.json()

    // Find student by studentId and department
    const student = await Student.findOne({
      studentId,
      department,
    })

    if (!student) {
      return NextResponse.json<ApiResponse<null>>({ success: false, message: "Student not found" }, { status: 404 })
    }

    // Find results for this student
    const result = await Result.findOne({
      student: student._id,
    })
      .populate("student")
      .populate("department")
      .populate("subjectMarks.subject")

    if (!result) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "No results found for this student" },
        { status: 404 },
      )
    }

    return NextResponse.json<ApiResponse<IResult>>({
      success: true,
      message: "Result found successfully",
      data: result,
    })
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to search result",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    )
  }
}
