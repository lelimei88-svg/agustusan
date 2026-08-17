import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Flag, Trophy, Star, CircleDot, Droplets, Utensils, Eye, ShieldAlert, GlassWater, Cookie, Crown, Target, Banana } from 'lucide-react';
import { OFFICIAL_LOCATION } from '../data/competitionsData';

export const ScheduleSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1');

  const day1AnakEvents = [
    {
      time: '08:30 - 09:15 WIB',
      title: 'Lomba Balap Kelereng',
      location: OFFICIAL_LOCATION,
      category: 'Anak-anak (Individu)',
      icon: CircleDot,
      desc: 'Uji keseimbangan dan ketenangan membawa kelereng di atas sendok.',
    },
    {
      time: '09:15 - 10:00 WIB',
      title: 'Lomba Tusuk Air',
      location: OFFICIAL_LOCATION,
      category: 'Anak-anak (Individu)',
      icon: Droplets,
      desc: 'Memecahkan kantong air gantung dengan mata tertutup.',
    },
    {
      time: '10:00 - 10:45 WIB',
      title: 'Lomba Makan Kerupuk',
      location: OFFICIAL_LOCATION,
      category: 'Anak-anak (Individu)',
      icon: Utensils,
      desc: 'Lomba legendaris menghabiskan kerupuk gantung tanpa bantuan tangan.',
    },
    {
      time: '10:45 - 11:30 WIB',
      title: 'Masukkan Paku dalam Botol Pakai Spion',
      location: OFFICIAL_LOCATION,
      category: 'Anak-anak (Individu)',
      icon: Eye,
      desc: 'Tantangan konsentrasi memasukkan paku dengan panduan kaca spion.',
    },
    {
      time: '11:30 - 12:15 WIB',
      title: 'Balap Karung Pake Helm',
      location: OFFICIAL_LOCATION,
      category: 'Anak-anak (Individu)',
      icon: ShieldAlert,
      desc: 'Aksi lincah melompat dalam karung mengenakan helm SNI aman.',
    },
    {
      time: '13:00 - 13:45 WIB',
      title: 'Lomba Sedotan dalam Botol',
      location: OFFICIAL_LOCATION,
      category: 'Anak-anak (Individu)',
      icon: GlassWater,
      desc: 'Ketangkasan memindahkan sedotan dengan bibir ke dalam botol.',
    },
    {
      time: '13:45 - 14:30 WIB',
      title: 'Lomba Makan Biskuit',
      location: OFFICIAL_LOCATION,
      category: 'Anak-anak (Individu)',
      icon: Cookie,
      desc: 'Menggerakkan otot wajah menggeser biskuit dari dahi ke mulut.',
    },
  ];

  const day2DewasaEvents = [
    {
      time: '08:30 - 09:30 WIB',
      title: 'Nyunggi Tampah Mengepit Balon',
      location: OFFICIAL_LOCATION,
      category: 'Dewasa / Ibu-Ibu (Individu)',
      icon: Crown,
      desc: 'Keseimbangan menyunggi tampah bambu dan mengepit balon di paha.',
    },
    {
      time: '09:30 - 10:30 WIB',
      title: 'Ambil Karet dalam Tepung',
      location: OFFICIAL_LOCATION,
      category: 'Dewasa / Ibu-Ibu (Individu)',
      icon: Target,
      desc: 'Mencari karet gelang dalam baskom tepung putih menggunakan sedotan.',
    },
    {
      time: '10:30 - 11:30 WIB',
      title: 'Lomba Makan Pisang',
      location: OFFICIAL_LOCATION,
      category: 'Dewasa / Ibu-Ibu (Individu)',
      icon: Banana,
      desc: 'Keseruan makan pisang dengan mata tertutup penuh kejutan.',
    },
    {
      time: '13:30 - 14:45 WIB',
      title: 'Lomba Tubruk Bangku',
      location: OFFICIAL_LOCATION,
      category: 'Dewasa / Ibu-Ibu (Individu)',
      icon: Trophy,
      desc: 'Berjoget ria keliling bangku diiringi lagu dan berebut kursi juara.',
    },
    {
      time: '14:45 - 15:45 WIB',
      title: 'Sedotan dalam Botol',
      location: OFFICIAL_LOCATION,
      category: 'Dewasa / Ibu-Ibu (Individu)',
      icon: GlassWater,
      desc: 'Konsentrasi tinggi menjepit sedotan di bibir menuju botol kaca.',
    },
    {
      time: '15:45 - 17:00 WIB',
      title: 'Lomba Makan Biskuit & Penyerahan Hadiah',
      location: OFFICIAL_LOCATION,
      category: 'Dewasa / Ibu-Ibu (Individu)',
      icon: Cookie,
      desc: 'Ekspresi lucu menggeser biskuit dahi dan penyerahan piala pemenang.',
    },
  ];

  const currentEvents = activeDay === 'day1' ? day1AnakEvents : day2DewasaEvents;

  return (
    <section id="jadwal-acara" className="py-16 md:py-24 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Rangkaian Perlombaan</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-stone-900 tracking-tight">
            Jadwal Lengkap Lomba Agustusan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            Lokasi resmi: <strong className="text-stone-900">{OFFICIAL_LOCATION}</strong>. Cukup 1 kali mendaftar untuk mengikuti seluruh cabang lomba dalam kategori Anda.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-2">
            <button
              onClick={() => setActiveDay('day1')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeDay === 'day1'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <span>Minggu, 17 Agustus 2026</span>
              <span className="text-[10px] opacity-90 font-medium">(Kategori Anak-Anak)</span>
            </button>

            <button
              onClick={() => setActiveDay('day2')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeDay === 'day2'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <span>Senin, 18 Agustus 2026</span>
              <span className="text-[10px] opacity-90 font-medium">(Kategori Dewasa / Ibu-Ibu)</span>
            </button>
          </div>
        </div>

        {/* Timeline Events List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {currentEvents.map((evt, idx) => {
            const Icon = evt.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-red-300 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 border border-red-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-bold">
                        {evt.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-stone-500">
                        <MapPin className="w-3 h-3 text-red-500" />
                        {evt.location}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-stone-900">
                      {evt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                      {evt.desc}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right flex items-center sm:flex-col gap-2 sm:gap-0 bg-red-50/60 sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-lg sm:rounded-none w-full sm:w-auto">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-700">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span>{evt.time}</span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-medium hidden sm:inline-block">Waktu Indonesia Barat</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
