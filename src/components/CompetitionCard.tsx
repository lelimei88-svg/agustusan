import React from 'react';
import { Competition } from '../types';
import { CompetitionIcon } from './CompetitionIcon';
import { Users, Calendar, MapPin, Trophy, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

interface CompetitionCardProps {
  competition: Competition;
  onSelectToRegister: (competition: Competition) => void;
  onViewDetails: (competition: Competition) => void;
  isSelected?: boolean;
}

export const CompetitionCard: React.FC<CompetitionCardProps> = ({
  competition,
  onSelectToRegister,
  onViewDetails,
  isSelected = false,
}) => {
  return (
    <div
      id={`comp-card-${competition.id}`}
      className={`group relative bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        isSelected
          ? 'border-red-600 ring-2 ring-red-600/30 shadow-lg -translate-y-1'
          : 'border-stone-200/90 hover:border-red-300 hover:shadow-xl hover:-translate-y-1'
      }`}
    >
      {/* Top Banner / Tags */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center shadow-md shadow-red-600/20 group-hover:scale-105 transition-transform">
              <CompetitionIcon name={competition.iconName} className="w-6 h-6" />
            </div>
            <div>
              <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full border ${competition.tagColor}`}>
                {competition.category}
              </span>
              <span className="ml-1.5 inline-flex items-center gap-1 text-xs text-stone-500 font-medium">
                <Users className="w-3 h-3" />
                {competition.type}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            Bebas Daftar (Tanpa Batas)
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="font-heading font-bold text-lg text-stone-900 leading-snug group-hover:text-red-600 transition-colors">
          {competition.title}
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
          {competition.description}
        </p>

        {/* Schedule & Location */}
        <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
            <span className="font-medium text-stone-700">{competition.schedule}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
            <span className="truncate">{competition.location}</span>
          </div>
          <div className="flex items-center gap-2 text-red-700 font-semibold bg-red-50/70 px-2 py-1 rounded-lg">
            <Trophy className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="truncate text-[11px]">{competition.prizeSummary}</span>
          </div>
        </div>

        {/* Real-time Registrant Counter (No Quota Cap) */}
        <div className="mt-4 p-2.5 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-stone-600">
            <Users className="w-4 h-4 text-red-600" />
            <span className="font-semibold">Peserta Terdata:</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-stone-900 bg-white px-2 py-0.5 rounded-lg border border-stone-200">
              {competition.currentRegistered} Peserta
            </span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Slot Terbuka
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-2 bg-stone-50/70 border-t border-stone-100 flex items-center gap-2">
        <button
          id={`btn-detail-${competition.id}`}
          onClick={() => onViewDetails(competition)}
          className="px-3 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 rounded-xl border border-stone-200 hover:border-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Lihat Peraturan Lengkap"
        >
          <Info className="w-3.5 h-3.5 text-stone-500" />
          <span>Aturan</span>
        </button>

        <button
          id={`btn-register-${competition.id}`}
          onClick={() => onSelectToRegister(competition)}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            isSelected
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-600/20 active:scale-95'
          }`}
        >
          {isSelected ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Dipilih di Form</span>
            </>
          ) : (
            <>
              <span>Pilih & Daftar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
