"use client";
import type React from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, AlertCircle } from "lucide-react";

interface StudentResult {
  _id: string;
  name: string;
  studentId: string;
  email: string;
  department: {
    _id: string;
    name: string;
    code: string;
  };
}

interface ResultData {
  student: StudentResult;
  department: {
    _id: string;
    name: string;
  };
  subjectMarks: Array<{
    subject: {
      _id: string;
      subjectName: string;
      subjectCode: string;
    };
    marks: number;
    grade: string;
  }>;
  totalCGPA: number;
}

export default function Result() {
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // Fetch departments on mount
  useState(() => {
    fetch("/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data.data || []))
      .catch(() => console.error("Failed to fetch departments"));
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/results/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, department }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.data);
      } else {
        setError(
          data.message ||
            "No results found. Please check your student ID and department."
        );
      }
    } catch (err) {
      setError("Failed to search results. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Education Management System
          </h1>
          <p className="text-slate-400">Search for your academic results</p>
        </div>

        {/* Search Card */}
        <Card className="p-8 mb-8 bg-white">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="studentId" className="text-slate-900">
                  Student ID
                </Label>
                <Input
                  id="studentId"
                  placeholder="e.g., STU001"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="department" className="text-slate-900">
                  Department
                </Label>
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="mt-2 w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !studentId || !department}
              className="w-full gap-2 h-12"
            >
              <Search className="w-5 h-5" />
              {loading ? "Searching..." : "Search Results"}
            </Button>
          </form>
        </Card>

        {/* Error Message */}
        {error && searched && (
          <Card className="p-6 mb-8 border-red-200 bg-red-50">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">No Results Found</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Results Display */}
        {result && (
          <div className="space-y-6">
            {/* Student Info Card */}
            <Card className="p-6 bg-white border-l-4 border-blue-600">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Name</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {result.student.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Student ID</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {result.student.studentId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Department</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {result.department.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Overall CGPA</p>
                  <p className="text-lg font-bold text-blue-600">
                    {result.totalCGPA.toFixed(2)} / 4.0
                  </p>
                </div>
              </div>
            </Card>

            {/* Subject Marks */}
            <Card className="p-6 bg-white">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Subject-wise Performance
              </h2>
              <div className="space-y-4">
                {result && result.subjectMarks.map((sm, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">
                        {sm.subject.subjectName}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {sm.subject.subjectCode}
                      </p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-xs text-slate-600 mb-1">Marks</p>
                        <p className="text-xl font-bold text-slate-900">
                          {sm.marks}
                          <span className="text-sm text-slate-500">/100</span>
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-600 mb-1">Grade</p>
                        <p className="text-xl font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                          {sm.grade}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Summary */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-slate-50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Total Subjects</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {result.subjectMarks.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">
                    Overall CGPA (4.0 scale)
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {result.totalCGPA.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
