import React, { useState, useEffect } from 'react';
import { audioController, NATIONAL_SONGS } from '../utils/audioPlayer';
import { Sparkles, Volume2, VolumeX, Flag, Trophy, Play, CheckCircle2 } from 'lucide-react';

interface CountdownModalProps {
  isOpen: boolean;
  competitionTitle: string;
  onComplete: () => void;
  onClose: () => void;
}

export const CountdownModal: React.FC<CountdownModalProps> = ({
  isOpen,
  competitionTitle,
  onComplete,
  onClose,
}) => {
  const [countdown, setCountdown] = useState<number>(5);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setIsFinished(false);
      return;
    }

    setCountdown(5);
    setIsFinished(false);

    // Initial tick
    if (!isMuted) {
      audioController.playCountdownTick(5);
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          if (!isMuted) {
            audioController.playVictoryFanfare();
            // Start Hari Merdeka anthem after fanfare
            setTimeout(() => {
              audioController.playSong(NATIONAL_SONGS[0]);
            }, 1200);
          }
          onComplete();
          return 0;
        }
        const nextCount = prev - 1;
        if (!isMuted) {
          audioController.playCountdownTick(nextCount);
        }
        return nextCount;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isOpen, isMuted, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
      {/* Background Patriotic Glow */}
      <div className="absolute inset-0 bg-radial from-red-600/20 via-transparent to-black pointer-events-none" />

      <div className="relative bg-gradient-to-b from-stone-900 via-stone-900 to-red-950 text-white rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center border-2 border-red-500/40 shadow-2xl shadow-red-600/30 overflow-hidden">
        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/30 border border-red-500/40 text-red-200 text-xs font-bold uppercase tracking-widest mb-6">
          <Flag className="w-3.5 h-3.5 text-red-400" />
          <span>HUT RI KE-81 • SEMARAK KEMERDEKAAN</span>
        </div>

        <h3 className="font-heading font-black text-xl sm:text-2xl text-white mb-2 tracking-tight">
          {competitionTitle}
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 mb-8 font-medium">
          Persiapan Undian & Pertandingan Fair Play
        </p>

        {/* Countdown Center Display */}
        <div className="my-8 flex items-center justify-center">
          {!isFinished ? (
            <div className="relative">
              {/* Outer pulsing ring */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-red-500/30 flex items-center justify-center animate-ping absolute inset-0 opacity-40" />
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-amber-500 flex flex-col items-center justify-center shadow-2xl shadow-red-600/50 border-4 border-white/80 transform hover:scale-105 transition-all">
                <span className="font-heading font-black text-6xl sm:text-8xl text-white tracking-tighter drop-shadow-md">
                  {countdown}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-amber-200 uppercase tracking-wider -mt-1">
                  Detik Menuju Mulai
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-bounce">
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/50 border-4 border-white">
                <Trophy className="w-12 h-12 text-amber-300" />
              </div>
              <div>
                <h4 className="font-heading font-black text-2xl sm:text-3xl text-amber-300 tracking-tight">
                  MERDEKA! PERTANDINGAN DIMULAI!
                </h4>
                <p className="text-xs text-stone-200 mt-1">
                  Bagan turnamen dan sesi Fair Play telah siap bertanding.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Music Playing Notification */}
        {isFinished && (
          <div className="my-4 p-3 bg-red-950/80 border border-red-500/40 rounded-2xl flex items-center justify-center gap-2 text-xs text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>Memutar Lagu Nasional: <strong>Hari Merdeka</strong></span>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold flex items-center gap-1.5 transition-all"
            title={isMuted ? 'Nyalakan Audio' : 'Matikan Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span>{isMuted ? 'Audio Off' : 'Audio On'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/40 transition-all flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isFinished ? 'Tutup & Lihat Bagan' : 'Lewati Hitungan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
