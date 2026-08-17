import { Competition } from '../types';

export const OFFICIAL_LOCATION = 'Pengalusan RT 004/001 (Di belakang Gado-Gado Mama Unik)';

export const INITIAL_COMPETITIONS: Competition[] = [
  // ================= KATEGORI ANAK-ANAK (JADWAL ACARA: 17 AGUSTUS 2026) =================
  {
    id: 'balap-kelereng',
    title: 'Balap Kelereng',
    slug: 'balap-kelereng',
    category: 'Anak-anak',
    type: 'Individu',
    description: 'Lomba klasik menguji keseimbangan dan ketenangan anak-anak membawa kelereng di atas sendok yang digigit dari garis start hingga finish.',
    rules: [
      'Gagang sendok digigit di mulut tanpa bantuan sentuhan tangan.',
      'Jika kelereng terjatuh di lintasan, peserta harus mengulang dari garis start.',
      'Dilarang sengaja menyenggol atau menghalangi lintasan peserta lain.',
      'Sistem tanding 3-4 anak per sesi lintasan dengan rotasi lawan.'
    ],
    maxQuota: 999,
    currentRegistered: 28,
    schedule: '17 Agustus 2026, 08:30 WIB',
    location: OFFICIAL_LOCATION,
    prizeSummary: 'Juara 1: Tabungan Rp 400.000 + Piala Emas + Paket Perlengkapan Sekolah',
    iconName: 'CircleDot',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    featured: true
  },
  {
    id: 'tusuk-air',
    title: 'Tusuk Air',
    slug: 'tusuk-air',
    category: 'Anak-anak',
    type: 'Individu',
    description: 'Keseruan memecahkan kantong plastik berisi air gantung dengan mata tertutup menggunakan jarum tumpul beraroma petualangan.',
    rules: [
      'Mata peserta ditutup dengan kain penutup khusus yang aman.',
      'Peserta diputar 3 kali sebelum melangkah menuju sasaran kantong air.',
      'Dipandu aba-aba suara penonton dan panitia pendamping.',
      'Peserta tercepat memecahkan kantong air dinyatakan sebagai pemenang sesi.'
    ],
    maxQuota: 999,
    currentRegistered: 24,
    schedule: '17 Agustus 2026, 09:15 WIB',
    location: OFFICIAL_LOCATION,
    prizeSummary: 'Juara 1: Uang Pembinaan Rp 350.000 + Medali + Bingkisan Merdeka',
    iconName: 'Droplets',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
    featured: true
  },
  {
    id: 'makan-kerupuk',
    title: 'Makan Kerupuk',
    slug: 'makan-kerupuk',
    category: 'Anak-anak',
    type: 'Individu',
    description: 'Lomba legendaris 17-an menghabiskan kerupuk putih renyah yang digantung tali rafia tanpa bantuan tangan.',
    rules: [
      'Kedua tangan peserta wajib diletakkan di belakang punggung.',
      'Kerupuk digantung setinggi dagu peserta sesuai kelompok tinggi badan.',
      'Peserta tercepat menghabiskan kerupuk hingga tali dinyatakan menang.'
    ],
    maxQuota: 999,
    currentRegistered: 36,
    schedule: '17 Agustus 2026, 10:00 WIB',
    location: OFFICIAL_LOCATION,
    prizeSummary: 'Juara 1: Tabungan Pendidikan Rp 500.000 + Piala + Hadiah Spesial',
    iconName: 'Utensils',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
    featured: true
  },
  {
    id: 'paku-botol-spion',
    title: 'Masukkan Paku dalam Botol Pakai Spion',
    slug: 'paku-botol-spion',
    category: 'Anak-anak',
    type: 'Individu',
    description: 'Tantangan konsentrasi tingkat tinggi memasukkan paku yang diikat tali di pinggang ke dalam botol dengan hanya melihat pantulan kaca spion!',
    rules: [
      'Paku digantung di belakang badan menggunakan tali pinggang.',
      'Peserta hanya boleh melihat pantulan posisi botol melalui cermin spion kecil.',
      'Dilarang memegang tali atau botol dengan tangan.',
      'Sistem tanding 3-4 anak per sesi pertandingan.'
    ],
    maxQuota: 999,
    currentRegistered: 20,
    schedule: '17 Agustus 2026, 10:45 WIB',
    location: OFFICIAL_LOCATION,
    prizeSummary: 'Juara 1: Smartwatch Anak + Uang Tunai Rp 400.000 + Trofi',
    iconName: 'Eye',
    tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
    featured: true
  },
  {
    id: 'balap-karung-helm',
    title: 'Balap Karung Pake Helm',
    slug: 'balap-karung-helm',
    category: 'Anak-anak',
    type: 'Individu',
    description: 'Balap karung modifikasi terheboh! Posisi jongkok di dalam karung goni tebal dengan memakai helm SNI lengkap.',
    rules: [
      'Peserta wajib mengenakan helm SNI berstandar keamanan panitia.',
      'Seluruh tubuh dari bahu ke bawah berada dalam karung dalam posisi jongkok.',
      'Melompat di lintasan sepanjang 10 meter hingga garis finish.',
      'Dilarang mendorong peserta di samping lintasan.'
    ],
    maxQuota: 999,
    currentRegistered: 28,
    schedule: '17 Agustus 2026, 11:30 WIB',
    location: OFFICIAL_LOCATION,
    prizeSummary: 'Juara 1: Sepeda BMX Mini + Piala Bergengsi + Piagam',
    iconName: 'ShieldAlert',
    tagColor: 'bg-red-50 text-red-700 border-red-200',
    featured: true
  },
  {
    id: 'sedotan-botol-anak',
    title: 'Sedotan dalam Botol',
    slug: 'sedotan-botol-anak',
    category: 'Anak-anak',
    type: 'Individu',
    description: 'Lomba ketangkasan memindahkan sedotan ke dalam botol kaca menggunakan bibir/hidung tanpa sentuhan tangan.',
    rules: [
      'Sedotan dijepit di antara bibir atas dan hidung.',
      'Peserta berjalan sejauh 5 meter lalu memasukkan sedotan ke mulut botol.',
      'Peserta dengan jumlah sedotan terbanyak dalam 2 menit menjadi pemenang.'
    ],
    maxQuota: 999,
    currentRegistered: 20,
    schedule: '17 Agustus 2026, 13:00 WIB',
    location: OFFICIAL_LOCATION,
    prizeSummary: 'Juara 1: Tas Sekolah + Uang Saku Rp 300.000 + Medali',
    iconName: 'GlassWater',
    tagColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    featured: false
  },
  {
    id: 'makan-biskuit-anak',
    title: 'Makan Biskuit',
    slug: 'makan-biskuit-anak',
    category: 'Anak-anak',
    type: 'Individu',
    description: 'Trik menggerakkan otot wajah untuk menggeser biskuit dari dahi hingga masuk ke mulut tanpa boleh jatuh ke lantai.',
    rules: [
      'Biskuit diletakkan di dahi peserta dengan posisi kepala sedikit mendongak.',
      'Dilarang menyentuh biskuit dengan tangan sama sekali.',
      'Jika biskuit terjatuh, panitia memberikan biskuit baru dan mengulang dari dahi.',
      'Peserta tercepat mengunyah biskuit dinyatakan juara.'
    ],
    maxQuota: 999,
    currentRegistered: 24,
    schedule: '17 Agustus 2026, 13:45 WIB',
    location: OFFICIAL_LOCATION,
    prizeSummary: 'Juara 1: Bingkisan Cokelat & Snack Raksasa + Rp 300.000',
    iconName: 'Cookie',
    tagColor: 'bg-orange-50 text-orange-700 border-orange-200',
    featured: false
  },

  // ================= KATEGORI DEWASA / IBU-IBU (JADWAL ACARA: 18 AGUSTUS 2026) =================
  {
    id: 'nyunggi-tampah-balon',
    title: 'Nyunggi Tampah Mengepit Balon',
    slug: 'nyunggi-tampah-balon',
    category: 'Dewasa',
    type: 'Individu',
    description: 'Kombinasi kelenturan dan keseimbangan! Berjalan cepat sambil menyunggi tampah anyaman bambu di atas kepala dan mengepit balon di antara kedua paha.',
    rules: [
      'Tampah bambu diletakkan di atas kepala tanpa boleh dipegang saat berjalan.',
      'Balon udara dikepit erat di antara kedua paha/lutut kaki.',
      'Jika tampah jatuh atau balon meletus/lepas, peserta wajib membetulkan di titik tersebut.',
      'Lintasan bolak-balik sepanjang 15 meter.'
    ],
    maxQuota: 999,
    currentRegistered: 28,
    schedule: '18 Agustus 2026, 08:30 WIB',
    location: OFFICIAL_LOCATION,
    prizeSummary: 'Juara 1: Magic Com Digital + Uang Tunai Rp 750.000 + Trofi',
    iconName: 'Crown',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
    featured: true
  },
  {
    id: 'ambil-karet-tepung',
    title: 'Ambil Karet dalam Tepung',
    slug: 'ambil-karet-tepung',
    category: 'Dewasa',
    type: 'Individu',
    description: 'Lomba penuh tawa! Mencari dan mengambil karet gelang yang tersembunyi di dalam baskom tepung putih menggunakan sedotan atau mulut.',
    rules: [
      'Peserta hanya menggunakan sedotan di mulut untuk mengait karet dalam tepung.',
      'Kedua tangan diletakkan di belakang pinggang.',
      'Wajah dipastikan terkena taburan tepung demi keseruan dan sportivitas.',
      'Pengambilan karet terbanyak dalam durasi 90 detik dinyatakan menang.'
    ],
    maxQuota: 999,
    currentRegistered: 24,
    schedule: '18 Agustus 2026, 09:30 WIB',
    location: OFFICIAL_LOCATION,
    prizeSummary: 'Juara 1: Kipas Angin Berdiri + Sembako Lengkap + Rp 600.000',
    iconName: 'Target',
    tagColor: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    featured: true
  },
  {
    id: 'makan-pisang',
    title: 'Makan Pisang',
    slug: 'makan-pisang',
    category: 'Dewasa',
    type: 'Individu',
    description: 'Keseruan makan pisang dengan mata tertutup penuh sensasi, menguji konsentrasi dan insting.',
    rules: [
      'Mata peserta ditutup rapat dengan kain penutup mata.',
      'Peserta harus membuka kulit pisang dan memakannya dengan mata tertutup.',
      'Dilarang membuka penutup mata sebelum aba-aba selesai.',
      'Peserta tercepat menghabiskan pisang dengan bersih menjadi juara.'
    ],
    maxQuota: 999,
    currentRegistered: 20,
    schedule: '18 Agustus 2026, 10:30 WIB',
    location: OFFICIAL_LOCATION,
    prizeSummary: 'Juara 1: Kompor Gas 2 Tungku + Uang Tunai Rp 800.000',
    iconName: 'Banana',
    tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
    featured: true
  },
  {
    id: 'tubruk-bangku',
    title: 'Tubruk Bangku',
    slug: 'tubruk-bangku',
    category: 'Dewasa',
    type: 'Individu',
    description: 'Permainan adu kelincahan dan refleks berputar mengelilingi formasi kursi sambil berjoget diiringi musik dangdut & lagu kemerdekaan, lalu berebut duduk saat musik berhenti!',
    rules: [
      'Peserta berjoget santai mengelilingi lingkaran bangku saat musik berputar.',
      'Ketika musik mendadak dihentikan panitia, peserta langsung berebut 1 kursi kosong.',
      'Peserta yang tidak kebagian kursi tereliminasi hingga tersisa 1 juara utama.',
      'Dilarang melakukan kontak fisik kasar atau menarik kursi peserta lain.'
    ],
    maxQuota: 999,
    currentRegistered: 28,
    schedule: '18 Agustus 2026, 13:30 WIB',
    location: OFFICIAL_LOCATION,
    prizeSummary: 'Juara 1: Dispenser Galon Bawah + Uang Tunai Rp 1.000.000 + Piala',
    iconName: 'Trophy',
    tagColor: 'bg-red-50 text-red-700 border-red-200',
    featured: true
  },
  {
    id: 'sedotan-botol-dewasa',
    title: 'Sedotan dalam Botol',
    slug: 'sedotan-botol-dewasa',
    category: 'Dewasa',
    type: 'Individu',
    description: 'Tantangan menjepit sedotan di atas bibir dan berlari zig-zag menuju botol kaca dengan konsentrasi penuh.',
    rules: [
      'Sedotan dijepit di antara bibir atas dan hidung.',
      'Peserta melintasi lintasan sejauh 10 meter.',
      'Memasukkan sedotan ke dalam mulut botol kecap/sirup.',
      'Sistem tanding 3-4 orang per sesi pertandingan.'
    ],
    maxQuota: 999,
    currentRegistered: 20,
    schedule: '18 Agustus 2026, 14:45 WIB',
    location: OFFICIAL_LOCATION,
    prizeSummary: 'Juara 1: Blender Multifungsi + Paket Sembako + Rp 500.000',
    iconName: 'GlassWater',
    tagColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    featured: false
  },
  {
    id: 'makan-biskuit-dewasa',
    title: 'Makan Biskuit',
    slug: 'makan-biskuit-dewasa',
    category: 'Dewasa',
    type: 'Individu',
    description: 'Adu ekspresi muka lucu para bapak-bapak dan ibu-ibu menggeser biskuit dari dahi ke mulut tanpa sentuhan tangan!',
    rules: [
      'Biskuit diletakkan persis di tengah dahi.',
      'Peserta hanya boleh menggerakkan mimik muka, alis, dan pipi.',
      'Dilarang menggunakan tangan atau menundukkan kepala berlebihan hingga jatuh.',
      'Peserta tercepat menelan biskuit berhak atas tiket babak final.'
    ],
    maxQuota: 999,
    currentRegistered: 24,
    schedule: '18 Agustus 2026, 15:45 WIB',
    location: OFFICIAL_LOCATION,
    prizeSummary: 'Juara 1: Setrika Uap + Uang Tunai Rp 600.000 + Trofi Lucu',
    iconName: 'Cookie',
    tagColor: 'bg-orange-50 text-orange-800 border-orange-200',
    featured: false
  }
];
