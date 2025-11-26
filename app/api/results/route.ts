import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import Result, { IResult } from "@/models/Result";
import { createResultSchema } from "@/lib/validations/result";
import {
  calculateGradeFromPercentage,
  calculateCGPA,
  gradeToPoint,
  totalMarksByCredit,
} from "@/lib/utils/gradeCalculator";
import { ApiResponse } from "@/types";
import "@/models/Student";
import "@/models/Department";
import "@/models/Subject";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const validatedData = createResultSchema.parse(body);

    // Process subjects
    const subjectMarks = validatedData.subjectMarks.map((sm) => {
      const totalMarks = totalMarksByCredit(sm.credit);
      const percentage = (sm.marks / totalMarks) * 100;

      const grade = calculateGradeFromPercentage(percentage);
      const gpa = gradeToPoint(grade);
      const subjectPoint = gpa * sm.credit;

      return {
        ...sm,
        totalMarks,
        percentage,
        grade,
        gpa,
        subjectPoint,
      };
    });

    // Final CGPA
    const totalCGPA = calculateCGPA(
      subjectMarks.map((s) => ({ marks: s.marks, credits: s.credit }))
    );

    const result = new Result({
      ...validatedData,
      subjectMarks,
      totalCGPA,
    });

    await result.save();
    await result.populate(["student", "department", "subjectMarks.subject"]);

    return NextResponse.json(
      {
        success: true,
        message: "Result created successfully",
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create result",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const results = await Result.find()
      .populate("student")
      .populate("department")
      .populate("subjectMarks.subject");

    return NextResponse.json<ApiResponse<IResult[]>>({
      success: true,
      message: "Results fetched successfully",
      data: results,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to fetch results",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
