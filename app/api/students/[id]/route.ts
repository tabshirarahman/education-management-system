import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db/connect"
import Student from "@/models/Student"
import { updateStudentSchema } from "@/lib/validations/student"
import type { ApiResponse, IStudent } from "@/types"
import "@/models/Department"
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
        const { id } = await context.params;
    const student = await Student.findById(id).populate("department");
    if (!student) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }
    return NextResponse.json<ApiResponse<IStudent>>({
      success: true,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to fetch student",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
        const { id } = await context.params;
    const body = await request.json();
    const validatedData = updateStudentSchema.parse(body);

    const student = await Student.findByIdAndUpdate(id, validatedData, {
      new: true,
    }).populate("department");

    if (!student) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<IStudent>>({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to update student",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
        const { id } = await context.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<null>>({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to delete student",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
