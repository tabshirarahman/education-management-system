"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar"; 
import Footer from "@/components/footer"; 

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "student";
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar  />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
