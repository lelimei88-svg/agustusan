import React, { useState, useMemo } from 'react';
import {
  Competition,
  RegisteredTicket,
  AgeCategory,
  CompetitionType,
  MatchGroup
} from '../types';
import { CompetitionIcon } from './CompetitionIcon';
import { TournamentBracket } from './TournamentBracket';
import { CountdownModal } from './CountdownModal';
import { calculateAge, generateFairPlayGroups } from '../utils/fairPlayGrouping';
import {
  Users,
  Trophy,
  Scale,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  Download,
  Printer,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Eye,
  ShieldAlert,
  ChevronRight,
  UserCheck,
  UserX,
  Award,
  Layers,
  Calendar,
  MapPin,
  FileSpreadsheet,
  Play
} from 'lucide-react';

interface AdminDashboardProps {
  competitions: Competition[];
  tickets: RegisteredTicket[];
  onUpdateCompetitions: (comps: Competition[]) => void;
  onUpdateTickets: (tickets: RegisteredTicket[]) => void;
  onViewTicket: (ticket: RegisteredTicket) => void;
  onBackToPublic: () => void;
  onLogout?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  competitions,
  tickets,
  onUpdateCompetitions,
  onUpdateTickets,
  onViewTicket,
  onBackToPublic,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'fairplay' | 'tournament' | 'peserta' | 'lomba'>('fairplay');

  // 5-Second Countdown State
  const [isCountdownOpen, setIsCountdownOpen] = useState(false);
  const [countdownCompTitle, setCountdownCompTitle] = useState('');

