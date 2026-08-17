import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Gift, Clock, MapPin, Sparkles } from 'lucide-react';
import { OFFICIAL_LOCATION } from '../data/competitionsData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Apakah pendaftaran lomba 17 Agustus ini dipungut biaya?',
      answer: 'Sama sekali TIDAK DIPUNGUT BIAYA (100% Gratis). Seluruh rangkaian perlombaan ini diselenggarakan oleh Panitia HUT RI ke-81 untuk memeriahkan hari kemerdekaan bersama warga.',
      icon: ShieldCheck,
    },
    {
      question: 'Apakah cukup 1 kali pendaftaran untuk mengikuti semua lomba?',
      answer: 'Ya, betul! Cukup 1 kali melakukan pendaftaran sesuai kategori usia Anda (Anak-Anak untuk jadwal 17 Agustus 2026 atau Dewasa/Ibu-Ibu untuk jadwal 18 Agustus 2026), Anda otomatis terdaftar dan dapat mengikuti seluruh cabang lomba dalam kategori tersebut.',
      icon: Clock,
    },
    {
      question: 'Di mana lokasi pelaksanaan seluruh perlombaan?',
      answer: `Perlombaan dilaksanakan di arena utama: ${OFFICIAL_LOCATION}. Pastikan hadir tepat waktu sesuai jadwal masing-masing kategori.`,
      icon: MapPin,
    },
    {
      question: 'Apa saja yang perlu dibawa saat hari H perlombaan?',
      answer: 'Peserta cukup hadir 15 menit sebelum jadwal lomba dimulai dan menunjukkan Bukti Pendaftaran Digital (E-Tiket) yang telah diunduh atau disimpan di handphone kepada panitia registrasi.',
      icon: Gift,
    },
    {
      question: 'Kapan dan bagaimana pembagian hadiah bagi para juara?',
      answer: 'Pengumuman pemenang dan penyerahan piala juara, medali, serta uang tunai dan hadiah menarik akan dilaksanakan langsung setelah pertandingan babak grand final selesai.',
      icon: Sparkles,
    },
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-info" className="py-16 md:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pusat Informasi</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-stone-900 tracking-tight">
            Pertanyaan Umum (FAQ) & Ketentuan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            Hal-hal penting seputar teknis pendaftaran, jadwal acara, dan lokasi pelaksanaan lomba.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const Icon = faq.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen ? 'border-red-300 bg-red-50/20 shadow-md' : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isOpen ? 'bg-red-600 text-white' : 'bg-stone-100 text-stone-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-heading font-bold text-sm sm:text-base text-stone-900">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-stone-400">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-red-600" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-red-100/60 pl-16">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
