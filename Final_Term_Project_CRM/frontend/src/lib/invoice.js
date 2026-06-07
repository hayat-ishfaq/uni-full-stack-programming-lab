import { jsPDF } from "jspdf";

export const INVOICE_SERVICES = [
  { name: "CRM Setup & Configuration", amount: 500 },
  { name: "Monthly Support Plan", amount: 200 },
  { name: "Data Migration Service", amount: 300 },
];

export const TAX_RATE = 0.1;
export const COMPANY_NAME = "Nexus CRM";

export function generateInvoiceNumber() {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = String(Math.floor(1000 + Math.random() * 9000));
  return `INV-${datePart}-${randomPart}`;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatInvoiceDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateInvoiceTotals(services = INVOICE_SERVICES, taxRate = TAX_RATE) {
  const subtotal = services.reduce((sum, service) => sum + service.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

export function buildInvoiceData(customer, services = INVOICE_SERVICES) {
  const invoiceNumber = generateInvoiceNumber();
  const date = formatInvoiceDate();
  const dueDate = formatInvoiceDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const { subtotal, tax, total } = calculateInvoiceTotals(services);

  return {
    invoiceNumber,
    date,
    dueDate,
    customer: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone || "",
      company: customer.company || "",
    },
    services,
    subtotal,
    tax,
    taxRate: TAX_RATE,
    total,
  };
}

export function generateInvoicePdf(invoice) {
  const doc = new jsPDF();
  const left = 20;
  const right = 190;
  let y = 20;

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", left, y);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(COMPANY_NAME, right, y, { align: "right" });
  y += 6;
  doc.text("123 Business Avenue", right, y, { align: "right" });
  y += 5;
  doc.text("support@crmpro.com", right, y, { align: "right" });
  y += 16;

  doc.setDrawColor(200);
  doc.line(left, y, right, y);
  y += 12;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Invoice Details", left, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice Number: ${invoice.invoiceNumber}`, left, y);
  y += 6;
  doc.text(`Issue Date: ${invoice.date}`, left, y);
  y += 6;
  doc.text(`Due Date: ${invoice.dueDate}`, left, y);
  y += 14;

  doc.setFont("helvetica", "bold");
  doc.text("Bill To", left, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text(invoice.customer.name, left, y);
  y += 6;
  doc.text(invoice.customer.email, left, y);
  y += 6;
  if (invoice.customer.company) {
    doc.text(invoice.customer.company, left, y);
    y += 6;
  }
  if (invoice.customer.phone) {
    doc.text(invoice.customer.phone, left, y);
    y += 6;
  }
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.text("Service", left, y);
  doc.text("Amount", right, y, { align: "right" });
  y += 4;
  doc.line(left, y, right, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  invoice.services.forEach((service) => {
    doc.text(service.name, left, y);
    doc.text(formatCurrency(service.amount), right, y, { align: "right" });
    y += 8;
  });

  y += 4;
  doc.line(left, y, right, y);
  y += 10;

  const summaryX = 130;
  doc.text("Subtotal:", summaryX, y);
  doc.text(formatCurrency(invoice.subtotal), right, y, { align: "right" });
  y += 8;
  doc.text(`Tax (${Math.round(invoice.taxRate * 100)}%):`, summaryX, y);
  doc.text(formatCurrency(invoice.tax), right, y, { align: "right" });
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Total Due:", summaryX, y);
  doc.text(formatCurrency(invoice.total), right, y, { align: "right" });
  y += 16;

  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for your business!", left, y);

  doc.save(`${invoice.invoiceNumber}.pdf`);
  return invoice.invoiceNumber;
}