  // Search & Filters for Registrants
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompetition, setFilterCompetition] = useState<string>('all');
  const [filterAgeCategory, setFilterAgeCategory] = useState<string>('all');

  // Selected competition for Fair Play grouping viewer
  const [selectedCompForGrouping, setSelectedCompForGrouping] = useState<string>(
    competitions[0]?.id || ''
  );

  // Modal State for Adding / Editing Competition
  const [isCompModalOpen, setIsCompModalOpen] = useState(false);
  const [editingComp, setEditingComp] = useState<Competition | null>(null);
  const [compFormData, setCompFormData] = useState<Partial<Competition>>({
    title: '',
    slug: '',
    category: 'Anak-anak',
    type: 'Individu',
    teamSize: 1,
    description: '',
    rules: [''],
    maxQuota: 32,
    schedule: 'Minggu, 17 Agustus 2026, 09:00 WIB',
    location: 'Lapangan Utama RW',
    prizeSummary: 'Juara 1: Trofi + Uang Pembinaan Rp 500.000',
    iconName: 'trophy',
    tagColor: 'red',
  });

  // Calculate Fair Play Groups across all competitions
  const fairPlayGroupsByComp = useMemo(() => {
    return generateFairPlayGroups(tickets, competitions);
  }, [tickets, competitions]);

  // Overall Statistics
  const stats = useMemo(() => {
    const totalRegistrants = tickets.length;
    const totalSlots = competitions.reduce((acc, c) => acc + c.maxQuota, 0);
    const totalFilled = competitions.reduce((acc, c) => acc + c.currentRegistered, 0);

    let readyGroupsCount = 0;
    let pendingGroupsCount = 0;

    (Object.values(fairPlayGroupsByComp) as MatchGroup[][]).forEach((groups) => {
      groups.forEach((g) => {
        if (g.status === 'Siap Bertanding') readyGroupsCount++;
        else pendingGroupsCount++;
      });
    });

    return {
      totalRegistrants,
      totalCompetitions: competitions.length,
      occupancyRate: totalSlots > 0 ? Math.round((totalFilled / totalSlots) * 100) : 0,
      readyGroupsCount,
      pendingGroupsCount,
    };
  }, [tickets, competitions, fairPlayGroupsByComp]);

  // Filtered tickets list
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchSearch =
        t.formData.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.registrationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.formData.phone.includes(searchQuery) ||
        (t.formData.teamName && t.formData.teamName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchComp = filterCompetition === 'all' || t.competition.id === filterCompetition;
      const matchCat = filterAgeCategory === 'all' || t.formData.ageCategory === filterAgeCategory;

      return matchSearch && matchComp && matchCat;
    });
  }, [tickets, searchQuery, filterCompetition, filterAgeCategory]);

  // Handle Competition CRUD
  const handleOpenAddComp = () => {
    setEditingComp(null);
    setCompFormData({
      title: '',
      slug: '',
      category: 'Anak-anak',
      type: 'Individu',
      teamSize: 1,
      description: '',
      rules: ['Wajib hadir 15 menit sebelum lomba', 'Menaati keputusan juri'],
      maxQuota: 32,
      schedule: 'Minggu, 17 Agustus 2026, 09:00 WIB',
      location: 'Lapangan Utama',
      prizeSummary: 'Juara 1: Trofi + Rp 500.000',
      iconName: 'award',
      tagColor: 'red',
    });
    setIsCompModalOpen(true);
  };

  const handleOpenEditComp = (comp: Competition) => {
    setEditingComp(comp);
    setCompFormData({ ...comp });
    setIsCompModalOpen(true);
  };

  const handleDeleteComp = (compId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus cabang lomba ini?')) {
      const updated = competitions.filter((c) => c.id !== compId);
      onUpdateCompetitions(updated);
      if (selectedCompForGrouping === compId && updated.length > 0) {
        setSelectedCompForGrouping(updated[0].id);
      }
    }
  };

  const handleSaveComp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compFormData.title?.trim()) return;

    if (editingComp) {
      // Update existing
      const updated = competitions.map((c) =>
        c.id === editingComp.id
          ? ({
              ...c,
              ...compFormData,
              rules: Array.isArray(compFormData.rules)
                ? compFormData.rules
                : (compFormData.rules as string)?.split('\n').filter(Boolean),
            } as Competition)
          : c
      );
      onUpdateCompetitions(updated);
    } else {
      // Create new
      const newSlug =
        compFormData.slug ||
        compFormData
          .title!.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      const newId = `comp-${Date.now()}`;
      const newComp: Competition = {
        id: newId,
        title: compFormData.title!,
        slug: newSlug,
        category: (compFormData.category as AgeCategory) || 'Semua Usia',
        type: (compFormData.type as CompetitionType) || 'Individu',
        teamSize: compFormData.type === 'Beregu' ? compFormData.teamSize || 4 : 1,
        description: compFormData.description || 'Lomba Semarak HUT RI ke-81',
        rules: Array.isArray(compFormData.rules)
          ? compFormData.rules
          : (compFormData.rules as string)?.split('\n').filter(Boolean) || [
              'Keputusan juri mutlak',
            ],
        maxQuota: Number(compFormData.maxQuota) || 32,
        currentRegistered: 0,
        schedule: compFormData.schedule || 'Minggu, 17 Agustus 2026, 09:00 WIB',
        location: compFormData.location || 'Lapangan Utama',
        prizeSummary: compFormData.prizeSummary || 'Piala + Sertifikat',
        iconName: compFormData.iconName || 'trophy',
        tagColor: compFormData.tagColor || 'red',
      };
      onUpdateCompetitions([...competitions, newComp]);
    }
    setIsCompModalOpen(false);
  };

  const handleDeleteTicket = (ticketId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data peserta ini?')) {
      const ticket = tickets.find((t) => t.registrationId === ticketId);
      if (ticket) {
        // Decrement comp currentRegistered
        const updatedComps = competitions.map((c) =>
          c.id === ticket.competition.id
            ? { ...c, currentRegistered: Math.max(0, c.currentRegistered - 1) }
            : c
        );
        onUpdateCompetitions(updatedComps);
      }
      const updatedTickets = tickets.filter((t) => t.registrationId !== ticketId);
      onUpdateTickets(updatedTickets);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'No Registrasi',
      'Nama Peserta / Tim',
      'No WhatsApp',
      'Tanggal Lahir',
      'Usia (Thn)',
      'Kategori Usia',
      'Cabang Lomba',
      'RT / RW',
      'Nama Tim (Jika Beregu)',
      'Waktu Daftar',
      'Status',
    ];

    const rows = tickets.map((t) => [
      t.registrationId,
      `"${t.formData.fullName}"`,
      `"${t.formData.phone}"`,
      t.formData.birthDate || '-',
      t.formData.age || calculateAge(t.formData.birthDate),
      t.formData.ageCategory,
      `"${t.competition.title}"`,
      `"${t.formData.rtRw}"`,
      `"${t.formData.teamName || '-'}"`,
      `"${t.registeredAt}"`,
      t.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekap_peserta_lomba_hut_ri_81_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeCompGroups = fairPlayGroupsByComp[selectedCompForGrouping] || [];
  const currentSelectedComp = competitions.find((c) => c.id === selectedCompForGrouping);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col">
      {/* Admin Top Navbar */}
      <header className="bg-stone-900 text-white sticky top-0 z-30 shadow-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToPublic}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-bold transition-all border border-stone-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Halaman Web</span>
            </button>
            <div className="h-6 w-px bg-stone-700 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="font-heading font-black text-sm sm:text-base text-white tracking-tight">
                Panel Panitia Lomba HUT RI ke-81
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 rounded-xl text-xs font-bold transition-all"
              title="Download Data Pendaftar Excel/CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-red-600/30"
                title="Keluar dari Panel Admin"
              >
                <span>Keluar</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Total Pendaftar
              </p>
              <h3 className="text-2xl font-black text-stone-900 mt-1">
                {stats.totalRegistrants} <span className="text-xs font-normal text-stone-400">Orang</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Cabang Lomba
              </p>
              <h3 className="text-2xl font-black text-stone-900 mt-1">
                {stats.totalCompetitions} <span className="text-xs font-normal text-stone-400">Kategori</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Sesi Fair Play Siap
              </p>
              <h3 className="text-2xl font-black text-emerald-600 mt-1">
                {stats.readyGroupsCount} <span className="text-xs font-normal text-stone-400">Sesi</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Tingkat Okupansi Kuota
              </p>
              <h3 className="text-2xl font-black text-blue-600 mt-1">
                {stats.occupancyRate}%
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="bg-white p-1.5 rounded-2xl border border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-1.5">
          <button
            onClick={() => setActiveTab('fairplay')}
            className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'fairplay'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Fair Play & Sesi</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'fairplay' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700'
            }`}>
              {stats.readyGroupsCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tournament')}
            className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'tournament'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>Bagan Turnamen</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'tournament' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
            }`}>
              Bracket
            </span>
          </button>

          <button
            onClick={() => setActiveTab('peserta')}
            className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'peserta'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Data Peserta</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'peserta' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
            }`}>
              {tickets.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('lomba')}
            className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'lomba'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Kelola Lomba</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'lomba' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
            }`}>
              {competitions.length}
            </span>
          </button>
        </div>

        {/* TAB 1: FAIR PLAY SYSTEM & GROUPING */}
        {activeTab === 'fairplay' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Rules Summary Box */}
            <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Fair Play Engine Verification</span>
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                  Aturan Khusus Pembagian Kelompok / Sesi Lomba
                </h3>
                <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                  Sistem otomatis mengelompokkan <strong>3 sampai 4 orang peserta per sesi</strong> dengan rentang usia peserta dalam satu kelompok <strong>maksimal selisih 1 tahun</strong> agar pertandingan berjalan jujur, adil, dan seimbang.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => {
                    const compTitle = currentSelectedComp?.title || 'Lomba Kemerdekaan';
                    setCountdownCompTitle(compTitle);
                    setIsCountdownOpen(true);
                  }}
                  className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Mulai Undian Sesi (Timer 5 Detik)</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 bg-stone-700 hover:bg-stone-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Lembar Tanding</span>
                </button>
              </div>
            </div>

            {/* Competition Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {competitions.map((comp) => {
                const count = tickets.filter((t) => t.competition.id === comp.id).length;
                const isSelected = selectedCompForGrouping === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedCompForGrouping(comp.id)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap border transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-red-600 border-red-600 text-white shadow-md'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <CompetitionIcon name={comp.iconName} className="w-4 h-4" />
                    <span>{comp.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {count} Pendaftar
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Groups Grid for Selected Competition */}
            {activeCompGroups.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
                <Users className="w-12 h-12 mx-auto text-stone-300 mb-3" />
                <h4 className="font-heading font-bold text-stone-800 text-base">
                  Belum Ada Peserta Terdaftar di Cabang Lomba Ini
                </h4>
                <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                  Pendaftar yang masuk dari formulir online akan secara otomatis dianalisis dan disusun ke dalam sesi pertandingan Fair Play di sini.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCompGroups.map((group) => {
                  const isReady = group.status === 'Siap Bertanding';
                  return (
                    <div
                      key={group.groupId}
                      className={`bg-white rounded-3xl p-5 border transition-all shadow-sm ${
                        isReady
                          ? 'border-emerald-200 hover:border-emerald-300'
                          : 'border-amber-200 bg-amber-50/20'
                      }`}
                    >
                      {/* Group Header */}
                      <div className="flex items-start justify-between pb-3 mb-3 border-b border-stone-100">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-heading font-black text-stone-900 text-sm">
                              {group.groupName}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Rentang Usia: <strong>{group.minAge} - {group.maxAge} Thn</strong> (Selisih: {group.ageSpan} Thn)
                          </p>
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                            isReady
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {isReady ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Siap Tanding</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3" />
                              <span>Butuh {3 - group.participants.length} Lagi</span>
                            </>
                          )}
                        </span>
                      </div>

                      {/* Participant Slots */}
                      <div className="space-y-2.5">
                        <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex justify-between">
                          <span>Peserta / Lintasan</span>
                          <span>Usia & Asal</span>
                        </div>

                        {group.participants.map((p, idx) => (
                          <div
                            key={p.ticketId}
                            className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                                {idx + 1}
                              </span>
                              <div>
                                <h5 className="font-bold text-stone-900 text-xs">
                                  {p.name}
                                </h5>
                                <p className="text-[10px] text-stone-500 font-mono">
                                  {p.ticketId} {p.teamName ? `• ${p.teamName}` : ''}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-800 text-[11px] font-black">
                                {p.age} Thn
                              </span>
                              <p className="text-[10px] text-stone-500 mt-0.5">
                                {p.rtRw}
                              </p>
                            </div>
                          </div>
                        ))}

                        {/* Empty Slots if less than 4 */}
                        {Array.from({ length: Math.max(0, 4 - group.participants.length) }).map(
                          (_, idx) => (
                            <div
                              key={`empty-${idx}`}
                              className="p-2.5 border border-dashed border-stone-200 rounded-xl text-center text-stone-400 text-xs flex items-center justify-center gap-2 bg-stone-50/50"
                            >
                              <span className="w-5 h-5 rounded-md bg-stone-200 text-stone-500 font-bold text-[10px] flex items-center justify-center">
                                {group.participants.length + idx + 1}
                              </span>
                              <span className="text-[11px]">
                                Slot Terbuka ({group.minAge} - {group.maxAge} Thn)
                              </span>
                            </div>
                          )
                        )}
                      </div>

                      {/* Group Footer */}
                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                        <span>Kapasitas: {group.participants.length} / 4 Orang</span>
                        <span className="font-medium text-red-600">
                          {isReady ? '✓ Memenuhi Syarat Fair Play' : 'Menunggu Pendaftar Sepantaran'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TOURNAMENT BRACKET (BAGAN TURNAMEN) */}
        {activeTab === 'tournament' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Competition Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {competitions.map((comp) => {
                const count = tickets.filter((t) => t.competition.id === comp.id).length;
                const isSelected = selectedCompForGrouping === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedCompForGrouping(comp.id)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap border transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-red-600 border-red-600 text-white shadow-md'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <CompetitionIcon name={comp.iconName} className="w-4 h-4" />
                    <span>{comp.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {count} Pendaftar
                    </span>
                  </button>
                );
              })}
            </div>

            {currentSelectedComp && (
              <TournamentBracket
                competition={currentSelectedComp}
                groups={activeCompGroups}
                onTriggerCountdown={() => {
                  setCountdownCompTitle(currentSelectedComp.title);
                  setIsCountdownOpen(true);
                }}
              />
            )}
          </div>
        )}

        {/* TAB 3: ALL REGISTRANTS TABLE */}
        {activeTab === 'peserta' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-6 animate-fadeIn">
            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama, tiket, telepon, tim..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select
                  value={filterCompetition}
                  onChange={(e) => setFilterCompetition(e.target.value)}
                  className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer"
                >
                  <option value="all">Semua Cabang Lomba</option>
                  {competitions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>

                <select
                  value={filterAgeCategory}
                  onChange={(e) => setFilterAgeCategory(e.target.value)}
                  className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer"
                >
                  <option value="all">Semua Kategori Usia</option>
                  <option value="Anak-anak">Anak-anak</option>
                  <option value="Remaja">Remaja</option>
                  <option value="Dewasa">Dewasa</option>
                </select>

                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterCompetition('all');
                    setFilterAgeCategory('all');
                  }}
                  className="px-3 py-2 text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all"
                  title="Reset Filter"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-stone-200">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 border-b border-stone-200 text-[11px] uppercase font-bold text-stone-500">
                  <tr>
                    <th className="py-3.5 px-4">No. Tiket</th>
                    <th className="py-3.5 px-4">Nama Peserta / Regu</th>
                    <th className="py-3.5 px-4">Usia & Tgl Lahir</th>
                    <th className="py-3.5 px-4">Lomba Dipilih</th>
                    <th className="py-3.5 px-4">RT / RW</th>
                    <th className="py-3.5 px-4">WhatsApp</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-stone-400">
                        Tidak ada data pendaftar yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredTickets.map((ticket) => {
                      const age =
                        ticket.formData.age || calculateAge(ticket.formData.birthDate);
                      return (
                        <tr
                          key={ticket.registrationId}
                          className="hover:bg-red-50/40 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-red-700 whitespace-nowrap">
                            {ticket.registrationId}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-stone-900">
                              {ticket.formData.fullName}
                            </div>
                            {ticket.formData.teamName && (
                              <span className="text-[10px] text-red-600 font-semibold block">
                                Regu: {ticket.formData.teamName}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-md bg-stone-100 font-bold text-stone-800">
                              {age} Tahun
                            </span>
                            <span className="text-[10px] text-stone-400 block mt-0.5">
                              {ticket.formData.birthDate || '-'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-medium text-stone-900 block">
                              {ticket.competition.title}
                            </span>
                            <span className="text-[10px] text-stone-500">
                              {ticket.competition.category} • {ticket.competition.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {ticket.formData.rtRw}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap font-mono text-stone-600">
                            {ticket.formData.phone}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              {ticket.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => onViewTicket(ticket)}
                                className="p-1.5 bg-stone-100 hover:bg-red-100 text-stone-700 hover:text-red-700 rounded-lg transition-colors"
                                title="Lihat E-Tiket"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteTicket(ticket.registrationId)}
                                className="p-1.5 bg-stone-100 hover:bg-red-600 text-stone-700 hover:text-white rounded-lg transition-colors"
                                title="Hapus Pendaftar"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: COMPETITION CRUD MANAGEMENT */}
        {activeTab === 'lomba' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Action Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-stone-900 text-lg">
                  Daftar Cabang Lomba Aktif
                </h3>
                <p className="text-xs text-stone-500">
                  Tambah, perbarui jadwal, lokasi, atau kuota masing-masing lomba.
                </p>
              </div>

              <button
                onClick={handleOpenAddComp}
                className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md shadow-red-600/30 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Cabang Lomba Baru</span>
              </button>
            </div>

            {/* Competitions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitions.map((comp) => {
                const registered = comp.currentRegistered || 0;
                const percentage = Math.min(100, Math.round((registered / comp.maxQuota) * 100));

                return (
                  <div
                    key={comp.id}
                    className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                          <CompetitionIcon name={comp.iconName} className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEditComp(comp)}
                            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                            title="Edit Lomba"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteComp(comp.id)}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white transition-colors"
                            title="Hapus Lomba"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                            {comp.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold">
                            {comp.type} {comp.teamSize && comp.teamSize > 1 ? `(${comp.teamSize} Org)` : ''}
                          </span>
                        </div>
                        <h4 className="font-heading font-bold text-stone-900 text-base mt-1.5">
                          {comp.title}
                        </h4>
                        <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                          {comp.description}
                        </p>
                      </div>

                      {/* Quota bar */}
                      <div className="mt-4 pt-3 border-t border-stone-100">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-stone-500">Kuota Terisi:</span>
                          <span className="font-bold text-stone-900">
                            {registered} / {comp.maxQuota} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-red-600 h-full rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Schedule & Location */}
                      <div className="mt-3 space-y-1 text-[11px] text-stone-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          <span>{comp.schedule}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          <span>{comp.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-bold text-amber-700 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span className="truncate">{comp.prizeSummary}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Modal Add / Edit Competition */}
      {isCompModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-stone-200 shadow-2xl my-auto animate-fadeIn">
            <h3 className="font-heading font-black text-xl text-stone-900 mb-1">
              {editingComp ? 'Edit Cabang Lomba' : 'Tambah Cabang Lomba Baru'}
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Lengkapi informasi perlombaan HUT RI ke-81.
            </p>

            <form onSubmit={handleSaveComp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Nama Cabang Lomba *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Balap Bakiak Tradisional"
                  value={compFormData.title || ''}
                  onChange={(e) => setCompFormData({ ...compFormData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Kategori Usia
                  </label>
                  <select
                    value={compFormData.category || 'Semua Usia'}
                    onChange={(e) =>
                      setCompFormData({ ...compFormData, category: e.target.value as AgeCategory })
                    }
                    className="w-full px-3 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  >
                    <option value="Anak-anak">Anak-anak</option>
                    <option value="Remaja">Remaja</option>
                    <option value="Dewasa">Dewasa</option>
                    <option value="Semua Usia">Semua Usia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Tipe Lomba
                  </label>
                  <select
                    value={compFormData.type || 'Individu'}
                    onChange={(e) =>
                      setCompFormData({
                        ...compFormData,
                        type: e.target.value as CompetitionType,
                      })
                    }
                    className="w-full px-3 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  >
                    <option value="Individu">Individu</option>
                    <option value="Beregu">Beregu</option>
                  </select>
                </div>
              </div>

              {compFormData.type === 'Beregu' && (
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Jumlah Anggota per Regu
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={10}
                    value={compFormData.teamSize || 4}
                    onChange={(e) =>
                      setCompFormData({ ...compFormData, teamSize: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Maksimal Kuota Peserta / Tim
                  </label>
                  <input
                    type="number"
                    min={4}
                    max={200}
                    value={compFormData.maxQuota || 32}
                    onChange={(e) =>
                      setCompFormData({ ...compFormData, maxQuota: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Ikon Lomba
                  </label>
                  <select
                    value={compFormData.iconName || 'trophy'}
                    onChange={(e) =>
                      setCompFormData({ ...compFormData, iconName: e.target.value })
                    }
                    className="w-full px-3 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  >
                    <option value="trophy">🏆 Piala / Trophy</option>
                    <option value="award">🎖️ Medali / Award</option>
                    <option value="flag">🚩 Bendera</option>
                    <option value="zap">⚡ Kilat / Kecepatan</option>
                    <option value="users">👥 Beregu / Tim</option>
                    <option value="flame">🔥 Semangat / Api</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={2}
                  value={compFormData.description || ''}
                  onChange={(e) =>
                    setCompFormData({ ...compFormData, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  placeholder="Penjelasan ringkas cara bermain..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Jadwal Pelaksanaan
                  </label>
                  <input
                    type="text"
                    value={compFormData.schedule || ''}
                    onChange={(e) =>
                      setCompFormData({ ...compFormData, schedule: e.target.value })
                    }
                    placeholder="Minggu, 17 Agu 2026, 09:00 WIB"
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Lokasi Perlombaan
                  </label>
                  <input
                    type="text"
                    value={compFormData.location || ''}
                    onChange={(e) =>
                      setCompFormData({ ...compFormData, location: e.target.value })
                    }
                    placeholder="Lapangan Utama RT 04"
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Hadiah & Penghargaan
                </label>
                <input
                  type="text"
                  value={compFormData.prizeSummary || ''}
                  onChange={(e) =>
                    setCompFormData({ ...compFormData, prizeSummary: e.target.value })
                  }
                  placeholder="Juara 1: Trofi + Uang Rp 500.000"
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsCompModalOpen(false)}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md shadow-red-600/30 transition-all"
                >
                  Simpan Lomba
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5-Second Suspense Countdown Modal */}
      <CountdownModal
        isOpen={isCountdownOpen}
        competitionTitle={countdownCompTitle || 'Semarak Lomba Kemerdekaan RI ke-81'}
        onComplete={() => {
          // Keep completed state until user dismisses
        }}
        onClose={() => setIsCountdownOpen(false)}
      />
    </div>
  );
};
