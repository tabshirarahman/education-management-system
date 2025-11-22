import type React from "react";
import { AdminLayout } from "@/components/admin/layout";

export const metadata = {
  title: "Admin Dashboard - EMS",
  description: "University Result Management System Admin Panel",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
