"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/promo/actions";

const initial: EnquiryState = { status: "idle" };

const field =
  "mt-2 w-full rounded-sm border bg-ink/40 px-4 py-3.5 text-base text-bone placeholder:text-stone/80 transition-colors focus:border-red-bright focus:outline-none";

export function EnquiryForm() {
  const [state, action, pending] = useActionState(submitEnquiry, initial);

  if (state.status === "ok") {
    return (
      <div role="status" className="rounded-sm border border-red/70 bg-red/20 p-8">
        <p className="eyebrow text-red-bright">Request received</p>
        <p className="font-display mt-3 text-3xl leading-tight text-bone">{state.message}</p>
      </div>
    );
  }

  const err = state.errors ?? {};
  const v = state.values ?? {};
  const border = (k: keyof typeof err) => (err[k] ? "border-red-400/80" : "border-line");

  return (
    <form action={action} noValidate className="grid gap-5 sm:grid-cols-2">
      <label className="block text-sm text-sand sm:col-span-2">
        Full name
        <input
          name="name"
          autoComplete="name"
          defaultValue={v.name}
          required
          aria-invalid={!!err.name}
          aria-describedby={err.name ? "name-error" : undefined}
          className={`${field} ${border("name")}`}
        />
        {err.name && <span id="name-error" className="mt-1.5 block text-xs text-red-300">{err.name}</span>}
      </label>

      <label className="block text-sm text-sand">
        Phone
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          defaultValue={v.phone}
          required
          aria-invalid={!!err.phone}
          aria-describedby={err.phone ? "phone-error" : undefined}
          className={`${field} ${border("phone")}`}
        />
        {err.phone && <span id="phone-error" className="mt-1.5 block text-xs text-red-300">{err.phone}</span>}
      </label>

      <label className="block text-sm text-sand">
        Email <span className="text-stone">(optional)</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={v.email}
          aria-invalid={!!err.email}
          aria-describedby={err.email ? "email-error" : undefined}
          className={`${field} ${border("email")}`}
        />
        {err.email && <span id="email-error" className="mt-1.5 block text-xs text-red-300">{err.email}</span>}
      </label>

      <label className="block text-sm text-sand">
        City
        <input
          name="city"
          autoComplete="address-level2"
          defaultValue={v.city}
          required
          aria-invalid={!!err.city}
          aria-describedby={err.city ? "city-error" : undefined}
          className={`${field} ${border("city")}`}
        />
        {err.city && <span id="city-error" className="mt-1.5 block text-xs text-red-300">{err.city}</span>}
      </label>

      <label className="block text-sm text-sand">
        Your space
        <select name="space" defaultValue={v.space ?? "Garden"} className={`${field} border-line`}>
          <option>Garden</option>
          <option>Terrace</option>
          <option>Balcony</option>
          <option>Farmhouse</option>
          <option>Something else</option>
        </select>
      </label>

      {/* Honeypot for bots, hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-red px-8 py-4 text-sm font-semibold text-cream shadow-[0_10px_40px_-10px_rgba(153,0,17,0.9)] transition-colors hover:bg-red-deep disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : "Book my design visit"}
        </button>
        {state.status === "error" ? (
          <p role="alert" className="text-sm text-red-300">{state.message}</p>
        ) : (
          <p className="text-xs text-stone">We only use these details to arrange your visit.</p>
        )}
      </div>
    </form>
  );
}
