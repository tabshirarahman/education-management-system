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

    // Find last created student to increment ID
    const lastStudent = await Student.findOne().sort({ createdAt: -1 });

    let newIdNumber = 1;
    if (lastStudent?.studentId) {
      const lastNumber = parseInt(lastStudent.studentId.replace("std", ""), 10);
      newIdNumber = lastNumber + 1;
    }

    const generatedStudentId = `std${String(newIdNumber).padStart(4, "0")}`;

    const student = new Student({
      ...validatedData,
      studentId: generatedStudentId,
    });

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

