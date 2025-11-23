"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Users,
  BookOpen,
  FileText,
  Award,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: BarChart3 },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Departments", href: "/admin/departments", icon: BookOpen },
  { label: "Subjects", href: "/admin/subjects", icon: FileText },
  { label: "Results", href: "/admin/results", icon: Award },
  { label: "Notices", href: "/admin/notices", icon: Bell },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* MOBILE TOGGLE BUTTON -> Always visible on mobile */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-lg shadow-lg"
      >
        <Menu size={22} />
      </button>

      {/* SIDEBAR */}
      <aside
        className={cn(
          "bg-slate-900 text-white min-h-screen flex flex-col w-64 md:w-64 sm:w-56 transition-transform",
          "fixed md:static top-0 left-0 z-40",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Sidebar header + Close button */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between md:block">
          <div>
            <h1 className="text-xl font-bold">URMS Admin</h1>
            <p className="text-sm text-slate-400">
              University Result Management System
            </p>
          </div>

          {/* CLOSE BUTTON (Mobile only) */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden p-2 bg-slate-800 rounded-lg"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)} // Auto close on mobile
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-700">
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-transparent text-white border-slate-600 hover:bg-slate-800"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
