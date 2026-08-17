import React, { useState, useEffect } from 'react';
import { Competition, RegistrationFormData, RegisteredTicket } from './types';
import { INITIAL_COMPETITIONS } from './data/competitionsData';
import { SEED_REGISTRANTS } from './data/seedRegistrants';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CompetitionList } from './components/CompetitionList';
import { RegistrationForm } from './components/RegistrationForm';
import { ScheduleSection } from './components/ScheduleSection';
import { FaqSection } from './components/FaqSection';
import { SuccessModal } from './components/SuccessModal';
import { MyTicketsDrawer } from './components/MyTicketsDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { MusicPlayerWidget } from './components/MusicPlayerWidget';
import { Footer } from './components/Footer';
import { Shield } from 'lucide-react';
import { testFirestoreConnection } from './firebase';
import {
  saveTicketToFirestore,
  deleteTicketFromFirestore,
  subscribeToRegistrations,
} from './services/firestoreService';

export default function App() {
  // LocalStorage keys
  const STORAGE_KEY_TICKETS = 'lomba_agustusan_tickets_v2';
  const STORAGE_KEY_COMPS = 'lomba_agustusan_comps_v2';
  const STORAGE_KEY_ADMIN = 'lomba_agustusan_admin_auth';

  // Current view: 'public' (User landing/registration) | 'admin' (Panitia Dashboard)
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_ADMIN) === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Competitions state with persistence
  const [competitions, setCompetitions] = useState<Competition[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved competitions', e);
    }
    return INITIAL_COMPETITIONS;
  });

  // Registered tickets state with seed initializers & Cloud Firestore Sync
  const [registeredTickets, setRegisteredTickets] = useState<RegisteredTicket[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TICKETS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved tickets', e);
    }
    return SEED_REGISTRANTS;
  });

  const [selectedCompetitionId, setSelectedCompetitionId] = useState<string | null>(null);
  const [activeTicketModal, setActiveTicketModal] = useState<RegisteredTicket | null>(null);
  const [isTicketsDrawerOpen, setIsTicketsDrawerOpen] = useState(false);

  // Initialize and test Firebase connection
  useEffect(() => {
    testFirestoreConnection();
  }, []);

  // Realtime Cloud Firestore Synchronization for Registrations
  useEffect(() => {
    const unsubscribe = subscribeToRegistrations(
      (firestoreTickets) => {
        if (firestoreTickets && firestoreTickets.length > 0) {
          setRegisteredTickets(firestoreTickets);
        }
      },
      (err) => {
        console.warn('Firestore subscription status:', err);
      }
    );

    return () => unsubscribe();
  }, []);

  // Sync to local storage as fallback
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(registeredTickets));
    } catch (e) {
      console.error('Error saving tickets', e);
    }
  }, [registeredTickets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPS, JSON.stringify(competitions));
    } catch (e) {
      console.error('Error saving competitions', e);
    }
  }, [competitions]);

  const handleSelectCompetitionFromCard = (comp: Competition) => {
    setSelectedCompetitionId(comp.id);
    const formElement = document.getElementById('form-pendaftaran');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToRegistration = () => {
    const formElement = document.getElementById('form-pendaftaran');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToCategories = () => {
    const catElement = document.getElementById('kategori-lomba');
    if (catElement) {
      catElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRegistrationSubmit = async (
    formData: RegistrationFormData,
    comp: Competition
  ) => {
    // Generate unique Indonesian Independence registration code e.g. RI81-BALA-7392
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `RI81-${comp.slug.substring(0, 4).toUpperCase()}-${randomSuffix}`;
    const nowFormatted = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WIB';

    const newTicket: RegisteredTicket = {
      registrationId: code,
      registeredAt: nowFormatted,
      competition: comp,
      formData: formData,
      status: 'Terkonfirmasi',
    };

    // Increment competition registered count
    setCompetitions((prev) =>
      prev.map((c) =>
        c.id === comp.id ? { ...c, currentRegistered: c.currentRegistered + 1 } : c
      )
    );

    // Save ticket to local state & Firestore database
    setRegisteredTickets((prev) => [newTicket, ...prev]);
    saveTicketToFirestore(newTicket).catch((err) => {
      console.warn('Persisted locally, cloud sync pending:', err);
    });

    // Show celebratory modal
    setActiveTicketModal(newTicket);
  };

  const handleDeleteTicket = async (regId: string) => {
    const ticketToDelete = registeredTickets.find((t) => t.registrationId === regId);
    if (ticketToDelete) {
      // Decrement competition registration count if possible
      setCompetitions((prev) =>
        prev.map((c) =>
          c.id === ticketToDelete.competition.id
            ? { ...c, currentRegistered: Math.max(0, c.currentRegistered - 1) }
            : c
        )
      );
    }
    setRegisteredTickets((prev) => prev.filter((t) => t.registrationId !== regId));
    deleteTicketFromFirestore(regId).catch((err) => {
      console.warn('Deleted locally:', err);
    });
  };

  const handleRequestAdminAccess = () => {
    if (isAdminAuthenticated) {
      setCurrentView('admin');
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN, 'true');
    } catch (e) {
      console.error(e);
    }
    setIsAdminLoginModalOpen(false);
    setCurrentView('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEY_ADMIN);
    } catch (e) {
      console.error(e);
    }
    setCurrentView('public');
  };

  // If Admin view is active, render Admin Dashboard
  if (currentView === 'admin' && isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col selection:bg-red-600 selection:text-white relative">
        <AdminDashboard
          competitions={competitions}
          tickets={registeredTickets}
          onUpdateCompetitions={(newComps) => setCompetitions(newComps)}
          onUpdateTickets={(newTickets) => setRegisteredTickets(newTickets)}
          onViewTicket={(ticket) => setActiveTicketModal(ticket)}
          onBackToPublic={() => setCurrentView('public')}
          onLogout={handleAdminLogout}
        />

        {/* Floating Music Player Widget */}
        <MusicPlayerWidget />

        {/* E-Ticket Modal viewed from Admin */}
        <SuccessModal
          ticket={activeTicketModal}
          allTickets={registeredTickets}
          onClose={() => setActiveTicketModal(null)}
          onRegisterAnother={() => {
            setActiveTicketModal(null);
            setCurrentView('public');
            scrollToRegistration();
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-red-600 selection:text-white relative">
      {/* Navigation Bar */}
      <Navbar
        onOpenTickets={() => setIsTicketsDrawerOpen(true)}
        ticketCount={registeredTickets.length}
        onOpenAdmin={handleRequestAdminAccess}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          onRegisterClick={scrollToRegistration}
          onExploreClick={scrollToCategories}
          totalCompetitions={competitions.length}
        />

        <CompetitionList
          competitions={competitions}
          selectedCompetitionId={selectedCompetitionId}
          onSelectCompetition={handleSelectCompetitionFromCard}
        />

        <RegistrationForm
          competitions={competitions}
          selectedCompetitionId={selectedCompetitionId}
          onSelectCompetitionId={(id) => setSelectedCompetitionId(id)}
          onSubmitRegistration={handleRegistrationSubmit}
        />

        <ScheduleSection />

        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Music Player Widget */}
      <MusicPlayerWidget />

      {/* Floating Admin Toggle Quick Button */}
      <div className="fixed bottom-5 right-5 z-30">
        <button
          onClick={handleRequestAdminAccess}
          className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full shadow-2xl border border-stone-700 font-bold text-xs hover:scale-105 transition-all cursor-pointer"
          title="Buka Panel Admin & Fair Play Matchmaking"
        >
          <Shield className="w-4 h-4 text-red-500" />
          <span>Panel Admin & Fair Play</span>
        </button>
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Success Registration / E-Ticket Modal */}
      <SuccessModal
        ticket={activeTicketModal}
        allTickets={registeredTickets}
        onClose={() => setActiveTicketModal(null)}
        onRegisterAnother={() => {
          setSelectedCompetitionId(null);
          scrollToRegistration();
        }}
      />

      {/* My Tickets Drawer */}
      <MyTicketsDrawer
        isOpen={isTicketsDrawerOpen}
        onClose={() => setIsTicketsDrawerOpen(false)}
        tickets={registeredTickets}
        onSelectTicket={(t) => setActiveTicketModal(t)}
        onDeleteTicket={handleDeleteTicket}
        onRegisterNew={() => {
          setSelectedCompetitionId(null);
          scrollToRegistration();
        }}
      />
    </div>
  );
}

