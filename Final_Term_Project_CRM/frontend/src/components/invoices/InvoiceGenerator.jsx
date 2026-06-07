"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InvoiceDialog from "./InvoiceDialog";
import { toast } from "sonner";

export default function InvoiceGenerator({ customers = [] }) {
  const [selectedId, setSelectedId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const selectedCustomer = customers.find(
    (c) => (c._id || c.id) === selectedId
  );

  const handleGenerate = () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer first");
      return;
    }
    setDialogOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select customer" />
          </SelectTrigger>
          <SelectContent>
            {customers.map((customer) => (
              <SelectItem key={customer._id || customer.id} value={customer._id || customer.id}>
                {customer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2 rounded-full" onClick={handleGenerate} disabled={!selectedId}>
          <FileText className="size-4" />
          Generate Invoice
        </Button>
      </div>

      <InvoiceDialog
        customer={selectedCustomer}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
