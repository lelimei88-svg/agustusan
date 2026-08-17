import React from 'react';
import { Flag, Mail, MapPin, ArrowUp, Sparkles, MessageCircle } from 'lucide-react';
import { OFFICIAL_LOCATION } from '../data/competitionsData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="kontak-panitia" className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30">
                <Flag className="w-5 h-5 fill-white" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg text-white">
                  HUT RI <span className="text-red-500 font-black">#81</span>
                </span>
                <p className="text-[11px] text-stone-400 font-medium">
                  Semarak Kemerdekaan Indonesia 2026
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Website resmi pendaftaran aneka lomba peringatan Hari Ulang Tahun ke-81 Kemerdekaan Republik Indonesia. Bersatu, bergotong-royong, dan junjung tinggi persaudaraan warga.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 text-xs text-red-400 font-bold border border-stone-700">
              <span>🇮🇩 Nusantara Baru, Indonesia Maju</span>
            </div>
          </div>

          {/* Col 2: Lokasi & Identitas Arena Lomba */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Lokasi & Arena Utama</span>
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700/80 text-stone-300 space-y-1.5">
                <p className="font-bold text-white text-sm">
                  {OFFICIAL_LOCATION}
                </p>
                <p className="text-[11px] text-stone-400">
                  Arena Perlombaan Kemerdekaan HUT RI ke-81
                </p>
              </div>
              <div className="flex items-center gap-2 text-stone-300 pt-1">
                <Mail className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>panitiahutri81@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Col 3: Tautan Navigasi */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#kategori-lomba" className="hover:text-red-400 transition-colors">
                  • Kategori & Jadwal Lomba
                </a>
              </li>
              <li>
                <a href="#form-pendaftaran" className="hover:text-red-400 transition-colors">
                  • Formulir Pendaftaran Online
                </a>
              </li>
              <li>
                <a href="#jadwal-acara" className="hover:text-red-400 transition-colors">
                  • Jadwal Acara & Pesta Kemerdekaan
                </a>
              </li>
              <li>
                <a href="#faq-info" className="hover:text-red-400 transition-colors">
                  • Pertanyaan Umum (FAQ)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="flex items-center gap-1">
            © 2026 Panitia Pelaksana Peringatan HUT RI ke-81. {OFFICIAL_LOCATION}.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
