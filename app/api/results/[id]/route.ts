import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import Result from "@/models/Result";
import { updateResultSchema } from "@/lib/validations/result";
import { calculateGrade, calculateCGPA } from "@/lib/utils/gradeCalculator-old";
import type { ApiResponse, IResult } from "@/types";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const result = await Result.findById(params.id)
      .populate("student")
      .populate("department")
      .populate("subjectMarks.subject");

    if (!result) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "Result not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<IResult>>({
      success: true,
      message: "Result fetched successfully",
      data: result,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to fetch result",
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
    const validatedData = updateResultSchema.parse(body);

    // Calculate grades and CGPA
    const subjectMarks = validatedData.subjectMarks?.map((sm) => ({
      ...sm,
      grade: calculateGrade(sm.marks),
    }));

    const marks = subjectMarks?.map((sm) => sm.marks) || [];
    const totalCGPA = calculateCGPA(marks);

    const result = await Result.findByIdAndUpdate(
      id,
      {
        ...validatedData,
        ...(subjectMarks && { subjectMarks }),
        totalCGPA,
      },
      { new: true }
    )
      .populate("student")
      .populate("department")
      .populate("subjectMarks.subject");

    if (!result) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "Result not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<IResult>>({
      success: true,
      message: "Result updated successfully",
      data: result,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to update result",
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
    const result = await Result.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "Result not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<null>>({
      success: true,
      message: "Result deleted successfully",
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to delete result",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
