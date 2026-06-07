"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomers } from "@/hooks/useCustomers";

const COMMANDS = [
  { command: "help", description: "List all available commands" },
  { command: "list customers", description: "Show all customer names" },
  { command: "show customers", description: "Navigate to the customers page" },
  { command: "add customer", description: "Navigate to add a new customer" },
  { command: "generate invoice", description: "Open invoice generation for a customer" },
];

function getBotResponse(input, customers = []) {
  const normalized = input.trim().toLowerCase();

  switch (normalized) {
    case "help":
      return { type: "help", text: "Here are the available commands:", commands: COMMANDS };
    case "list customers":
      if (customers.length === 0) {
        return { type: "text", text: "No customers found. Type 'add customer' to create one." };
      }
      return {
        type: "customerList",
        text: `Found ${customers.length} customer(s):`,
        customers: customers.map((c) => ({
          id: c._id || c.id,
          name: c.name,
          status: c.status || "Lead",
        })),
      };
    case "show customers":
      return { type: "link", text: "Opening the customers page:", linkLabel: "Go to Customers", path: "/customers" };
    case "add customer":
      return {
        type: "link",
        text: "Go to the Customers page and click 'Add Customer' to create a new record.",
        linkLabel: "Go to Customers",
        path: "/customers",
      };
    case "generate invoice": {
      const first = customers[0];
      if (!first) {
        return { type: "text", text: "No customers available. Add a customer first, then open their detail page and click 'Generate Invoice'." };
      }
      return {
        type: "link",
        text: `Generate an invoice for ${first.name}:`,
        linkLabel: "Generate Invoice",
        path: `/customers/${first._id || first.id}?invoice=true`,
      };
    }
    default:
      return { type: "text", text: "I don't understand. Type help for available commands." };
  }
}

function BotMessage({ message, onNavigate }) {
  if (message.type === "help") {
    return (
      <div className="space-y-2">
        <p>{message.text}</p>
        <ul className="space-y-1.5 text-xs">
          {message.commands.map((cmd) => (
            <li key={cmd.command} className="rounded-md bg-background/60 px-2 py-1">
              <span className="font-mono font-medium text-primary">{cmd.command}</span>
              <span className="text-muted-foreground"> — {cmd.description}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (message.type === "customerList") {
    return (
      <div className="space-y-2">
        <p>{message.text}</p>
        <ul className="space-y-1 text-xs">
          {message.customers.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => onNavigate(`/customers/${c.id}`)}
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                {c.name}
              </button>
              <span className="text-muted-foreground"> — {c.status}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (message.type === "link") {
    return (
      <div className="space-y-2">
        <p>{message.text}</p>
        <button
          type="button"
          onClick={() => onNavigate(message.path)}
          className="text-sm font-medium text-primary underline-offset-2 hover:underline"
        >
          {message.linkLabel}
        </button>
      </div>
    );
  }

  return <p>{message.text}</p>;
}

export default function Chatbot() {
  const router = useRouter();
  const { list: customers = [], fetchAll } = useCustomers();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      content: {
        type: "text",
        text: "Hi! I'm your CRM assistant. Type help to see what I can do.",
      },
    },
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && customers.length === 0) fetchAll();
  }, [open, customers.length, fetchAll]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", content: { type: "text", text: trimmed } },
      { id: Date.now() + 1, role: "bot", content: getBotResponse(trimmed, customers) },
    ]);
    setInput("");
  };

  const handleNavigate = (path) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {open && (
        <div className="flex h-[420px] w-[340px] flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_20px_60px_-12px_rgba(0,0,0,0.2)] sm:w-[360px]">
          <div className="flex items-center justify-between border-b border-border/50 bg-muted/40 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30">
                <Bot className="size-5" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold">Nexus Bot</h3>
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Sparkles className="size-3 text-teal-500" /> Command assistant
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X className="size-4" />
            </Button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] px-4 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-2xl rounded-br-md bg-teal-500 text-white shadow-md shadow-teal-500/20"
                      : "rounded-2xl rounded-bl-md bg-muted text-foreground"
                  }`}
                >
                  {message.role === "user" ? (
                    <p>{message.content.text}</p>
                  ) : (
                    <BotMessage message={message.content} onNavigate={handleNavigate} />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border/50 p-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Try: help"
              className="flex-1 rounded-full border border-border bg-muted/50 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            />
            <Button type="submit" size="icon" className="size-10 shrink-0 rounded-full" disabled={!input.trim()}>
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}

      <Button
        size="icon"
        className="size-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-xl shadow-teal-500/30 transition-transform hover:scale-105"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </Button>
    </div>
  );
}
