import React from 'react';
import { RegisteredTicket } from '../types';
import { GarudaIcon } from './GarudaIcon';
import { X, Ticket, Calendar, Trash2, ArrowRight, Check } from 'lucide-react';

interface MyTicketsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: RegisteredTicket[];
  onSelectTicket: (ticket: RegisteredTicket) => void;
  onDeleteTicket: (registrationId: string) => void;
  onRegisterNew: () => void;
}

export const MyTicketsDrawer: React.FC<MyTicketsDrawerProps> = ({
  isOpen,
  onClose,
  tickets,
  onSelectTicket,
  onDeleteTicket,
  onRegisterNew,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-stone-200">
        {/* Drawer Header */}
        <div className="p-5 bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <GarudaIcon className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg">Tiket Pendaftaran Saya</h3>
              <p className="text-xs text-red-100">{tickets.length} Peserta Terdaftar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tickets List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {tickets.length > 0 ? (
            tickets.map((t) => {
              const isAnak = t.formData.ageCategory === 'Anak-anak';
              const categoryTitle = isAnak ? 'Kategori Anak-Anak' : 'Kategori Dewasa / Ibu-Ibu';

              return (
                <div
                  key={t.registrationId}
                  className="bg-stone-50 hover:bg-stone-100/80 rounded-2xl p-4 border border-stone-200 transition-all space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-center flex-shrink-0">
                        <GarudaIcon className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-red-700">
                          {t.registrationId}
                        </span>
                        <h4 className="font-heading font-bold text-sm text-stone-900 line-clamp-1">
                          {t.formData.fullName}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteTicket(t.registrationId)}
                      className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      title="Hapus Tiket Ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-stone-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Kategori:</span>
                      <span className="font-semibold text-stone-800">{categoryTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Tanggal Lahir:</span>
                      <span className="font-semibold text-stone-800">
                        {t.formData.birthDate || '-'} ({t.formData.age || '-'} Thn)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md text-[11px] font-semibold border border-emerald-200">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Berlaku untuk seluruh cabang lomba</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectTicket(t);
                      onClose();
                    }}
                    className="w-full py-2 bg-white hover:bg-red-600 hover:text-white text-stone-800 text-xs font-bold rounded-xl border border-stone-300 hover:border-red-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Buka Kartu Bukti Pendaftaran</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 text-stone-400">
              <Ticket className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-heading font-bold text-stone-700 text-sm">Belum Ada Tiket Terdaftar</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1">
                Silakan isi form pendaftaran untuk mendapatkan kartu bukti pendaftaran digital Anda.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200">
          <button
            onClick={() => {
              onClose();
              onRegisterNew();
            }}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Daftar Peserta Baru</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
