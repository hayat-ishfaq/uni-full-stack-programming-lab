"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCustomers } from "@/hooks/useCustomers";
import { PageHeader } from "@/components/ui/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardCards from "./DashboardCards";
import DashboardChart from "./DashboardCharts";

const DashboardOverview = () => {
  const { user } = useSelector((state) => state.auth);
  const { list: customers = [], loading, fetchAll: fetchCustomers } = useCustomers();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  if (loading && customers.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-16 w-64 rounded-2xl" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={`Hey, ${user?.name?.split(" ")[0] || "there"} 👋`}
        description="Here's a snapshot of your business today."
      />
      <DashboardCards customers={customers} />
      <DashboardChart customers={customers} />
    </div>
  );
};

export default DashboardOverview;
