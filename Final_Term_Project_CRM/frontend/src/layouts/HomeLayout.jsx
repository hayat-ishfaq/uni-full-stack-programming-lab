"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { connectSocket, disconnectSocket } from "@/api/socket";
import Chatbot from "@/components/Chatbot";
import { TopNav } from "@/components/layout/TopNav";

export function HomeLayout({ children }) {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) return;
    const baseUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL || process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("token");
    const s = connectSocket({ baseUrl, token, userId: user._id || user.id });
    if (user?.role === "admin") {
      s.emit("joinAdmin");
    }
    return () => disconnectSocket();
  }, [user]);

  return (
    <div className="mesh-bg min-h-screen">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Chatbot />
    </div>
  );
}
