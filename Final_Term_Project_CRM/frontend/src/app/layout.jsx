import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "@/index.css";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/components/providers/StoreProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});

export const metadata = {
  title: "Nexus CRM",
  description: "Customer Relationship Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${syne.variable}`}>
      <body className="font-sans">
        <StoreProvider>
          {children}
          <Toaster richColors closeButton position="bottom-right" theme="system" />
        </StoreProvider>
      </body>
    </html>
  );
}
