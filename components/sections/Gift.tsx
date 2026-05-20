"use client";

import { useState } from "react";
import { Copy, Check, MapPin, Phone } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="p-1.5 text-gold-500 hover:text-gold-700 transition-colors"
      title="Salin"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

export default function Gift() {
  return (
    <section className="py-20 bg-cream/80">
      <div className="max-w-lg mx-auto px-6 sm:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="section-tag">Hadiah Pernikahan</span>
          <h2 className="section-title">Amplop Digital</h2>
          <div className="divider" />
          <p className="font-body text-sm text-gray-500 mt-4 leading-relaxed">
            Doa restu Anda adalah hadiah terbaik bagi kami. Namun jika ingin
            memberikan tanda kasih, berikut informasinya.
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {weddingData.gifts.map((gift, i) => {
            const number =
              "accountNumber" in gift ? gift.accountNumber : gift.number;
            const label =
              gift.type === "bank" ? `Bank ${"bank" in gift ? gift.bank : ""}` : ("name" in gift ? gift.name : "");
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="card-border p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gold-600 mb-1">
                        {label}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="font-display text-xl text-gray-800 truncate">
                          {number}
                        </p>
                        {number && <CopyBtn text={number} />}
                      </div>
                      <p className="font-body text-xs text-gray-500 mt-1">
                        a.n. {gift.accountName}
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                      <span className="font-display text-xs text-primary-500">
                        {gift.type === "bank" ? "🏦" : "💳"}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}

          {/* Physical address */}
          <AnimatedSection delay={0.35}>
            <div className="card-border p-5">
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gold-600 mb-3">
                Kirim ke Alamat
              </p>
              <div className="flex items-start gap-2 mb-1.5">
                <MapPin size={13} className="text-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body text-sm font-medium text-gray-800">
                    {weddingData.address.label}
                  </p>
                  <p className="font-body text-xs text-gray-500 mt-0.5 leading-relaxed">
                    {weddingData.address.detail}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Phone size={12} className="text-gold-500 flex-shrink-0" />
                <p className="font-body text-xs text-primary-600">
                  {weddingData.address.contact}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
