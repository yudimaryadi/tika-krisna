"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Heart, UserCheck, UserX, HelpCircle } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { supabase, type RSVPRecord } from "@/lib/supabase";
import { useGuest } from "@/lib/guest-context";

const ATTENDANCE_OPTIONS = [
  { value: "hadir", label: "Hadir", icon: UserCheck },
  { value: "tidak_hadir", label: "Tidak Hadir", icon: UserX },
  { value: "mungkin", label: "Mungkin", icon: HelpCircle },
] as const;

const ATTENDANCE_COLORS = {
  hadir: "text-emerald-600",
  tidak_hadir: "text-red-400",
  mungkin: "text-amber-500",
};

export default function RSVP() {
  const guest = useGuest();
  const [form, setForm] = useState({
    name: "",
    attendance: "hadir" as RSVPRecord["attendance"],
    guest_count: 1,
    message: "",
  });

  // Auto-fill nama dari URL param saat pertama load
  useEffect(() => {
    if (guest) setForm((f) => ({ ...f, name: guest }));
  }, [guest]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [messages, setMessages] = useState<RSVPRecord[]>([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const { data } = await supabase
      .from("rsvp")
      .select("id, name, attendance, message, created_at")
      .order("created_at", { ascending: false })
      .limit(30);
    if (data) setMessages(data as RSVPRecord[]);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setStatus("loading");

    const { error } = await supabase.from("rsvp").insert([
      {
        name: form.name.trim(),
        attendance: form.attendance,
        guest_count: form.guest_count,
        message: form.message,
      },
    ]);

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ name: "", attendance: "hadir", guest_count: 1, message: "" });
      fetchMessages();
    }
  }

  return (
    <section id="rsvp" className="py-20 bg-petal/80">
      <div className="max-w-xl mx-auto px-6 sm:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="section-tag">Konfirmasi Kehadiran</span>
          <h2 className="section-title">RSVP & Ucapan</h2>
          <div className="divider" />
        </AnimatedSection>

        {/* Form */}
        <AnimatedSection delay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="font-body text-[10px] tracking-[0.3em] uppercase text-primary-600 block mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Masukkan nama Anda"
                className="w-full bg-transparent border-b border-gold-300 pb-2.5 font-body text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary-400 transition-colors"
              />
            </div>

            {/* Attendance */}
            <div>
              <label className="font-body text-[10px] tracking-[0.3em] uppercase text-primary-600 block mb-3">
                Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ATTENDANCE_OPTIONS.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm({ ...form, attendance: value })}
                    className={`flex flex-col items-center gap-1.5 py-3 border text-xs font-body tracking-wide transition-all duration-200 ${
                      form.attendance === value
                        ? "bg-primary-500 border-primary-500 text-white"
                        : "border-primary-200 text-gray-600 hover:border-primary-300 hover:bg-primary-50/50"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest count (only if attending) */}
            {form.attendance === "hadir" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="font-body text-[10px] tracking-[0.3em] uppercase text-primary-600 block mb-2">
                  Jumlah Tamu
                </label>
                <select
                  value={form.guest_count}
                  onChange={(e) =>
                    setForm({ ...form, guest_count: Number(e.target.value) })
                  }
                  className="w-full bg-transparent border-b border-gold-300 pb-2.5 font-body text-sm text-gray-800 focus:outline-none focus:border-primary-400 transition-colors"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} orang
                    </option>
                  ))}
                </select>
              </motion.div>
            )}

            {/* Message */}
            <div>
              <label className="font-body text-[10px] tracking-[0.3em] uppercase text-primary-600 block mb-2">
                Ucapan &amp; Doa
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tulis ucapan dan doa terbaik Anda untuk kami..."
                className="w-full bg-transparent border-b border-gold-300 pb-2.5 font-body text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 bg-primary-500 text-white font-body text-[11px] tracking-[0.3em] uppercase flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors disabled:opacity-60"
            >
              {status === "loading" ? (
                "Mengirim..."
              ) : (
                <>
                  <Send size={13} /> Kirim Ucapan
                </>
              )}
            </button>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center font-body text-sm text-emerald-600"
              >
                Terima kasih! Ucapan Anda telah terkirim. 🌸
              </motion.p>
            )}
            {status === "error" && (
              <p className="text-center font-body text-sm text-red-500">
                Gagal mengirim. Coba lagi atau hubungi kami.
              </p>
            )}
          </form>
        </AnimatedSection>

        {/* Messages list */}
        {messages.length > 0 && (
          <AnimatedSection delay={0.3} className="mt-12">
            <h3 className="font-display text-xl text-primary-600 text-center mb-6">
              Ucapan &amp; Doa
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/70 border border-gold-100 p-4"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="font-body text-sm font-medium text-gray-800">
                      {msg.name}
                    </p>
                    <div className="flex items-center gap-1">
                      <Heart
                        size={10}
                        className={
                          ATTENDANCE_COLORS[msg.attendance] || "text-gray-400"
                        }
                        fill="currentColor"
                      />
                      <span
                        className={`font-body text-[10px] ${
                          ATTENDANCE_COLORS[msg.attendance] || "text-gray-400"
                        }`}
                      >
                        {msg.attendance === "hadir"
                          ? "Hadir"
                          : msg.attendance === "tidak_hadir"
                          ? "Tidak Hadir"
                          : "Mungkin"}
                      </span>
                    </div>
                  </div>
                  {msg.message && (
                    <p className="font-body text-xs text-gray-600 leading-relaxed">
                      {msg.message}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
