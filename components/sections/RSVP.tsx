"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useGuest } from "@/lib/guest-context";

type RSVPRecord = {
  id: string;
  name: string;
  attendance: "hadir" | "tidak_hadir" | "mungkin";
  guest_count: number;
  message: string;
  created_at: string;
};

const ATTENDANCE_OPTIONS = [
  { value: "hadir", label: "Hadir" },
  { value: "tidak_hadir", label: "Tidak Hadir" },
  { value: "mungkin", label: "Mungkin" },
] as const;

export default function RSVP() {
  const guest = useGuest();
  const [form, setForm] = useState({
    name: "",
    attendance: "hadir" as RSVPRecord["attendance"],
    guest_count: 1,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [messages, setMessages] = useState<RSVPRecord[]>([]);

  useEffect(() => {
    if (guest) setForm((f) => ({ ...f, name: guest }));
  }, [guest]);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/rsvp");
      const json = await res.json();
      if (json.data) setMessages(json.data);
    } catch {
      // silent fail
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("failed");

      setStatus("success");
      setForm({ name: "", attendance: "hadir", guest_count: 1, message: "" });
      fetchMessages();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Uses global video background */}
      <div className="absolute inset-0 bg-black/55" />

      {/* RSVP + UCAPAN overlapping title */}
      <div className="relative z-10 text-center mb-8 mt-16">
        <div className="relative inline-block">
          <p
            className="font-display italic font-bold text-white/10 leading-none select-none"
            style={{ fontSize: "clamp(64px, 22vw, 110px)" }}
          >
            RSVP
          </p>
          <p
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display italic font-semibold text-white whitespace-nowrap"
            style={{ fontSize: "clamp(28px, 9vw, 44px)" }}
          >
            UCAPAN
          </p>
        </div>
      </div>

      <AnimatedSection delay={0.1} className="relative z-10 max-w-sm mx-auto w-full px-6 pb-16">
        <p className="font-body text-xs text-white/60 text-center mb-8 tracking-wide">
          Please, fill confirmation of attendance below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="w-full bg-white/10 border border-white/30 px-4 py-3 font-body text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
          />

          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Your wish"
            className="w-full bg-white/10 border border-white/30 px-4 py-3 font-body text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors resize-none"
          />

          <select
            value={form.attendance}
            onChange={(e) => setForm({ ...form, attendance: e.target.value as RSVPRecord["attendance"] })}
            className="w-full bg-white/10 border border-white/30 px-4 py-3 font-body text-sm text-white focus:outline-none focus:border-white/60 transition-colors appearance-none"
          >
            {ATTENDANCE_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value} className="bg-[#1a1514] text-white">
                {label}
              </option>
            ))}
          </select>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center gap-2 border border-white/50 text-white font-body text-[10px] tracking-[0.3em] uppercase px-10 py-3.5 hover:bg-white/10 transition-colors disabled:opacity-60"
            >
              <Send size={12} />
              {status === "loading" ? "Mengirim..." : "Submit"}
            </button>
          </div>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center font-body text-sm text-white/80"
            >
              Terima kasih! Ucapan Anda telah terkirim.
            </motion.p>
          )}
          {status === "error" && (
            <p className="text-center font-body text-sm text-red-400">
              Gagal mengirim. Coba lagi atau hubungi kami.
            </p>
          )}
        </form>
      </AnimatedSection>

      {/* Messages list */}
      {messages.length > 0 && (
        <div className="relative z-10 px-6 py-8 max-w-sm mx-auto">
          <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
            {messages.map((msg) => (
              <div key={msg.id} className="border-b border-white/10 pb-4">
                <p className="font-body text-sm font-medium text-white">{msg.name}</p>
                <p className="font-body text-[10px] text-white/40 mt-0.5">
                  {msg.attendance === "hadir"
                    ? "Hadir"
                    : msg.attendance === "tidak_hadir"
                    ? "Tidak Hadir"
                    : "Mungkin"}
                  {msg.created_at &&
                    ` · ${new Date(msg.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                    })}`}
                </p>
                {msg.message && (
                  <p className="font-body text-xs text-white/60 mt-1.5 leading-relaxed">
                    {msg.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
