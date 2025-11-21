import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db/connect"
import Department from "@/models/Department"
import { createDepartmentSchema } from "@/lib/validations/department"
import type { ApiResponse, IDepartment } from "@/types"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const departments = await Department.find()
    return NextResponse.json<ApiResponse<IDepartment[]>>({
      success: true,
      message: "Departments fetched successfully",
      data: departments,
    })
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to fetch departments",
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
    const validatedData = createDepartmentSchema.parse(body)

    const department = new Department(validatedData)
    await department.save()

    return NextResponse.json<ApiResponse<IDepartment>>(
      {
        success: true,
        message: "Department created successfully",
        data: department,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to create department",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    )
  }
}
