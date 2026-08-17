import React, { useState, useEffect } from 'react';
import { Competition, RegistrationFormData, AgeCategory } from '../types';
import { CompetitionIcon } from './CompetitionIcon';
import { calculateAge } from '../utils/fairPlayGrouping';
import { OFFICIAL_LOCATION } from '../data/competitionsData';
import {
  User,
  Phone,
  Layers,
  MapPin,
  FileText,
  AlertCircle,
  Sparkles,
  Send,
  Calendar,
  CheckCircle2,
  Gift,
  Clock
} from 'lucide-react';

interface RegistrationFormProps {
  competitions: Competition[];
  selectedCompetitionId: string | null;
  onSelectCompetitionId: (id: string) => void;
  onSubmitRegistration: (data: RegistrationFormData, selectedComp: Competition) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  competitions,
  selectedCompetitionId,
  onSelectCompetitionId,
  onSubmitRegistration,
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    phone: '',
    email: '',
    birthDate: '',
    age: undefined,
    ageCategory: 'Anak-anak',
    competitionId: selectedCompetitionId || (competitions[0]?.id || ''),
    rtRw: '',
    notes: '',
    agreedTerms: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync when selectedCompetitionId prop changes
  useEffect(() => {
    if (selectedCompetitionId) {
      const comp = competitions.find((c) => c.id === selectedCompetitionId);
      setFormData((prev) => ({
        ...prev,
        competitionId: selectedCompetitionId,
        ageCategory: comp ? comp.category : prev.ageCategory,
      }));
      if (errors.competitionId) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.competitionId;
          return newErrors;
        });
      }
    }
  }, [selectedCompetitionId, competitions]);

  const selectedComp = competitions.find((c) => c.id === formData.competitionId) || competitions[0];

  // Handle BirthDate change and auto calculate age + category
  const handleBirthDateChange = (dateVal: string) => {
    const calculatedAge = calculateAge(dateVal);
    let autoCat: AgeCategory = 'Dewasa';
    if (calculatedAge <= 12) autoCat = 'Anak-anak';
    else if (calculatedAge <= 17) autoCat = 'Remaja';
    else autoCat = 'Dewasa';

    // Auto set appropriate competition if current competition category doesn't match
    let targetCompId = formData.competitionId;
    const isTargetAnak = autoCat === 'Anak-anak';
    const currentIsAnak = selectedComp?.category === 'Anak-anak';

    if (isTargetAnak && !currentIsAnak) {
      const firstAnak = competitions.find((c) => c.category === 'Anak-anak');
      if (firstAnak) targetCompId = firstAnak.id;
    } else if (!isTargetAnak && currentIsAnak) {
      const firstDewasa = competitions.find((c) => c.category === 'Dewasa');
      if (firstDewasa) targetCompId = firstDewasa.id;
    }

    setFormData((prev) => ({
      ...prev,
      birthDate: dateVal,
      age: calculatedAge,
      ageCategory: autoCat,
      competitionId: targetCompId,
    }));

    if (errors.birthDate) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.birthDate;
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Nama minimal 3 karakter.';
    }

    // Validate Phone / WhatsApp Number
    const cleanedPhone = formData.phone.replace(/[^0-9+]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor WhatsApp / HP wajib diisi.';
    } else if (cleanedPhone.length < 9 || cleanedPhone.length > 15) {
      newErrors.phone = 'Nomor WhatsApp tidak valid (antara 9 - 15 digit).';
    } else if (!/^(08|\+62|62)/.test(cleanedPhone)) {
      newErrors.phone = 'Gunakan format Indonesia (diawali 08... atau +62...).';
    }

    // Validate Birth Date & Age
    if (!formData.birthDate) {
      newErrors.birthDate = 'Tanggal lahir wajib diisi untuk penentuan kategori dan sesi pertandingan.';
    } else {
      const age = calculateAge(formData.birthDate);
      if (age < 3 || age > 99) {
        newErrors.birthDate = 'Tanggal lahir tidak valid.';
      }
    }

    // Validate Competition Selection
    if (!formData.competitionId) {
      newErrors.competitionId = 'Silakan pilih cabang lomba yang ingin diikuti.';
    }

    // Validate RT / RW
    if (!formData.rtRw.trim()) {
      newErrors.rtRw = 'Asal RT/RW atau Lingkungan wajib diisi (Contoh: RT 04 / RW 01).';
    }

    // Validate Terms Agreement
    if (!formData.agreedTerms) {
      newErrors.agreedTerms = 'Anda harus menyetujui ketentuan pendaftaran.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorKey = Object.keys(errors)[0];
      const errorElem = document.getElementById(`input-${firstErrorKey}`);
      if (errorElem) {
        errorElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (!selectedComp) return;

    setIsSubmitting(true);

    const calculatedAge = formData.age !== undefined ? formData.age : calculateAge(formData.birthDate);
    const submissionData = {
      ...formData,
      age: calculatedAge,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitRegistration(submissionData, selectedComp);
    }, 500);
  };

  return (
    <section id="form-pendaftaran" className="py-16 md:py-24 bg-gradient-to-b from-stone-50 via-red-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pendaftaran Online Resmi</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-stone-900 tracking-tight">
            Formulir Pendaftaran Lomba 17-an
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            Pendaftaran 100% Gratis tanpa batasan kuota. Cukup 1 kali mendaftar untuk mengikuti seluruh cabang lomba dalam kategori Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Container */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl shadow-stone-200/50">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* 1. Nama Lengkap */}
              <div>
                <label
                  htmlFor="input-fullName"
                  className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
                >
                  Nama Lengkap Peserta <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-fullName"
                    type="text"
                    placeholder="Contoh: Rian Saputra"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    className={`w-full pl-10 pr-4 py-3 text-sm bg-stone-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName
                        ? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500'
                        : 'border-stone-300 focus:ring-red-600 focus:border-red-600'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* 2. Nomor WhatsApp / HP */}
              <div>
                <label
                  htmlFor="input-phone"
                  className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
                >
                  Nomor WhatsApp / HP Aktif <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-phone"
                    type="tel"
                    placeholder="0812-3456-7890"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className={`w-full pl-10 pr-4 py-3 text-sm bg-stone-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500'
                        : 'border-stone-300 focus:ring-red-600 focus:border-red-600'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Panitia akan mengirimkan pengingat jadwal dan informasi giliran via WhatsApp.
                </p>
                {errors.phone && (
                  <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* 3. Tanggal Lahir & Usia */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-7">
                  <label
                    htmlFor="input-birthDate"
                    className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
                  >
                    Tanggal Lahir Peserta <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="input-birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleBirthDateChange(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 text-sm bg-stone-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                        errors.birthDate
                          ? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500'
                          : 'border-stone-300 focus:ring-red-600 focus:border-red-600'
                      }`}
                    />
                  </div>
                  {errors.birthDate && (
                    <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.birthDate}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5">
                    Kalkulasi Usia
                  </label>
                  <div className="h-[46px] px-3.5 bg-stone-100 border border-stone-200 rounded-xl flex items-center justify-between">
                    <span className="text-xs text-stone-500">Usia saat lomba:</span>
                    <span className="text-sm font-black text-red-700">
                      {formData.birthDate ? `${calculateAge(formData.birthDate)} Tahun` : '-'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Kategori Kelompok Usia & Jadwal */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5">
                  Kategori Usia & Jadwal Acara <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        ageCategory: 'Anak-anak',
                        competitionId: competitions.find((c) => c.category === 'Anak-anak')?.id || formData.competitionId,
                      });
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      formData.ageCategory === 'Anak-anak'
                        ? 'bg-red-50/80 border-red-600 text-red-950 ring-2 ring-red-600/30'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">👶 Kategori Anak-Anak</span>
                      {formData.ageCategory === 'Anak-anak' && (
                        <CheckCircle2 className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      📅 <strong>17 Agustus 2026</strong> • 7 Pilihan Lomba
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        ageCategory: 'Dewasa',
                        competitionId: competitions.find((c) => c.category === 'Dewasa')?.id || formData.competitionId,
                      });
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      formData.ageCategory === 'Dewasa' || formData.ageCategory === 'Remaja'
                        ? 'bg-red-50/80 border-red-600 text-red-950 ring-2 ring-red-600/30'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">👩 Kategori Dewasa / Ibu-Ibu</span>
                      {(formData.ageCategory === 'Dewasa' || formData.ageCategory === 'Remaja') && (
                        <CheckCircle2 className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      📅 <strong>18 Agustus 2026</strong> • 6 Pilihan Lomba
                    </p>
                  </button>
                </div>
              </div>

              {/* 5. Pilihan Cabang Lomba */}
              <div>
                <label
                  htmlFor="input-competitionId"
                  className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
                >
                  Pilihan Cabang Lomba Utama <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Layers className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <select
                    id="input-competitionId"
                    value={formData.competitionId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setFormData({ ...formData, competitionId: id });
                      onSelectCompetitionId(id);
                      if (errors.competitionId) setErrors({ ...errors, competitionId: '' });
                    }}
                    className={`w-full pl-10 pr-10 py-3 text-sm bg-stone-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                      errors.competitionId
                        ? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500'
                        : 'border-stone-300 focus:ring-red-600 focus:border-red-600'
                    }`}
                  >
                    <optgroup label="👶 Kategori Anak-Anak (17 Agustus 2026)">
                      {competitions
                        .filter((c) => c.category === 'Anak-anak')
                        .map((comp) => (
                          <option key={comp.id} value={comp.id}>
                            {comp.title} (Individu)
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="👩 Kategori Dewasa / Ibu-Ibu (18 Agustus 2026)">
                      {competitions
                        .filter((c) => c.category === 'Dewasa')
                        .map((comp) => (
                          <option key={comp.id} value={comp.id}>
                            {comp.title} (Individu)
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>
                {errors.competitionId && (
                  <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.competitionId}
                  </p>
                )}
              </div>

              {/* 6. Asal RT / RW */}
              <div>
                <label
                  htmlFor="input-rtRw"
                  className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
                >
                  Asal RT / RW atau Lingkungan Warga <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-rtRw"
                    type="text"
                    placeholder="Contoh: RT 004/001"
                    value={formData.rtRw}
                    onChange={(e) => {
                      setFormData({ ...formData, rtRw: e.target.value });
                      if (errors.rtRw) setErrors({ ...errors, rtRw: '' });
                    }}
                    className={`w-full pl-10 pr-4 py-3 text-sm bg-stone-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.rtRw
                        ? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500'
                        : 'border-stone-300 focus:ring-red-600 focus:border-red-600'
                    }`}
                  />
                </div>
                {errors.rtRw && (
                  <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.rtRw}
                  </p>
                )}
              </div>

              {/* 7. Catatan Tambahan (Opsional) */}
              <div>
                <label
                  htmlFor="input-notes"
                  className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
                >
                  Catatan Tambahan (Opsional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <textarea
                    id="input-notes"
                    rows={2}
                    placeholder="Contoh: Membawa helm sendiri, dll."
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              {/* 8. Checkbox Syarat & Ketentuan */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    id="input-agreedTerms"
                    type="checkbox"
                    checked={formData.agreedTerms}
                    onChange={(e) => {
                      setFormData({ ...formData, agreedTerms: e.target.checked });
                      if (errors.agreedTerms) setErrors({ ...errors, agreedTerms: '' });
                    }}
                    className="mt-1 w-4 h-4 rounded text-red-600 focus:ring-red-500 border-stone-300 cursor-pointer accent-red-600"
                  />
                  <span className="text-xs text-stone-600 leading-relaxed">
                    Saya menyatakan data yang diisi adalah benar, bersedia menaati peraturan panitia HUT RI ke-81, dan menjunjung tinggi sportivitas serta persaudaraan warga.
                  </span>
                </label>
                {errors.agreedTerms && (
                  <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.agreedTerms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                id="btn-submit-registration"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-base rounded-2xl shadow-xl shadow-red-600/30 hover:shadow-red-600/40 transition-all flex items-center justify-center gap-2 transform active:scale-[0.99] disabled:opacity-75 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memproses Pendaftaran...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Daftar Sekarang (100% Gratis)</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Side: Live Registration Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-md">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-black text-xs">
                    RI
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-stone-900">Ringkasan Pendaftaran</h4>
                    <p className="text-[11px] text-stone-500">Pratinjau data peserta</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Gratis
                </span>
              </div>

              {selectedComp && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3.5 bg-red-50/70 rounded-2xl border border-red-100">
                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0">
                      <CompetitionIcon name={selectedComp.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-700">
                        {selectedComp.category} • Individu
                      </span>
                      <h5 className="font-heading font-bold text-stone-900 text-sm">
                        {selectedComp.title}
                      </h5>
                      <p className="text-xs text-stone-600 mt-0.5">
                        {selectedComp.schedule}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-stone-600">
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-400">Nama Pendaftar:</span>
                      <span className="font-bold text-stone-900 text-right">
                        {formData.fullName || '(Belum diisi)'}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-400">WhatsApp:</span>
                      <span className="font-bold text-stone-900 text-right">
                        {formData.phone || '(Belum diisi)'}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-400">Usia Peserta:</span>
                      <span className="font-bold text-red-700 text-right">
                        {formData.birthDate ? `${calculateAge(formData.birthDate)} Tahun` : '(Isi tanggal lahir)'}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-400">Asal Wilayah:</span>
                      <span className="font-bold text-stone-900 text-right">
                        {formData.rtRw || '(Belum diisi)'}
                      </span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-stone-400">Lokasi Arena:</span>
                      <span className="font-bold text-stone-900 text-right">
                        {OFFICIAL_LOCATION}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Info Card */}
            <div className="bg-stone-900 rounded-3xl p-6 text-white space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Gift className="w-4 h-4" />
                <span>Informasi Tambahan</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Setelah pendaftaran terkirim, Anda akan mendapatkan <strong>E-Tiket & Bukti Pendaftaran Resmi</strong> dengan ID Registrasi dan QR Code yang dapat langsung diunduh atau dicetak.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
