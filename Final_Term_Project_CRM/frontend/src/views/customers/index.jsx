"use client";

import { useEffect, useState } from "react";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import CustomerTable from "./CustomerTable";
import { useCustomers } from "@/hooks/useCustomers";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/PageHeader";
import InvoiceGenerator from "@/components/invoices/InvoiceGenerator";
import GenericModal from "@/components/CommonForm/GenericModal";
import { customerControls } from "./constants";
import { validateCustomer } from "@/lib/validateCustomer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function CustomersPage() {
  const { list: customers, create, fetchAll, loading } = useCustomers();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", status: "Lead" });
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const status = statusFilter === "All" ? "" : statusFilter;
    fetchAll({ search: debouncedSearch, status });
  }, [fetchAll, debouncedSearch, statusFilter]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Customers"
        description="Search, filter, and manage all customer records."
      >
        <GenericModal
          title="Add Customer"
          triggerElement={
            <Button className="gap-2 rounded-full">
              <IconPlus className="size-4" />
              Add Customer
            </Button>
          }
          formControls={customerControls}
          formData={formData}
          setFormData={setFormData}
          successMessage="Customer added successfully!"
          validate={validateCustomer}
          onSubmit={async (data) => {
            await create({ customerData: data });
            setFormData({ name: "", email: "", phone: "", company: "", status: "Lead" });
          }}
        />
      </PageHeader>

      <Card className="panel p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-1">
            <div className="relative flex-1">
              <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Lead">Lead</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <InvoiceGenerator customers={customers} />
        </div>
      </Card>

      {loading && (
        <p className="text-sm text-muted-foreground">Loading customers...</p>
      )}
      <CustomerTable hideSearch />
    </div>
  );
}
