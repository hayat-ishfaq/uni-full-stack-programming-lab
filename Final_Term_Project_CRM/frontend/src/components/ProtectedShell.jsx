"use client";

import AuthGuard from "@/components/AuthGuard";
import { HomeLayout } from "@/layouts/HomeLayout";

export default function ProtectedShell({ children }) {
  return (
    <AuthGuard>
      <HomeLayout>{children}</HomeLayout>
    </AuthGuard>
  );
}
