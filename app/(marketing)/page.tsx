"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-full">
            <span className="text-sm font-medium text-blue-400">
              Welcome to EMS
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Manage Your Academic
            <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Journey Seamlessly
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            A modern Education Management System that streamlines student
            information, results, and department management for universities
            worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/courses">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Explore Courses
              </Button>
            </Link>
            <Link href="/result">
              <Button
                size="lg"
                variant="outline"
                className="px-8 border-slate-600 text-white hover:bg-slate-800 bg-transparent"
              >
                Get Results
              </Button>
            </Link>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">5000+</div>
              <div className="text-slate-400">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
              <div className="text-slate-400">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-slate-400">Courses Offered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our System?
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to manage your academic life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: GraduationCap,
                title: "Student Management",
                description:
                  "Comprehensive student database with enrollment tracking",
              },
              {
                icon: BookOpen,
                title: "Course Management",
                description:
                  "Organize and manage multiple departments and courses",
              },
              {
                icon: TrendingUp,
                title: "Results Tracking",
                description:
                  "Real-time result management with automatic CGPA calculation",
              },
              {
                icon: Users,
                title: "Admin Control",
                description: "Powerful admin dashboard for system management",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={idx}
                  className="p-6 hover:shadow-lg transition-shadow border border-slate-200"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students and administrators using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100 px-8"
              >
                Sign Up Now
              </Button>
            </Link> */}
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-blue-700 px-8 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
