"use client";

import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { MessageSquare, Layers, Hammer, Truck } from "lucide-react";

export default function CustomBatikSection() {
  const { t } = useLanguage();

  const steps = [
    { icon: MessageSquare, id: "Design Consultation", en: "Design Consultation", id_desc: "Ceritakan ide motif, warna, dan fungsi kain yang Anda inginkan.", en_desc: "Tell us your motif idea, color preferences, and intended use." },
    { icon: Layers, id: "Pilih Kain", en: "Choose Fabric", id_desc: "Pilih jenis kain: mori, katun, sutra, atau sifon sesuai kebutuhan.", en_desc: "Choose cloth type: mori, cotton, silk, or chiffon as needed." },
    { icon: Hammer, id: "Produksi", en: "Production", id_desc: "Pengrajin kami membuat batik sesuai desain Anda dengan penuh dedikasi.", en_desc: "Our artisans craft the batik according to your design with full dedication." },
    { icon: Truck, id: "Pengiriman", en: "Delivery", id_desc: "Batik Anda dikemas cantik dan dikirim ke seluruh dunia.", en_desc: "Your batik is beautifully packaged and shipped worldwide." },
  ];

  const waNumber = "6281234567890";
  const waMessage = encodeURIComponent("Halo! Saya ingin konsultasi pesanan batik custom. Bisa bantu?");

  return (
    <section className="section-padding bg-[#EDE8E0] dark:bg-[#241917]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left text */}
          <AnimateOnScroll direction="left">
            <span className="font-body text-xs tracking-[0.3em] text-[#C8A96A] uppercase">
              {t.custom.sectionLabel}
            </span>
            <h2
              className="font-heading text-[#4E342E] dark:text-[#F8F5F0] mt-3 mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 600 }}
            >
              {t.custom.title}
            </h2>
            <div className="divider-gold mb-6" />
            <p className="font-body text-[#6B6B6B] dark:text-[#C4B5A8] leading-relaxed mb-8">
              {t.custom.subtitle}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                "Motif eksklusif", "Warna custom",
                "Berbagai ukuran", "Pengiriman global",
                "Natural/sintetis dye", "Konsultasi gratis",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]" />
                  <span className="font-body text-sm text-[#2B2B2B] dark:text-[#F8F5F0]">{f}</span>
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/${waNumber}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#4E342E] text-[#F8F5F0] font-body font-semibold text-sm hover:bg-[#3E2723] hover:scale-105 transition-all duration-300 shadow-warm"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              {t.custom.ctaStart}
            </a>
          </AnimateOnScroll>

          {/* Right - Steps */}
          <AnimateOnScroll direction="right">
            <div className="relative space-y-4">
              {/* Vertical line */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-[#C8A96A]/50 via-[#C8A96A] to-[#C8A96A]/50" />

              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="relative flex gap-5 glass rounded-2xl p-5 hover:shadow-warm transition-shadow"
                    style={{ animation: `fadeUp 0.5s ease-out ${idx * 100}ms both` }}
                  >
                    {/* Dot on line */}
                    <div className="relative z-10 shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-[#4E342E] dark:bg-[#2C1A17] flex items-center justify-center shadow-warm">
                        <Icon size={20} className="text-[#C8A96A]" />
                      </div>
                    </div>
                    <div>
                      <div className="font-body text-xs text-[#C8A96A] font-semibold tracking-widest uppercase mb-1">
                        Step {idx + 1}
                      </div>
                      <h4 className="font-heading text-lg font-semibold text-[#4E342E] dark:text-[#F8F5F0] mb-1">
                        {step.id}
                      </h4>
                      <p className="font-body text-sm text-[#6B6B6B] dark:text-[#C4B5A8] leading-relaxed">
                        {step.id_desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
