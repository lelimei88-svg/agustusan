import { RegisteredTicket } from '../types';
import { INITIAL_COMPETITIONS } from './competitionsData';

export const SEED_REGISTRANTS: RegisteredTicket[] = [
  // ================= 1. Balap Kelereng (Anak-anak: Usia 7, 8, 8, 8, 9, 9, 9, 10) =================
  {
    registrationId: 'RI81-KELE-101',
    registeredAt: '14 Agu 2026, 08:15 WIB',
    competition: INITIAL_COMPETITIONS[0], // Balap Kelereng
    formData: {
      fullName: 'Rian Saputra',
      phone: '081234567801',
      birthDate: '2018-05-12', // 8 thn
      age: 8,
      ageCategory: 'Anak-anak',
      competitionId: 'balap-kelereng',
      rtRw: 'RT 01 / RW 03',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-KELE-102',
    registeredAt: '14 Agu 2026, 08:20 WIB',
    competition: INITIAL_COMPETITIONS[0],
    formData: {
      fullName: 'Aditya Pratama',
      phone: '081234567802',
      birthDate: '2019-01-04', // 7 thn
      age: 7,
      ageCategory: 'Anak-anak',
      competitionId: 'balap-kelereng',
      rtRw: 'RT 02 / RW 03',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-KELE-103',
    registeredAt: '14 Agu 2026, 08:35 WIB',
    competition: INITIAL_COMPETITIONS[0],
    formData: {
      fullName: 'Dimas Kurniawan',
      phone: '081234567803',
      birthDate: '2018-03-21', // 8 thn
      age: 8,
      ageCategory: 'Anak-anak',
      competitionId: 'balap-kelereng',
      rtRw: 'RT 04 / RW 03',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-KELE-104',
    registeredAt: '14 Agu 2026, 09:00 WIB',
    competition: INITIAL_COMPETITIONS[0],
    formData: {
      fullName: 'Gilang Ramadhan',
      phone: '081234567804',
      birthDate: '2018-07-19', // 8 thn
      age: 8,
      ageCategory: 'Anak-anak',
      competitionId: 'balap-kelereng',
      rtRw: 'RT 03 / RW 03',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-KELE-105',
    registeredAt: '14 Agu 2026, 09:15 WIB',
    competition: INITIAL_COMPETITIONS[0],
    formData: {
      fullName: 'Fajar Nugraha',
      phone: '081234567805',
      birthDate: '2017-02-14', // 9 thn
      age: 9,
      ageCategory: 'Anak-anak',
      competitionId: 'balap-kelereng',
      rtRw: 'RT 01 / RW 04',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-KELE-106',
    registeredAt: '14 Agu 2026, 09:30 WIB',
    competition: INITIAL_COMPETITIONS[0],
    formData: {
      fullName: 'Bagas Wahyu',
      phone: '081234567806',
      birthDate: '2017-08-09', // 9 thn
      age: 9,
      ageCategory: 'Anak-anak',
      competitionId: 'balap-kelereng',
      rtRw: 'RT 02 / RW 04',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-KELE-107',
    registeredAt: '14 Agu 2026, 10:00 WIB',
    competition: INITIAL_COMPETITIONS[0],
    formData: {
      fullName: 'Rizky Alamsyah',
      phone: '081234567807',
      birthDate: '2016-12-05', // 9 thn
      age: 9,
      ageCategory: 'Anak-anak',
      competitionId: 'balap-kelereng',
      rtRw: 'RT 05 / RW 04',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-KELE-108',
    registeredAt: '14 Agu 2026, 10:15 WIB',
    competition: INITIAL_COMPETITIONS[0],
    formData: {
      fullName: 'Kenzo Alif',
      phone: '081234567808',
      birthDate: '2016-06-11', // 10 thn
      age: 10,
      ageCategory: 'Anak-anak',
      competitionId: 'balap-kelereng',
      rtRw: 'RT 02 / RW 01',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },

  // ================= 2. Balap Karung Pake Helm (Anak-anak) =================
  {
    registrationId: 'RI81-BALA-201',
    registeredAt: '14 Agu 2026, 10:30 WIB',
    competition: INITIAL_COMPETITIONS[4], // Balap Karung Pake Helm
    formData: {
      fullName: 'Arkan Malik',
      phone: '081234567810',
      birthDate: '2017-04-12', // 9 thn
      age: 9,
      ageCategory: 'Anak-anak',
      competitionId: 'balap-karung-helm',
      rtRw: 'RT 03 / RW 02',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-BALA-202',
    registeredAt: '14 Agu 2026, 10:45 WIB',
    competition: INITIAL_COMPETITIONS[4],
    formData: {
      fullName: 'Kevin Sanjaya',
      phone: '081234567811',
      birthDate: '2017-09-18', // 9 thn
      age: 9,
      ageCategory: 'Anak-anak',
      competitionId: 'balap-karung-helm',
      rtRw: 'RT 01 / RW 02',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-BALA-203',
    registeredAt: '14 Agu 2026, 11:00 WIB',
    competition: INITIAL_COMPETITIONS[4],
    formData: {
      fullName: 'Dafa Pratama',
      phone: '081234567812',
      birthDate: '2016-11-25', // 9 thn / 10 thn
      age: 10,
      ageCategory: 'Anak-anak',
      competitionId: 'balap-karung-helm',
      rtRw: 'RT 04 / RW 02',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-BALA-204',
    registeredAt: '14 Agu 2026, 11:15 WIB',
    competition: INITIAL_COMPETITIONS[4],
    formData: {
      fullName: 'Reza Mahardika',
      phone: '081234567813',
      birthDate: '2016-03-10', // 10 thn
      age: 10,
      ageCategory: 'Anak-anak',
      competitionId: 'balap-karung-helm',
      rtRw: 'RT 02 / RW 04',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },

  // ================= 3. Makan Kerupuk (Anak-anak) =================
  {
    registrationId: 'RI81-MAKA-301',
    registeredAt: '14 Agu 2026, 11:30 WIB',
    competition: INITIAL_COMPETITIONS[2], // Makan Kerupuk
    formData: {
      fullName: 'Aisyah Putri',
      phone: '081234567814',
      birthDate: '2019-04-10', // 7 thn
      age: 7,
      ageCategory: 'Anak-anak',
      competitionId: 'makan-kerupuk',
      rtRw: 'RT 03 / RW 02',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-MAKA-302',
    registeredAt: '14 Agu 2026, 11:45 WIB',
    competition: INITIAL_COMPETITIONS[2],
    formData: {
      fullName: 'Nayla Zahra',
      phone: '081234567815',
      birthDate: '2019-09-18', // 7 thn
      age: 7,
      ageCategory: 'Anak-anak',
      competitionId: 'makan-kerupuk',
      rtRw: 'RT 01 / RW 02',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-MAKA-303',
    registeredAt: '14 Agu 2026, 12:00 WIB',
    competition: INITIAL_COMPETITIONS[2],
    formData: {
      fullName: 'Siti Rahma',
      phone: '081234567816',
      birthDate: '2019-01-25', // 7 thn
      age: 7,
      ageCategory: 'Anak-anak',
      competitionId: 'makan-kerupuk',
      rtRw: 'RT 04 / RW 02',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-MAKA-304',
    registeredAt: '14 Agu 2026, 12:15 WIB',
    competition: INITIAL_COMPETITIONS[2],
    formData: {
      fullName: 'Keysha Maharani',
      phone: '081234567817',
      birthDate: '2018-08-30', // 8 thn
      age: 8,
      ageCategory: 'Anak-anak',
      competitionId: 'makan-kerupuk',
      rtRw: 'RT 02 / RW 01',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },

  // ================= 4. Nyunggi Tampah Mengepit Balon (Dewasa) =================
  {
    registrationId: 'RI81-TAMP-401',
    registeredAt: '14 Agu 2026, 13:00 WIB',
    competition: INITIAL_COMPETITIONS[7], // Nyunggi Tampah Mengepit Balon
    formData: {
      fullName: 'Ibu Ratna Dewi',
      phone: '081234567820',
      birthDate: '1990-05-15', // 36 thn
      age: 36,
      ageCategory: 'Dewasa',
      competitionId: 'nyunggi-tampah-balon',
      rtRw: 'RT 02 / RW 01',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-TAMP-402',
    registeredAt: '14 Agu 2026, 13:15 WIB',
    competition: INITIAL_COMPETITIONS[7],
    formData: {
      fullName: 'Ibu Sri Wahyuni',
      phone: '081234567821',
      birthDate: '1989-11-20', // 36 thn / 37 thn
      age: 36,
      ageCategory: 'Dewasa',
      competitionId: 'nyunggi-tampah-balon',
      rtRw: 'RT 03 / RW 01',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-TAMP-403',
    registeredAt: '14 Agu 2026, 13:30 WIB',
    competition: INITIAL_COMPETITIONS[7],
    formData: {
      fullName: 'Ibu Endang Lestari',
      phone: '081234567822',
      birthDate: '1990-02-10', // 36 thn
      age: 36,
      ageCategory: 'Dewasa',
      competitionId: 'nyunggi-tampah-balon',
      rtRw: 'RT 05 / RW 01',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-TAMP-404',
    registeredAt: '14 Agu 2026, 13:45 WIB',
    competition: INITIAL_COMPETITIONS[7],
    formData: {
      fullName: 'Ibu Nur Hidayah',
      phone: '081234567823',
      birthDate: '1989-08-14', // 37 thn
      age: 37,
      ageCategory: 'Dewasa',
      competitionId: 'nyunggi-tampah-balon',
      rtRw: 'RT 01 / RW 01',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },

  // ================= 5. Tubruk Bangku (Dewasa) =================
  {
    registrationId: 'RI81-TUBR-501',
    registeredAt: '14 Agu 2026, 14:00 WIB',
    competition: INITIAL_COMPETITIONS[10], // Tubruk Bangku
    formData: {
      fullName: 'Bambang Sudiro',
      phone: '081234567830',
      birthDate: '2004-03-15', // 22 thn
      age: 22,
      ageCategory: 'Dewasa',
      competitionId: 'tubruk-bangku',
      rtRw: 'RT 02 / RW 01',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-TUBR-502',
    registeredAt: '14 Agu 2026, 14:15 WIB',
    competition: INITIAL_COMPETITIONS[10],
    formData: {
      fullName: 'Supardi Utomo',
      phone: '081234567831',
      birthDate: '2003-06-20', // 23 thn
      age: 23,
      ageCategory: 'Dewasa',
      competitionId: 'tubruk-bangku',
      rtRw: 'RT 03 / RW 01',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-TUBR-503',
    registeredAt: '14 Agu 2026, 14:30 WIB',
    competition: INITIAL_COMPETITIONS[10],
    formData: {
      fullName: 'Heru Prasetyo',
      phone: '081234567832',
      birthDate: '2004-10-10', // 22 thn
      age: 22,
      ageCategory: 'Dewasa',
      competitionId: 'tubruk-bangku',
      rtRw: 'RT 05 / RW 01',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
  {
    registrationId: 'RI81-TUBR-504',
    registeredAt: '14 Agu 2026, 14:45 WIB',
    competition: INITIAL_COMPETITIONS[10],
    formData: {
      fullName: 'Danang Wijaya',
      phone: '081234567833',
      birthDate: '2003-12-01', // 22 thn / 23 thn
      age: 23,
      ageCategory: 'Dewasa',
      competitionId: 'tubruk-bangku',
      rtRw: 'RT 01 / RW 02',
      agreedTerms: true,
    },
    status: 'Terkonfirmasi',
  },
];
