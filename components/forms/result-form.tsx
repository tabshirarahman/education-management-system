"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createResultSchema,
  type CreateResultInput,
} from "@/lib/validations/result";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { IDepartment, IStudent, ISubject } from "@/types";
import { calculateCGPA } from "@/lib/utils/gradeCalculator"; 
import { Trash2 } from "lucide-react";

interface ResultFormProps {
  onSuccess: () => void;
  initialData?: any;
  isEdit?: boolean;
}

export function ResultForm({
  onSuccess,
  initialData,
  isEdit,
}: ResultFormProps) {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<CreateResultInput>({
    resolver: zodResolver(createResultSchema),
    defaultValues: initialData,
  });

  console.log(errors);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjectMarks",
  });

  const selectedStudent = watch("student");
  const selectedDepartment = watch("department");
  const subjectMarks = watch("subjectMarks");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, departmentsRes] = await Promise.all([
          fetch("/api/students"),
          fetch("/api/departments"),
        ]);

        const studentsData = await studentsRes.json();
        const departmentsData = await departmentsRes.json();

        setStudents(studentsData.data || []);
        setDepartments(departmentsData.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Auto-load department when student is selected
  useEffect(() => {
    if (selectedStudent) {
      const student = students.find((s) => s._id === selectedStudent);
      if (student && student.department) {
        const dept = student.department as any;
        // Set the department in form value
        const departmentId = typeof dept === "string" ? dept : dept._id;
        // We need to use setValue here, but it's not provided in the hook
        // For now, pre-select it visually
      }
    }
  }, [selectedStudent, students]);

  // Fetch subjects for selected department
  useEffect(() => {
    if (selectedDepartment) {
      const fetchSubjects = async () => {
        try {
          const res = await fetch(
            `/api/subjects?department=${selectedDepartment}`
          );
          const data = await res.json();
          setSubjects(data.data || []);
        } catch (error) {
          console.error("Failed to fetch subjects:", error);
        }
      };

      fetchSubjects();
    }
  }, [selectedDepartment]);

  const onSubmit = async (data: CreateResultInput) => {
    setIsLoading(true);
    try {
      const url = isEdit ? `/api/results/${initialData._id}` : "/api/results";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        onSuccess();
      } else {
        console.error("Failed to save result");
      }
    } catch (error) {
      console.error("Error saving result:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="student">Student</Label>
            <select
              id="student"
              {...register("student")}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select a student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} ({student.studentId})
                </option>
              ))}
            </select>
            {errors.student && (
              <p className="text-red-500 text-sm mt-1">
                {errors.student.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="department">Department</Label>
            <select
              id="department"
              {...register("department")}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">
                {errors.department.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <Label>Subject Marks</Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => append({ subject: "", marks: 0, credit: 0 })}
            >
              Add Subject
            </Button>
          </div>

          {fields.length === 0 ? (
            <p className="text-sm text-slate-500">No subjects added yet.</p>
          ) : (
            <div className="space-y-3">
              {fields.map((field, index) => {
                const marks = subjectMarks?.[index]?.marks;
                const selectSubj = subjects.find(
                  (s) => s._id.toString() === subjectMarks?.[index]?.subject
                );
                
                const grade = marks
                  ? calculateCGPA([{
                      marks,
                      credits: selectSubj?.credits || 0,
                    }])
                  : "-";
         

                return (
                  <div
                    key={field.id}
                    className="flex items-end gap-3 p-3 border rounded-lg bg-slate-50"
                  >
                    <div className="flex-1">
                      <Label htmlFor={`subject-${index}`} className="text-xs">
                        Subject
                      </Label>
                      <select
                        id={`subject-${index}`}
                        {...register(`subjectMarks.${index}.subject`)}
                        className="w-full px-3 py-2 border rounded-md mt-1"
                      >
                        <option value="">Select subject</option>
                        {subjects.map((subject) => (
                          <option key={subject._id} value={subject._id}>
                            {subject.subjectName} ({subject.subjectCode})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Credit (REQUIRED) */}
                    <div className="w-20">
                      <Label className="text-xs">Credit</Label>
                      <Input
                        type="number"
                        min={1}
                        max={4}
                        {...register(`subjectMarks.${index}.credit`, {
                          valueAsNumber: true,
                        })}
                        defaultValue={selectSubj?.credits}
                        value={selectSubj?.credits}
                        className="mt-1"
                      />
                      {errors.subjectMarks?.[index]?.credit && (
                        <p className="text-red-500 text-xs">
                          {errors.subjectMarks[index].credit?.message}
                        </p>
                      )}
                    </div>

                    <div className="w-24">
                      <Label htmlFor={`marks-${index}`} className="text-xs">
                        Marks (0-100)
                      </Label>
                      <Input
                        id={`marks-${index}`}
                        type="number"
                        min="0"
                        max="200"
                        {...register(`subjectMarks.${index}.marks`, {
                          valueAsNumber: true,
                        })}
                        className="mt-1"
                      />
                    </div>

                    <div className="w-20 text-center">
                      <Label className="text-xs">Grade</Label>
                      <div className="font-semibold text-lg text-blue-600 mt-1">
                        {grade}
                      </div>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}

          {errors.subjectMarks && (
            <p className="text-red-500 text-sm mt-2">
              {errors.subjectMarks.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Saving..." : isEdit ? "Update Result" : "Create Result"}
        </Button>
      </form>
    </Card>
  );
}
