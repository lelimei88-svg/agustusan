import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { RegisteredTicket } from '../types';
import { INITIAL_COMPETITIONS } from '../data/competitionsData';

const REGISTRATIONS_COLLECTION = 'registrations';

/**
 * Save a registration ticket to Cloud Firestore
 */
export async function saveTicketToFirestore(ticket: RegisteredTicket): Promise<void> {
  try {
    const docRef = doc(db, REGISTRATIONS_COLLECTION, ticket.registrationId);
    await setDoc(docRef, {
      registrationId: ticket.registrationId,
      fullName: ticket.formData.fullName,
      birthDate: ticket.formData.birthDate || '',
      age: ticket.formData.age || 0,
      ageCategory: ticket.formData.ageCategory,
      rtRw: ticket.formData.rtRw || '',
      phone: ticket.formData.phone || '',
      email: ticket.formData.email || '',
      competitionId: ticket.competition.id,
      competitionTitle: ticket.competition.title,
      registeredAt: ticket.registeredAt,
      status: ticket.status || 'Terkonfirmasi',
      assignedGroupId: ticket.assignedGroupId || '',
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${REGISTRATIONS_COLLECTION}/${ticket.registrationId}`);
  }
}

/**
 * Delete a registration ticket from Cloud Firestore
 */
export async function deleteTicketFromFirestore(registrationId: string): Promise<void> {
  try {
    const docRef = doc(db, REGISTRATIONS_COLLECTION, registrationId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${REGISTRATIONS_COLLECTION}/${registrationId}`);
  }
}

/**
 * Subscribe to realtime updates of registrations
 */
export function subscribeToRegistrations(
  onUpdate: (tickets: RegisteredTicket[]) => void,
  onError?: (error: unknown) => void
) {
  const colRef = collection(db, REGISTRATIONS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const tickets: RegisteredTicket[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const matchedComp =
          INITIAL_COMPETITIONS.find((c) => c.id === data.competitionId) || INITIAL_COMPETITIONS[0];

        return {
          registrationId: data.registrationId || docSnap.id,
          registeredAt: data.registeredAt || '17 Agustus 2026',
          status: (data.status as 'Terkonfirmasi' | 'Menunggu Verifikasi') || 'Terkonfirmasi',
          assignedGroupId: data.assignedGroupId || undefined,
          competition: matchedComp,
          formData: {
            fullName: data.fullName || 'Peserta',
            birthDate: data.birthDate || '',
            age: data.age || 0,
            ageCategory: data.ageCategory || 'Anak-anak',
            rtRw: data.rtRw || 'RT 004 / RW 001',
            phone: data.phone || '',
            email: data.email || '',
            competitionId: data.competitionId || matchedComp.id,
            agreedTerms: true,
          },
        };
      });
      onUpdate(tickets);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, REGISTRATIONS_COLLECTION);
    }
  );
}
