"use client";

import { createContext, useContext } from "react";
import { useCurrentUser } from "@/app/hooks/useCurrentUser"; 

const UserContext = createContext<ReturnType<typeof useCurrentUser> | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useCurrentUser();

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
