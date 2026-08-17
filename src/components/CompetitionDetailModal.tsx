import React from 'react';
import { Competition } from '../types';
import { CompetitionIcon } from './CompetitionIcon';
import { X, Calendar, MapPin, Trophy, Users, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';

interface CompetitionDetailModalProps {
  competition: Competition | null;
  onClose: () => void;
  onSelectToRegister: (comp: Competition) => void;
}

export const CompetitionDetailModal: React.FC<CompetitionDetailModalProps> = ({
  competition,
  onClose,
  onSelectToRegister,
}) => {
  if (!competition) return null;

  const isFull = competition.currentRegistered >= competition.maxQuota;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        id="competition-detail-modal"
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white text-red-600 flex items-center justify-center shadow-lg">
              <CompetitionIcon name={competition.iconName} className="w-6 h-6" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-white/20 text-white border border-white/30 mb-1">
                Kategori {competition.category} • {competition.type}
              </span>
              <h2 className="font-heading font-black text-xl sm:text-2xl leading-tight">
                {competition.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-stone-700">
          <div>
            <h4 className="font-heading font-bold text-stone-900 text-sm mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              Deskripsi Perlombaan
            </h4>
            <p className="text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200/60">
              {competition.description}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mb-1">
                <Calendar className="w-3.5 h-3.5 text-red-600" />
                Waktu Pelaksanaan
              </div>
              <p className="font-bold text-stone-900 text-xs sm:text-sm">{competition.schedule}</p>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mb-1">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                Lokasi Arena
              </div>
              <p className="font-bold text-stone-900 text-xs sm:text-sm">{competition.location}</p>
            </div>
          </div>

          {/* Prizes */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950">
            <div className="flex items-center gap-2 font-bold text-sm mb-1 text-amber-900">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Hadiah & Penghargaan</span>
            </div>
            <p className="text-xs sm:text-sm font-medium">{competition.prizeSummary}</p>
          </div>

          {/* Rules and Requirements */}
          <div>
            <h4 className="font-heading font-bold text-stone-900 text-sm mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              Peraturan & Ketentuan Lomba
            </h4>
            <ul className="space-y-2">
              {competition.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quota Status */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 text-red-900 text-xs font-semibold">
            <span>Status Kuota:</span>
            <span>
              {competition.currentRegistered} / {competition.maxQuota} {competition.type === 'Beregu' ? 'Tim' : 'Peserta'} Terdaftar
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs sm:text-sm hover:bg-stone-100 transition-colors"
          >
            Tutup
          </button>

          <button
            disabled={isFull}
            onClick={() => {
              onSelectToRegister(competition);
              onClose();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center gap-2 shadow-md ${
              isFull
                ? 'bg-stone-300 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 shadow-red-600/30'
            }`}
          >
            <span>{isFull ? 'Kuota Penuh' : 'Daftar Lomba Ini'}</span>
            {!isFull && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
