"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/stats-card";
import { Users, BookOpen, FileText, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    departments: 0,
    subjects: 0,
    notices: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, departmentsRes, subjectsRes, noticesRes] =
          await Promise.all([
            fetch("/api/students"),
            fetch("/api/departments"),
            fetch("/api/subjects"),
            fetch("/api/notices"),
          ]);

        const studentsData = await studentsRes.json();
        const departmentsData = await departmentsRes.json();
        const subjectsData = await subjectsRes.json();
        const noticesData = await noticesRes.json();

        setStats({
          students: studentsData.data?.length || 0,
          departments: departmentsData.data?.length || 0,
          subjects: subjectsData.data?.length || 0,
          notices: noticesData.data?.length || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">
          Welcome to the University Result Management System
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={stats.students}
          icon={<Users className="w-8 h-8" />}
          description="Active student records"
        />
        <StatsCard
          title="Departments"
          value={stats.departments}
          icon={<BookOpen className="w-8 h-8" />}
          description="Academic departments"
        />
        <StatsCard
          title="Subjects"
          value={stats.subjects}
          icon={<FileText className="w-8 h-8" />}
          description="Total subjects"
        />
        <StatsCard
          title="Notices"
          value={stats.notices}
          icon={<Bell className="w-8 h-8" />}
          description="Active notices"
        />
      </div>

      <div className="mt-12">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/admin/students"
              className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
            >
              <h3 className="font-medium text-slate-900">Manage Students</h3>
              <p className="text-sm text-slate-600">
                Add, edit, or remove students
              </p>
            </a>
            <a
              href="/admin/departments"
              className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
            >
              <h3 className="font-medium text-slate-900">Manage Departments</h3>
              <p className="text-sm text-slate-600">
                Create academic departments
              </p>
            </a>
            <a
              href="/admin/results"
              className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
            >
              <h3 className="font-medium text-slate-900">Manage Results</h3>
              <p className="text-sm text-slate-600">
                Input student marks and grades
              </p>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
