import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db/connect"
import Subject from "@/models/Subject"
import { createSubjectSchema } from "@/lib/validations/subject"
import type { ApiResponse, ISubject } from "@/types"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const departmentId = searchParams.get("department")

    const query = departmentId ? { department: departmentId } : {}
    const subjects = await Subject.find(query).populate("department")

    return NextResponse.json<ApiResponse<ISubject[]>>({
      success: true,
      message: "Subjects fetched successfully",
      data: subjects,
    })
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to fetch subjects",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    const validatedData = createSubjectSchema.parse(body)

    const subject = new Subject(validatedData)
    await subject.save()
    await subject.populate("department")

    return NextResponse.json<ApiResponse<ISubject>>(
      {
        success: true,
        message: "Subject created successfully",
        data: subject,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to create subject",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    )
  }
}
