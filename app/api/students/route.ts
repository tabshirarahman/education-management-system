import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db/connect"
import Student from "@/models/Student"
import { createStudentSchema } from "@/lib/validations/student"
import type { ApiResponse, IStudent } from "@/types"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const students = await Student.find().populate("department")
    return NextResponse.json<ApiResponse<IStudent[]>>({
      success: true,
      message: "Students fetched successfully",
      data: students,
    })
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to fetch students",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     await dbConnect()
//     const body = await request.json()
//     const validatedData = createStudentSchema.parse(body)

//     const student = new Student(validatedData)
//     await student.save()
//     await student.populate("department")

//     return NextResponse.json<ApiResponse<IStudent>>(
//       {
//         success: true,
//         message: "Student created successfully",
//         data: student,
//       },
//       { status: 201 },
//     )
//   } catch (error) {
//     return NextResponse.json<ApiResponse<null>>(
//       {
//         success: false,
//         message: "Failed to create student",
//         error: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 400 },
//     )
//   }
// }

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const validatedData = createStudentSchema.parse(body);






    const student = new Student(validatedData);

    await student.save();
    await student.populate("department");

    return NextResponse.json<ApiResponse<IStudent>>(
      {
        success: true,
        message: "Student created successfully",
        data: student,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to create student",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}

