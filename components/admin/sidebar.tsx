"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Users, BookOpen, FileText, Award, Bell } from "lucide-react"

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    label: "Students",
    href: "/admin/students",
    icon: Users,
  },
  {
    label: "Departments",
    href: "/admin/departments",
    icon: BookOpen,
  },
  {
    label: "Subjects",
    href: "/admin/subjects",
    icon: FileText,
  },
  {
    label: "Results",
    href: "/admin/results",
    icon: Award,
  },
  {
    label: "Notices",
    href: "/admin/notices",
    icon: Bell,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">EMS Admin</h1>
        <p className="text-sm text-slate-400">Education Management System</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800",
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-700 text-xs text-slate-400">
        <p>Education Management System</p>
      </div>
    </aside>
  )
}
