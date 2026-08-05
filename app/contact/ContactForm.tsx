"use client";
import { FormEvent, useState } from "react";
import { ArrowIcon } from "../components/Icons";

type Status = "idle" | "sending" | "success" | "error";
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) });
      if (!response.ok) throw new Error("Submission failed");
      form.reset(); setStatus("success");
    } catch { setStatus("error"); }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="contact-form-heading"><span>Request a Demo</span><p>Fields marked * are required.</p></div>
    <label><span>Name *</span><input name="name" required maxLength={100} autoComplete="name" /></label>
    <label><span>Company / Farm</span><input name="company" maxLength={150} autoComplete="organization" /></label>
    <div className="contact-form-row"><label><span>Phone *</span><input name="phone" type="tel" required maxLength={50} autoComplete="tel" /></label><label><span>Email *</span><input name="email" type="email" required maxLength={254} autoComplete="email" /></label></div>
    <label><span>Message *</span><textarea name="message" rows={6} required maxLength={5000} /></label>
    <label className="contact-honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button className="button button-dark" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Request a Demo"} <ArrowIcon /></button>
    <div className="form-response" aria-live="polite">{status === "success" && <p className="form-success">Thank you. Your enquiry has been sent successfully.</p>}{status === "error" && <p className="form-error">Sorry, something went wrong. Please try again later.</p>}</div>
  </form>;
}
