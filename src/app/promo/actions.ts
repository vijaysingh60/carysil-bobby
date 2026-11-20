"use server";

export type EnquiryState = {
  status: "idle" | "ok" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "phone" | "email" | "city", string>>;
  values?: Record<string, string>;
};

const PHONE = /^[+\d][\d\s-]{7,16}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  const read = (k: string) => String(form.get(k) ?? "").trim();
  const values = {
    name: read("name"),
    phone: read("phone"),
    email: read("email"),
    city: read("city"),
    space: read("space"),
  };

  // Honeypot: real visitors never see or fill this field.
  if (read("company")) return { status: "ok", message: "Thank you. We'll be in touch shortly." };

  const errors: EnquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!PHONE.test(values.phone)) errors.phone = "Enter a phone number we can call.";
  if (values.email && !EMAIL.test(values.email)) errors.email = "That email doesn't look right.";
  if (values.city.length < 2) errors.city = "Which city are you in?";

  if (Object.keys(errors).length) {
    return { status: "error", message: "A few details need another look.", errors, values };
  }

  // TODO: send to the CRM / email inbox. Until then the enquiry is only logged on the server.
  console.info("[enquiry]", { ...values, at: new Date().toISOString() });

  return {
    status: "ok",
    message: `Thank you, ${values.name.split(" ")[0]}. A design consultant will call you within one working day.`,
  };
}
