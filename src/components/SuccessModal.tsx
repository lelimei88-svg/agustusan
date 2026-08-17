import React, { useEffect, useState, useMemo } from 'react';
import { RegisteredTicket } from '../types';
import { GarudaIcon } from './GarudaIcon';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Copy,
  Check,
  Printer,
  Share2,
  X,
  QrCode,
  Sparkles,
  Ticket,
  CheckCircle,
  Calendar,
  Layers,
  User,
  Info
} from 'lucide-react';
import { INITIAL_COMPETITIONS, OFFICIAL_LOCATION } from '../data/competitionsData';
import { generateFairPlayGroups } from '../utils/fairPlayGrouping';

interface SuccessModalProps {
  ticket: RegisteredTicket | null;
  onClose: () => void;
  onRegisterAnother: () => void;
  allTickets?: RegisteredTicket[];
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  ticket,
  onClose,
  onRegisterAnother,
  allTickets = [],
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (ticket) {
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#dc2626', '#ffffff', '#ef4444', '#b91c1c', '#fecaca'],
        });
      } catch (e) {
        console.log('Confetti trigger error', e);
      }
    }
  }, [ticket]);

  // Compute or find the participant's assigned group
  const assignedGroupInfo = useMemo(() => {
    if (!ticket) return 'Sesi 1 (Grup A)';
    if (ticket.assignedGroupId) return ticket.assignedGroupId;

    try {
      const ticketsPool = allTickets.length > 0 ? allTickets : [ticket];
      const groupsByComp = generateFairPlayGroups(ticketsPool, INITIAL_COMPETITIONS);
      const compGroups = groupsByComp[ticket.competition.id] || [];

      for (const grp of compGroups) {
        const found = grp.participants.find((p) => p.ticketId === ticket.registrationId);
        if (found) {
          return grp.groupName;
        }
      }
    } catch (err) {
      console.log('Group computation note:', err);
    }

    const age = ticket.formData.age || 8;
    return `Sesi A (Usia ${age}-${age + 1} Thn)`;
  }, [ticket, allTickets]);

  if (!ticket) return null;

  const isAnak = ticket.formData.ageCategory === 'Anak-anak';
  const categoryTitle = isAnak ? 'Kategori Anak-Anak' : 'Kategori Dewasa / Ibu-Ibu';
  const eventScheduleDate = isAnak ? '17 Agustus 2026' : '18 Agustus 2026';

  const categoryCompetitionsList = isAnak
    ? [
        'Balap Kelereng',
        'Tusuk Air',
        'Makan Kerupuk',
        'Masukkan Paku dalam Botol Pakai Spion',
        'Balap Karung Pake Helm',
        'Sedotan dalam Botol',
        'Makan Biskuit',
      ]
    : [
        'Nyunggi Tampah Mengepit Balon',
        'Ambil Karet dalam Tepung',
        'Makan Pisang',
        'Tubruk Bangku',
        'Sedotan dalam Botol',
        'Makan Biskuit',
      ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(ticket.registrationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo Panitia! Saya telah mendaftar Lomba 17 Agustus:\n\n*Nama:* ${ticket.formData.fullName}\n*Kode Pendaftaran:* ${ticket.registrationId}\n*Kategori:* ${categoryTitle}\n*Tanggal Lahir:* ${ticket.formData.birthDate || '-'}\n*Grup/Sesi:* ${assignedGroupInfo}\n*Status:* Berlaku untuk seluruh cabang lomba ${categoryTitle}\n\nTerima kasih!`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        id="success-ticket-modal"
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header Ribbon with Clean Minimalist Styling */}
        <div className="bg-gradient-to-r from-red-600 via-red-600 to-red-700 px-6 py-5 text-white text-center relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-13 h-13 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mx-auto mb-2.5 shadow-md ring-4 ring-white/20">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>

          <h2 className="font-heading font-black text-xl sm:text-2xl text-white">
            Pendaftaran Berhasil!
          </h2>
          <p className="text-xs text-red-100 mt-0.5">
            Berikut bukti pendaftaran resmi dan tiket digital peserta Anda.
          </p>
        </div>

        {/* The Digital Ticket Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* Printable Ticket Card Container */}
          <div
            id="printable-ticket-card"
            className="relative bg-stone-50/80 rounded-2xl p-5 border border-stone-300 shadow-sm space-y-4 text-stone-900"
          >
            {/* Cutout circles on sides for clean ticket look */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-r border-stone-300" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-l border-stone-300" />

            {/* Header: Garuda Pancasila Icon + Clean Title */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <GarudaIcon className="w-7 h-7 text-red-600" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-base text-stone-900">
                    KARTU BUKTI PENDAFTARAN
                  </h3>
                  <p className="text-xs font-semibold text-red-700">{categoryTitle}</p>
                </div>
              </div>

              {/* Status Valid badge */}
              <div className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold rounded-lg flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Terverifikasi</span>
              </div>
            </div>

            {/* Registration Code Badge */}
            <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  KODE REGISTRASI
                </p>
                <p className="font-mono font-black text-lg text-red-700 tracking-wider">
                  {ticket.registrationId}
                </p>
              </div>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-stone-200"
                title="Salin Kode"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>

            {/* Participant Detailed Info */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-stone-200">
              <div>
                <span className="text-stone-400 block text-[11px] font-medium">Nama Lengkap:</span>
                <span className="font-bold text-stone-900 text-sm">{ticket.formData.fullName}</span>
              </div>

              <div>
                <span className="text-stone-400 block text-[11px] font-medium">Tanggal Lahir:</span>
                <span className="font-bold text-stone-900">
                  {ticket.formData.birthDate || '-'} ({ticket.formData.age || '-'} Tahun)
                </span>
              </div>

              <div>
                <span className="text-stone-400 block text-[11px] font-medium">Kategori Lomba:</span>
                <span className="font-bold text-stone-900">{categoryTitle}</span>
              </div>

              <div>
                <span className="text-stone-400 block text-[11px] font-medium">Nomor Grup / Sesi:</span>
                <span className="font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 inline-block">
                  {assignedGroupInfo}
                </span>
              </div>
            </div>

            {/* Clear All-Competitions Participation Confirmation */}
            <div className="p-3 bg-red-50/70 rounded-xl border border-red-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-red-800 text-xs font-bold">
                <Info className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>Berlaku untuk Seluruh Cabang Lomba {categoryTitle}</span>
              </div>
              <p className="text-[11px] text-stone-700 leading-relaxed">
                Tiket ini resmi dan otomatis mengikutsertakan peserta ke seluruh cabang lomba di bawah ini tanpa perlu mendaftar ulang:
              </p>
              <div className="pt-1 flex flex-wrap gap-1.5">
                {categoryCompetitionsList.map((compName, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-red-200 text-stone-800 text-[10px] font-semibold"
                  >
                    <Check className="w-2.5 h-2.5 text-emerald-600" />
                    <span>{compName}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* QR Code and Date Footer */}
            <div className="pt-2 border-t border-dashed border-stone-300 flex items-center justify-between text-[11px] text-stone-500">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-stone-700" />
                <span className="font-medium">Tiket Resmi Digital</span>
              </div>
              <span className="font-mono text-[10px] text-stone-400">{ticket.registeredAt}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handlePrint}
              className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-red-600/20 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Unduh Bukti Pendaftaran (Cetak / Simpan PDF)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Kirim WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onRegisterAnother();
                }}
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-stone-200 cursor-pointer"
              >
                <Ticket className="w-3.5 h-3.5 text-red-600" />
                <span>Daftar Peserta Lain</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
