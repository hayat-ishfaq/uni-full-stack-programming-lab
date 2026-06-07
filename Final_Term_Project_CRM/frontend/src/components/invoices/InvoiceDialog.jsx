"use client";

import { useEffect, useMemo, useState } from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  buildInvoiceData,
  COMPANY_NAME,
  formatCurrency,
  generateInvoicePdf,
} from "@/lib/invoice";
import { toast } from "sonner";

export default function InvoiceDialog({ customer, open, onOpenChange }) {
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (open && customer) {
      setInvoice(buildInvoiceData(customer));
    }
  }, [open, customer]);

  const summaryRows = useMemo(() => {
    if (!invoice) return [];
    return [
      { label: "Subtotal", value: formatCurrency(invoice.subtotal) },
      { label: `Tax (${Math.round(invoice.taxRate * 100)}%)`, value: formatCurrency(invoice.tax) },
      { label: "Total Due", value: formatCurrency(invoice.total), highlight: true },
    ];
  }, [invoice]);

  const handleDownloadPdf = () => {
    if (!invoice) return;
    generateInvoicePdf(invoice);
    toast.success(`Invoice ${invoice.invoiceNumber} downloaded successfully!`);
  };

  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Invoice Preview</DialogTitle>
        </DialogHeader>

        {invoice && (
          <div className="space-y-5 text-sm">
            <div className="flex items-start justify-between rounded-lg border bg-muted/30 p-4">
              <div>
                <p className="text-lg font-bold tracking-tight">{COMPANY_NAME}</p>
                <p className="text-xs text-muted-foreground">Business billing statement</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm font-semibold text-primary">{invoice.invoiceNumber}</p>
                <p className="text-xs text-muted-foreground">Invoice</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/40 p-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Issue Date</p>
                <p className="mt-1 font-semibold">{invoice.date}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Due Date</p>
                <p className="mt-1 font-semibold">{invoice.dueDate}</p>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Bill To</p>
              <p className="mt-1 font-semibold">{invoice.customer.name}</p>
              <p className="text-muted-foreground">{invoice.customer.email}</p>
              {invoice.customer.company && (
                <p className="text-muted-foreground">{invoice.customer.company}</p>
              )}
              {invoice.customer.phone && (
                <p className="text-muted-foreground">{invoice.customer.phone}</p>
              )}
            </div>

            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Service
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.services.map((service) => (
                    <tr key={service.name} className="border-b last:border-b-0">
                      <td className="px-4 py-2.5">{service.name}</td>
                      <td className="px-4 py-2.5 text-right font-medium">
                        {formatCurrency(service.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-2 rounded-lg bg-muted/40 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Summary</p>
              {summaryRows.map((row) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between ${row.highlight ? "border-t pt-2 text-base font-bold" : "text-muted-foreground"}`}
                >
                  <span>{row.label}</span>
                  <span className={row.highlight ? "text-foreground" : "font-medium text-foreground"}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={handleDownloadPdf} className="gap-2" disabled={!invoice}>
            <FileDown className="size-4" />
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
