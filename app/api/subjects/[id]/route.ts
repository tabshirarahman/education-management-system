import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db/connect"
import Subject from "@/models/Subject"
import { updateSubjectSchema } from "@/lib/validations/subject"
import type { ApiResponse, ISubject } from "@/types"
import "@/models/Department";


export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
        const { id } = await context.params;
    const subject = await Subject.findById(id).populate("department");
    if (!subject) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "Subject not found" },
        { status: 404 }
      );
    }
    return NextResponse.json<ApiResponse<ISubject>>({
      success: true,
      message: "Subject fetched successfully",
      data: subject,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to fetch subject",
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
    const validatedData = updateSubjectSchema.parse(body);

    const subject = await Subject.findByIdAndUpdate(id, validatedData, {
      new: true,
    }).populate("department");

    if (!subject) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "Subject not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<ISubject>>({
      success: true,
      message: "Subject updated successfully",
      data: subject,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to update subject",
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
    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "Subject not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<null>>({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to delete subject",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
