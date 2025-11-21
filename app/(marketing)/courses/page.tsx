"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Clock, BookOpen } from "lucide-react";

const courses = [
  {
    id: "cse",
    name: "Computer Science & Engineering",
    code: "CSE",
    description:
      "Learn cutting-edge technologies in software development, AI, and web technologies",
    icon: "💻",
    color: "from-blue-500 to-blue-600",
    students: 1200,
    semesters: 8,
    subjects: 45,
    specializations: [
      "Software Development",
      "AI & Machine Learning",
      "Cybersecurity",
      "Web Development",
    ],
  },
  {
    id: "eee",
    name: "Electrical & Electronics Engineering",
    code: "EEE",
    description:
      "Master electrical systems, power generation, and electronics design",
    icon: "⚡",
    color: "from-yellow-500 to-orange-600",
    students: 850,
    semesters: 8,
    subjects: 42,
    specializations: [
      "Power Systems",
      "Electronics",
      "Renewable Energy",
      "Control Systems",
    ],
  },
  {
    id: "ce",
    name: "Civil Engineering",
    code: "CE",
    description:
      "Design and build infrastructure projects with sustainable practices",
    icon: "🏗️",
    color: "from-orange-500 to-red-600",
    students: 920,
    semesters: 8,
    subjects: 40,
    specializations: [
      "Structural Design",
      "Infrastructure",
      "Geotechnical",
      "Water Resources",
    ],
  },
  {
    id: "me",
    name: "Mechanical Engineering",
    code: "ME",
    description: "Design mechanical systems and manufacturing processes",
    icon: "⚙️",
    color: "from-red-500 to-pink-600",
    students: 1050,
    semesters: 8,
    subjects: 44,
    specializations: [
      "Thermodynamics",
      "Manufacturing",
      "Aerodynamics",
      "Robotics",
    ],
  },
  {
    id: "ec",
    name: "Electronics & Communication",
    code: "EC",
    description:
      "Explore telecommunications, signal processing, and embedded systems",
    icon: "📡",
    color: "from-purple-500 to-indigo-600",
    students: 780,
    semesters: 8,
    subjects: 41,
    specializations: [
      "Telecommunications",
      "Signal Processing",
      "VLSI",
      "Wireless Networks",
    ],
  },
  {
    id: "it",
    name: "Information Technology",
    code: "IT",
    description: "Master databases, networking, and IT infrastructure",
    icon: "🖥️",
    color: "from-green-500 to-emerald-600",
    students: 1100,
    semesters: 8,
    subjects: 43,
    specializations: [
      "Cloud Computing",
      "Data Analytics",
      "Networking",
      "IT Security",
    ],
  },
];

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<
    (typeof courses)[0] | null
  >(null);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Our Courses
          </h1>
          <p className="text-lg text-slate-600">
            Choose from 6 engineering disciplines with comprehensive curriculum
            and expert faculty
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group border border-slate-200"
                onClick={() => setSelectedCourse(course)}
              >
                {/* Color Bar */}
                <div className={`h-1 bg-gradient-to-r ${course.color}`} />

                <div className="p-6">
                  {/* Icon */}
                  <div className="text-4xl mb-4">{course.icon}</div>

                  {/* Code */}
                  <div className="inline-block mb-3 px-3 py-1 bg-slate-100 rounded-full">
                    <span className="text-xs font-semibold text-slate-700">
                      {course.code}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {course.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm mb-4">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div className="text-center">
                      <div className="text-sm font-bold text-slate-900">
                        {course.students}
                      </div>
                      <div className="text-xs text-slate-600">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-slate-900">
                        {course.semesters}
                      </div>
                      <div className="text-xs text-slate-600">Semesters</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-slate-900">
                        {course.subjects}
                      </div>
                      <div className="text-xs text-slate-600">Subjects</div>
                    </div>
                  </div>

                  {/* Button */}
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(course);
                    }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <Card
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`h-2 bg-gradient-to-r ${selectedCourse.color}`} />
            <div className="p-8">
              {/* Close Button */}
              <button
                className="float-right text-slate-500 hover:text-slate-900 text-2xl"
                onClick={() => setSelectedCourse(null)}
              >
                ×
              </button>

              {/* Title */}
              <div className="mb-6">
                <div className="text-5xl mb-4">{selectedCourse.icon}</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {selectedCourse.name}
                </h2>
                <p className="text-lg text-slate-600">
                  Code:{" "}
                  <span className="font-semibold">{selectedCourse.code}</span>
                </p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  About
                </h3>
                <p className="text-slate-600">{selectedCourse.description}</p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="text-sm text-slate-600">Total Students</div>
                    <div className="text-xl font-bold text-slate-900">
                      {selectedCourse.students}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="text-sm text-slate-600">Duration</div>
                    <div className="text-xl font-bold text-slate-900">
                      {selectedCourse.semesters} Semesters
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="text-sm text-slate-600">Subjects</div>
                    <div className="text-xl font-bold text-slate-900">
                      {selectedCourse.subjects}
                    </div>
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Specialization Options
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCourse.specializations.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span className="text-slate-700 font-medium">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link href="/login" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12">
                    View Curriculum
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full h-12 bg-transparent"
                  >
                    Ask a Question
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
