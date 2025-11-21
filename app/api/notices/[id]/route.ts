import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db/connect"
import Notice from "@/models/Notice"
import { updateNoticeSchema } from "@/lib/validations/notice"
import type { ApiResponse, INotice } from "@/types"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
           const { id } = await context.params;
    const notice = await Notice.findById(id);

    if (!notice) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "Notice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<INotice>>({
      success: true,
      message: "Notice fetched successfully",
      data: notice,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to fetch notice",
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
    const validatedData = updateNoticeSchema.parse(body);

    const notice = await Notice.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!notice) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "Notice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<INotice>>({
      success: true,
      message: "Notice updated successfully",
      data: notice,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to update notice",
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
    const notice = await Notice.findByIdAndDelete(id);

    if (!notice) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "Notice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<null>>({
      success: true,
      message: "Notice deleted successfully",
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to delete notice",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
