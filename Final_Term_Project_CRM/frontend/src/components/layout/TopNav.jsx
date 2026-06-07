"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  IconLayoutDashboard,
  IconLogout,
  IconMenu2,
  IconMoon,
  IconPlus,
  IconSun,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import GenericModal from "@/components/CommonForm/GenericModal";
import { useCustomers } from "@/hooks/useCustomers";
import { validateCustomer } from "@/lib/validateCustomer";
import { toast } from "sonner";

const NAV = [
  { label: "Dashboard", href: "/dashboard", icon: IconLayoutDashboard },
  { label: "Customers", href: "/customers", icon: IconUsers },
];

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { create } = useCustomers();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => setMobileOpen(false), [pathname]);

  const customerControls = [
    { name: "name", label: "Name", componentType: "input", type: "text", placeholder: "Enter name" },
    { name: "email", label: "Email", componentType: "input", type: "email", placeholder: "Enter email" },
    { name: "phone", label: "Phone", componentType: "input", type: "text", placeholder: "Enter phone" },
    { name: "company", label: "Company", componentType: "input", type: "text", placeholder: "Enter company" },
  ];

  const handleLogout = () => {
    logoutUser();
    toast.success("Signed out");
    router.push("/auth");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex shrink-0 items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
            <span className="font-display text-sm font-bold text-primary-foreground">N</span>
          </div>
          <span className="font-display hidden text-lg font-bold tracking-tight sm:block">Nexus</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`nav-pill flex items-center gap-2 ${active ? "nav-pill-active" : "nav-pill-inactive"}`}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <GenericModal
            title="Add Customer"
            triggerElement={
              <Button size="sm" className="hidden gap-1.5 rounded-full shadow-md shadow-primary/20 sm:flex">
                <IconPlus className="size-4" />
                New Customer
              </Button>
            }
            formControls={customerControls}
            formData={formData}
            setFormData={setFormData}
            successMessage="Customer added!"
            validate={validateCustomer}
            onSubmit={async (data) => {
              await create({ customerData: data });
              setFormData({});
            }}
          />

          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full"
            onClick={() => toggleTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <IconSun className="size-4" /> : <IconMoon className="size-4" />}
          </Button>

          {user && (
            <div className="hidden items-center gap-2 rounded-full border bg-muted/50 py-1 pl-1 pr-3 sm:flex">
              <div className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {initials}
              </div>
              <span className="max-w-[100px] truncate text-xs font-medium">{user.name}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="ml-1 rounded-full p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="Sign out"
              >
                <IconLogout className="size-3.5" />
              </button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <IconX className="size-5" /> : <IconMenu2 className="size-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-background/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map(({ label, href, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                    active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="size-5" />
                  {label}
                </Link>
              );
            })}
          </nav>
          {user && (
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10"
            >
              <IconLogout className="size-5" />
              Sign out
            </button>
          )}
        </div>
      )}
    </header>
  );
}
