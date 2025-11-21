import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db/connect"
import Notice from "@/models/Notice"
import { createNoticeSchema } from "@/lib/validations/notice"
import type { ApiResponse, INotice } from "@/types"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const notices = await Notice.find().sort({ createdAt: -1 })

    return NextResponse.json<ApiResponse<INotice[]>>({
      success: true,
      message: "Notices fetched successfully",
      data: notices,
    })
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to fetch notices",
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
    const validatedData = createNoticeSchema.parse(body)

    const notice = new Notice(validatedData)
    await notice.save()

    return NextResponse.json<ApiResponse<INotice>>(
      {
        success: true,
        message: "Notice created successfully",
        data: notice,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to create notice",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    )
  }
}
