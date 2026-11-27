"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/promo/actions";

const initial: EnquiryState = { status: "idle" };

const field =
  "mt-2 w-full rounded-none border bg-white px-4 py-3.5 text-base text-graphite placeholder:text-graphite-soft/70 transition-colors focus:border-red focus:outline-none";

export function EnquiryForm() {
  const [state, action, pending] = useActionState(submitEnquiry, initial);

  if (state.status === "ok") {
    return (
      <div role="status" className="rounded-none border border-red/40 bg-red/5 p-8">
        <p className="eyebrow text-red">Request received</p>
        <p className="font-display mt-3 text-3xl leading-tight font-light text-graphite">{state.message}</p>
      </div>
    );
  }

  const err = state.errors ?? {};
  const v = state.values ?? {};
  const border = (k: keyof typeof err) => (err[k] ? "border-red" : "border-graphite/20");

  return (
    <form action={action} noValidate className="grid gap-5 sm:grid-cols-2">
      <label className="block text-sm text-graphite sm:col-span-2">
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
        {err.name && <span id="name-error" className="mt-1.5 block text-xs text-red">{err.name}</span>}
      </label>

      <label className="block text-sm text-graphite">
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
        {err.phone && <span id="phone-error" className="mt-1.5 block text-xs text-red">{err.phone}</span>}
      </label>

      <label className="block text-sm text-graphite">
        Email <span className="text-graphite-soft">(optional)</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={v.email}
          aria-invalid={!!err.email}
          aria-describedby={err.email ? "email-error" : undefined}
          className={`${field} ${border("email")}`}
        />
        {err.email && <span id="email-error" className="mt-1.5 block text-xs text-red">{err.email}</span>}
      </label>

      <label className="block text-sm text-graphite">
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
        {err.city && <span id="city-error" className="mt-1.5 block text-xs text-red">{err.city}</span>}
      </label>

      <label className="block text-sm text-graphite">
        Your space
        <select name="space" defaultValue={v.space ?? "Garden"} className={`${field} border-graphite/20`}>
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
          className="btn btn-red disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : "Book my design visit"}
        </button>
        {state.status === "error" ? (
          <p role="alert" className="text-sm text-red">{state.message}</p>
        ) : (
          <p className="text-xs text-graphite-soft">We only use these details to arrange your visit.</p>
        )}
      </div>
    </form>
  );
}
