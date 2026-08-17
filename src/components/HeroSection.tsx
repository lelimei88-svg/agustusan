import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowDown, Trophy, Award, ShieldCheck, Flame, MapPin } from 'lucide-react';
import heroIllustration from '../assets/images/lomba_agustusan_hero_1786836201906.jpg';
import { OFFICIAL_LOCATION } from '../data/competitionsData';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
  totalCompetitions: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onExploreClick,
  totalCompetitions,
}) => {
  // Countdown Timer to 17 August 2026
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-08-17T08:00:00+07:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-red-50/70 via-white to-stone-50 border-b border-stone-200/70"
    >
      {/* Decorative Red & White Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-red-400/20 rounded-full blur-3xl" />
        <div className="absolute top-12 right-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Screen Hero Layout: Text on Left, Illustration on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Invitation, Location, CTAs, Countdown */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Patriotic Banner Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/90 border border-red-200 text-red-800 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span>🇮🇩 HUT RI ke-81 • 17-18 Agustus 2026</span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight leading-[1.15]">
              Pesta Rakyat <span className="text-red-600 underline decoration-red-300 decoration-wavy decoration-2">17 Agustus</span>
              <br />
              <span className="text-stone-800">Semarak Kemerdekaan RI ke-81</span>
            </h1>

            {/* Fresh Motivating Invitation & Location */}
            <div className="p-4 bg-white/95 rounded-2xl border border-red-200 shadow-sm space-y-2">
              <p className="text-xs sm:text-sm font-medium text-stone-800 leading-relaxed">
                "Kobarkan semangat juang kemerdekaan dengan tawa, kebersamaan, dan sportivitas warga. Ayo daftarkan diri dan putra-putri tercinta sekarang juga dalam pesta kemerdekaan penuh berkah dan hadiah!"
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-2 text-xs font-bold text-red-700">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                  <span>{OFFICIAL_LOCATION}</span>
                </span>
                <span>•</span>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
                  100% Gratis & Kuota Bebas
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                id="hero-cta-daftar"
                onClick={onRegisterClick}
                className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Flame className="w-5 h-5 text-amber-300 fill-amber-300" />
                <span>Daftar Lomba Sekarang</span>
              </button>

              <button
                id="hero-cta-jelajah"
                onClick={onExploreClick}
                className="px-5 py-3.5 bg-white hover:bg-stone-100 text-stone-800 font-bold text-sm sm:text-base rounded-xl border border-stone-300 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lihat Kategori Lomba</span>
                <ArrowDown className="w-4 h-4 text-red-600" />
              </button>
            </div>

            {/* Countdown Clock Box */}
            <div className="pt-2">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-red-100 shadow-md">
                <div className="text-[11px] uppercase font-bold text-stone-500 tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-600" />
                  <span>Menghitung Hari Menuju Pesta Kemerdekaan</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-red-50/80 px-2 py-1.5 rounded-xl border border-red-100/80">
                    <div className="font-heading font-black text-lg sm:text-2xl text-red-700">
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-bold text-stone-500">HARI</div>
                  </div>
                  <div className="bg-red-50/80 px-2 py-1.5 rounded-xl border border-red-100/80">
                    <div className="font-heading font-black text-lg sm:text-2xl text-red-700">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-bold text-stone-500">JAM</div>
                  </div>
                  <div className="bg-red-50/80 px-2 py-1.5 rounded-xl border border-red-100/80">
                    <div className="font-heading font-black text-lg sm:text-2xl text-red-700">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-bold text-stone-500">MENIT</div>
                  </div>
                  <div className="bg-red-50/80 px-2 py-1.5 rounded-xl border border-red-100/80">
                    <div className="font-heading font-black text-lg sm:text-2xl text-red-700 animate-pulse">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-bold text-stone-500">DETIK</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Illustration + Highlights Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-red-200/90 shadow-xl shadow-red-900/10 group bg-stone-100">
              <img
                src={heroIllustration}
                alt="Semarak Perlombaan 17 Agustus HUT RI ke-81"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover object-center transform group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4 sm:p-5 text-left">
                <div className="text-white space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/90 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>Aneka Lomba Tradisional</span>
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                    Balap Karung Helm, Kerupuk, Paku Botol, & Banyak Lagi!
                  </h3>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-stone-500 font-medium">Total Hadiah</p>
                  <p className="font-heading font-bold text-xs sm:text-sm text-stone-900">Jutaan Rupiah</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-stone-500 font-medium">Pilihan Lomba</p>
                  <p className="font-heading font-bold text-xs sm:text-sm text-stone-900">{totalCompetitions} Cabang</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
