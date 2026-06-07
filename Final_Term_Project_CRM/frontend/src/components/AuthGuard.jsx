"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user && !token) {
      router.replace("/auth");
      return;
    }
    setReady(true);
  }, [user, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  return children;
}
