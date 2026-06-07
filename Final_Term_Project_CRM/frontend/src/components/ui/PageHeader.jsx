export function PageHeader({ title, description, children }) {
  return (
    <div className="mb-2 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
        </div>
        {description && (
          <p className="pl-4 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2 pl-4 sm:pl-0">{children}</div>}
    </div>
  );
}
