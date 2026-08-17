import React, { useState, useMemo } from 'react';
import { Competition } from '../types';
import { CompetitionCard } from './CompetitionCard';
import { CompetitionDetailModal } from './CompetitionDetailModal';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

interface CompetitionListProps {
  competitions: Competition[];
  selectedCompetitionId: string | null;
  onSelectCompetition: (comp: Competition) => void;
}

export const CompetitionList: React.FC<CompetitionListProps> = ({
  competitions,
  selectedCompetitionId,
  onSelectCompetition,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailModalComp, setDetailModalComp] = useState<Competition | null>(null);

  const filterOptions = [
    { label: 'Semua Lomba', value: 'Semua' },
    { label: '👶 Anak-Anak (17 Agustus 2026)', value: 'Anak-anak' },
    { label: '👩 Dewasa / Ibu-Ibu (18 Agustus 2026)', value: 'Dewasa' },
  ];

  const filteredCompetitions = useMemo(() => {
    return competitions.filter((comp) => {
      const matchesFilter =
        activeFilter === 'Semua' ||
        comp.category === activeFilter ||
        (activeFilter === 'Dewasa' && (comp.category === 'Dewasa' || comp.category === 'Semua Usia'));

      const matchesSearch =
        comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [competitions, activeFilter, searchQuery]);

  return (
    <section id="kategori-lomba" className="py-16 md:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pilihan Lomba Kemerdekaan</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-stone-900 tracking-tight">
            Daftar Cabang Lomba Agustusan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            Seluruh lomba bersifat individu tanpa batas kuota pendaftaran. Cukup 1 kali mendaftar untuk mengikuti seluruh cabang lomba dalam kategori Anda.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-stone-50/90 p-3.5 rounded-2xl border border-stone-200/80">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActiveFilter(opt.value)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === opt.value
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama lomba..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 placeholder-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Competition Grid */}
        {filteredCompetitions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompetitions.map((comp) => (
              <CompetitionCard
                key={comp.id}
                competition={comp}
                isSelected={selectedCompetitionId === comp.id}
                onSelectToRegister={(c) => onSelectCompetition(c)}
                onViewDetails={(c) => setDetailModalComp(c)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
            <SlidersHorizontal className="w-10 h-10 text-stone-400 mx-auto mb-2" />
            <h4 className="font-heading font-bold text-stone-800 text-lg">Lomba Tidak Ditemukan</h4>
            <p className="text-sm text-stone-500 max-w-sm mx-auto mt-1">
              Tidak ada lomba yang sesuai dengan kata kunci "{searchQuery}" pada filter ini.
            </p>
            <button
              onClick={() => {
                setActiveFilter('Semua');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <CompetitionDetailModal
        competition={detailModalComp}
        onClose={() => setDetailModalComp(null)}
        onSelectToRegister={(c) => onSelectCompetition(c)}
      />
    </section>
  );
};
