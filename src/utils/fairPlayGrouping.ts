import { RegisteredTicket, MatchGroup, MatchGroupParticipant, Competition } from '../types';

/**
 * Calculates accurate age from a YYYY-MM-DD birthdate string relative to Aug 17, 2026.
 */
export function calculateAge(birthDateString: string): number {
  if (!birthDateString) return 0;
  const birth = new Date(birthDateString);
  const eventDate = new Date('2026-08-17');

  let age = eventDate.getFullYear() - birth.getFullYear();
  const m = eventDate.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && eventDate.getDate() < birth.getDate())) {
    age--;
  }
  return Math.max(0, age);
}

/**
 * Rotates an array by a given offset
 */
function rotateArray<T>(arr: T[], offset: number): T[] {
  if (arr.length <= 1) return [...arr];
  const n = offset % arr.length;
  return [...arr.slice(n), ...arr.slice(0, n)];
}

/**
 * Algoritma Fair Play Grouping dengan Rotasi Lawan:
 * 1. Setiap kelompok berisi minimal 3 orang dan maksimal 4 orang peserta.
 * 2. Selisih usia maksimal dalam satu kelompok adalah 1 - 2 tahun.
 * 3. Rotasi Lawan: Ketika berpindah ke cabang lomba lain, urutan peserta dalam klaster usia dirotasi
 *    sehingga peserta tidak melawan orang yang sama terus-menerus.
 */
export function generateFairPlayGroups(
  tickets: RegisteredTicket[],
  competitions: Competition[]
): Record<string, MatchGroup[]> {
  const groupsByComp: Record<string, MatchGroup[]> = {};

  competitions.forEach((comp, compIndex) => {
    // Check if tickets are category-wide or specific to this competition
    // A participant in 'Anak-anak' can participate in all 'Anak-anak' competitions with 1 registration!
    const compTickets = tickets.filter(
      (t) =>
        t.competition.id === comp.id ||
        t.formData.competitionId === comp.id ||
        (comp.category === 'Anak-anak' && t.formData.ageCategory === 'Anak-anak') ||
        (comp.category === 'Dewasa' && (t.formData.ageCategory === 'Dewasa' || t.formData.ageCategory === 'Remaja'))
    );

    // Deduplicate participants by registration ID
    const uniqueMap = new Map<string, RegisteredTicket>();
    compTickets.forEach((t) => uniqueMap.set(t.registrationId, t));
    const uniqueTickets = Array.from(uniqueMap.values());

    // Map each ticket to a participant with calculated age
    const participants: MatchGroupParticipant[] = uniqueTickets.map((t) => {
      const age = t.formData.age || calculateAge(t.formData.birthDate);
      return {
        ticketId: t.registrationId,
        name: t.formData.fullName,
        phone: t.formData.phone,
        birthDate: t.formData.birthDate,
        age: age,
        rtRw: t.formData.rtRw,
      };
    });

    // Sort by age ascending
    participants.sort((a, b) => a.age - b.age);

    const compGroups: MatchGroup[] = [];
    let groupIndex = 1;

    // Cluster participants where adjacent elements have age difference <= 1-2 years
    let currentCluster: MatchGroupParticipant[] = [];

    const flushCluster = (cluster: MatchGroupParticipant[]) => {
      if (cluster.length === 0) return;

      // Apply rotation based on competition index so opponents change in every competition
      const rotationShift = compIndex * 2;
      const rotatedCluster = rotateArray(cluster, rotationShift);

      let i = 0;
      while (i < rotatedCluster.length) {
        const remaining = rotatedCluster.length - i;
        let chunkSize = 4;

        if (remaining >= 4) {
          if (remaining === 5) {
            chunkSize = 3;
          } else if (remaining === 6) {
            chunkSize = 3; // 3 + 3
          } else if (remaining === 7) {
            chunkSize = 4; // 4 + 3
          } else {
            chunkSize = 4;
          }
        } else {
          chunkSize = remaining;
        }

        const chunk = rotatedCluster.slice(i, i + chunkSize);
        i += chunkSize;

        const ages = chunk.map((p) => p.age);
        const minAge = Math.min(...ages);
        const maxAge = Math.max(...ages);
        const ageSpan = maxAge - minAge;

        const isReady = chunk.length >= 3 && chunk.length <= 4 && ageSpan <= 2;

        const groupLetter = String.fromCharCode(64 + groupIndex);
        const ageLabel = minAge === maxAge ? `${minAge} Thn` : `${minAge}-${maxAge} Thn`;

        compGroups.push({
          groupId: `${comp.id}-G${groupIndex}`,
          competitionId: comp.id,
          competitionTitle: comp.title,
          groupName: `Sesi/Grup ${groupLetter} (Usia ${ageLabel})`,
          minAge,
          maxAge,
          ageSpan,
          participants: chunk,
          status: isReady ? 'Siap Bertanding' : 'Menunggu Peserta',
          laneNumbers: chunk.map((_, idx) => idx + 1),
        });

        groupIndex++;
      }
    };

    for (let i = 0; i < participants.length; i++) {
      const p = participants[i];
      if (currentCluster.length === 0) {
        currentCluster.push(p);
      } else {
        const firstInCluster = currentCluster[0];
        // Age span limit 1-2 years
        if (p.age - firstInCluster.age <= 2) {
          currentCluster.push(p);
        } else {
          flushCluster(currentCluster);
          currentCluster = [p];
        }
      }
    }

    if (currentCluster.length > 0) {
      flushCluster(currentCluster);
    }

    groupsByComp[comp.id] = compGroups;
  });

  return groupsByComp;
}
