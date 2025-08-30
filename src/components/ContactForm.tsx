"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 flex flex-row flex-wrap items-center gap-[12px]"
    >
      <input
        name="firstName"
        placeholder="Förnamn"
        value={formData.firstName}
        onChange={handleChange}
        className="w-[calc(50%-6px)] border-b p-2"
        required
      />
      <input
        name="lastName"
        placeholder="Efternamn"
        value={formData.lastName}
        onChange={handleChange}
        className="w-[calc(50%-6px)] border-b p-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border-b p-2"
        required
      />
      <textarea
        name="message"
        placeholder="Meddelande"
        value={formData.message}
        onChange={handleChange}
        className="w-full border-b p-2"
        rows={4}
        required
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-black text-white px-4 py-2 my-0 border border-white"
      >
        {status === "loading" ? "Sending..." : "Send"}
      </button>
      {status === "success" && (
        <p className="text-green-600">Tack för ditt meddelande!</p>
      )}
      {status === "error" && (
        <p className="text-red-600">Något gick snett, pröva igen!</p>
      )}
    </form>
  );
}
