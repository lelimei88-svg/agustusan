export type AgeCategory = 'Anak-anak' | 'Remaja' | 'Dewasa' | 'Semua Usia';
export type CompetitionType = 'Individu' | 'Beregu';

export interface Competition {
  id: string;
  title: string;
  slug: string;
  category: AgeCategory;
  type: CompetitionType;
  teamSize?: number;
  description: string;
  rules: string[];
  maxQuota: number;
  currentRegistered: number;
  schedule: string;
  location: string;
  prizeSummary: string;
  iconName: string;
  tagColor: string;
  featured?: boolean;
}

export interface RegistrationFormData {
  fullName: string;
  phone: string;
  email?: string;
  birthDate: string; // YYYY-MM-DD
  age?: number; // Calculated age in years
  ageCategory: AgeCategory;
  competitionId: string;
  rtRw: string;
  teamName?: string;
  teamMembers?: string;
  notes?: string;
  agreedTerms: boolean;
}

export interface RegisteredTicket {
  registrationId: string;
  registeredAt: string;
  competition: Competition;
  formData: RegistrationFormData;
  status: 'Terkonfirmasi' | 'Menunggu Verifikasi';
  assignedGroupId?: string;
}

export interface MatchGroupParticipant {
  ticketId: string;
  name: string;
  phone: string;
  birthDate: string;
  age: number;
  rtRw: string;
  teamName?: string;
}

export interface MatchGroup {
  groupId: string;
  competitionId: string;
  competitionTitle: string;
  groupName: string; // e.g. "Grup A (Usia 8-9 Thn)"
  minAge: number;
  maxAge: number;
  ageSpan: number; // maxAge - minAge (Must be <= 1 for strict Fair Play)
  participants: MatchGroupParticipant[];
  status: 'Siap Bertanding' | 'Menunggu Peserta'; // 'Siap Bertanding' if count 3-4 and span <= 1
  laneNumbers: number[];
}
