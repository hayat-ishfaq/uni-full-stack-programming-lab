import ProtectedShell from "@/components/ProtectedShell";

export const dynamic = "force-dynamic";

export default function ProtectedLayout({ children }) {
  return <ProtectedShell>{children}</ProtectedShell>;
}
