import React, { useState, useEffect } from 'react';
import { Flag, Menu, X, Ticket, MessageCircle, Calendar, Shield } from 'lucide-react';

interface NavbarProps {
  onOpenTickets: () => void;
  ticketCount: number;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTickets, ticketCount, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-red-100'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-stone-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          id="nav-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
            <Flag className="w-5 h-5 fill-white text-white animate-wave" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-stone-900">
                HUT RI <span className="text-red-600 font-black">#81</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-bold rounded-full bg-red-100 text-red-700 border border-red-200">
                17 Agustus 2026
              </span>
            </div>
            <p className="text-[11px] font-medium text-stone-500 tracking-wide">
              Pesta Rakyat & Semarak Kemerdekaan
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-stone-700">
          <button
            id="nav-link-lomba"
            onClick={() => scrollToSection('kategori-lomba')}
            className="hover:text-red-600 transition-colors cursor-pointer py-1"
          >
            Kategori Lomba
          </button>
          <button
            id="nav-link-jadwal"
            onClick={() => scrollToSection('jadwal-acara')}
            className="hover:text-red-600 transition-colors cursor-pointer py-1 flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-stone-400" />
            Jadwal Acara
          </button>
          <button
            id="nav-link-faq"
            onClick={() => scrollToSection('faq-info')}
            className="hover:text-red-600 transition-colors cursor-pointer py-1"
          >
            Syarat & Info
          </button>
          <button
            id="nav-link-admin"
            onClick={onOpenAdmin}
            className="hover:text-red-700 text-stone-700 transition-colors cursor-pointer py-1 flex items-center gap-1.5 font-bold"
            title="Buka Panel Panitia / Admin"
          >
            <Shield className="w-4 h-4 text-red-600" />
            <span>Panel Admin</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {ticketCount > 0 && (
            <button
              id="nav-my-tickets-btn"
              onClick={onOpenTickets}
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors border border-stone-200"
            >
              <Ticket className="w-4 h-4 text-red-600" />
              <span>Tiket Saya</span>
              <span className="w-5 h-5 flex items-center justify-center bg-red-600 text-white rounded-full text-[10px] font-black">
                {ticketCount}
              </span>
            </button>
          )}

          <button
            id="nav-cta-register"
            onClick={() => scrollToSection('form-pendaftaran')}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-bold rounded-xl shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/35 transition-all transform active:scale-95"
          >
            <span>Daftar Sekarang</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenAdmin}
            className="p-2 text-stone-700 hover:text-red-600 rounded-lg border border-stone-200"
            aria-label="Panel Admin"
            title="Panel Admin"
          >
            <Shield className="w-4 h-4 text-red-600" />
          </button>

          {ticketCount > 0 && (
            <button
              id="mobile-ticket-badge-btn"
              onClick={onOpenTickets}
              className="relative p-2 text-stone-700 hover:text-red-600 rounded-lg border border-stone-200"
              aria-label="Tiket Saya"
            >
              <Ticket className="w-5 h-5 text-red-600" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center bg-red-600 text-white rounded-full text-[9px] font-black">
                {ticketCount}
              </span>
            </button>
          )}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <button
            onClick={() => scrollToSection('kategori-lomba')}
            className="w-full text-left px-3 py-2 text-stone-800 hover:bg-red-50 hover:text-red-600 rounded-lg font-semibold text-sm transition-colors"
          >
            Kategori Lomba
          </button>
          <button
            onClick={() => scrollToSection('jadwal-acara')}
            className="w-full text-left px-3 py-2 text-stone-800 hover:bg-red-50 hover:text-red-600 rounded-lg font-semibold text-sm transition-colors"
          >
            Jadwal Acara
          </button>
          <button
            onClick={() => scrollToSection('faq-info')}
            className="w-full text-left px-3 py-2 text-stone-800 hover:bg-red-50 hover:text-red-600 rounded-lg font-semibold text-sm transition-colors"
          >
            Syarat & Ketentuan
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenAdmin();
            }}
            className="w-full text-left px-3 py-2 text-stone-800 bg-red-50 text-red-700 rounded-lg font-bold text-sm flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-red-600" />
            <span>Panel Admin (Panitia)</span>
          </button>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            {ticketCount > 0 && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenTickets();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-100 text-stone-800 font-bold rounded-xl text-sm border border-stone-200"
              >
                <Ticket className="w-4 h-4 text-red-600" />
                Lihat E-Tiket Saya ({ticketCount})
              </button>
            )}
            <button
              onClick={() => scrollToSection('form-pendaftaran')}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-md shadow-red-600/30 text-center"
            >
              Daftar Lomba Sekarang 🇮🇩
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
