"use client";

export function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="inline-flex items-center rounded-full border border-stone-200 bg-white p-1 shadow-sm">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-stone-700 transition hover:bg-stone-100"
      >
        -
      </button>
      <span className="min-w-12 px-2 text-center text-sm font-semibold text-stone-950">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-stone-700 transition hover:bg-stone-100"
      >
        +
      </button>
    </div>
  );
}
