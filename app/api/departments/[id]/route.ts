import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db/connect"
import Department from "@/models/Department"
import { updateDepartmentSchema } from "@/lib/validations/department"
import type { ApiResponse, IDepartment } from "@/types"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const department = await Department.findById(params.id)
    if (!department) {
      return NextResponse.json<ApiResponse<null>>({ success: false, message: "Department not found" }, { status: 404 })
    }
    return NextResponse.json<ApiResponse<IDepartment>>({
      success: true,
      message: "Department fetched successfully",
      data: department,
    })
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to fetch department",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
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
    const validatedData = updateDepartmentSchema.parse(body);

    const department = await Department.findByIdAndUpdate(
   id,
      validatedData,
      {
        new: true,
      }
    );

    if (!department) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "Department not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<IDepartment>>({
      success: true,
      message: "Department updated successfully",
      data: department,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to update department",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    // 👉 MUST: unwrap params (Next.js 15+ requirement)
    const { id } = await context.params;

    console.log("Deleting department ID =>", id);

    const department = await Department.findByIdAndDelete(id);

    if (!department) {
      return NextResponse.json(
        { success: false, message: "Department not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete department",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
