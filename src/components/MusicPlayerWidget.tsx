import React, { useState, useEffect } from 'react';
import { audioController, NATIONAL_SONGS, SongTrack } from '../utils/audioPlayer';
import { Music, Play, Pause, Square, Volume2, VolumeX, Sparkles, Flag, ChevronUp, ChevronDown } from 'lucide-react';

export const MusicPlayerWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const currentSong: SongTrack = NATIONAL_SONGS[currentSongIndex];

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioController.stop();
      setIsPlaying(false);
    } else {
      audioController.playSong(currentSong, () => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const handleSelectSong = (index: number) => {
    setCurrentSongIndex(index);
    audioController.stop();
    audioController.playSong(NATIONAL_SONGS[index], () => {
      setIsPlaying(false);
    });
    setIsPlaying(true);
  };

  const handleStop = () => {
    audioController.stop();
    setIsPlaying(false);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 select-none">
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-2xl border transition-all transform hover:scale-105 cursor-pointer ${
            isPlaying
              ? 'bg-red-700 text-white border-red-400 shadow-red-600/50 animate-pulse'
              : 'bg-stone-900 text-stone-200 border-stone-700 hover:bg-stone-800'
          }`}
          title="Buka Pemutar Lagu Kemerdekaan"
        >
          <Music className={`w-4 h-4 ${isPlaying ? 'text-amber-300 animate-bounce' : 'text-red-500'}`} />
          <span className="text-xs font-bold font-heading">
            {isPlaying ? `Memutar: ${currentSong.title}` : 'Lagu Kemerdekaan RI'}
          </span>
          {isPlaying && (
            <div className="flex items-center gap-0.5 ml-1">
              <span className="w-1 h-3 bg-white rounded-full animate-pulse" />
              <span className="w-1 h-4 bg-white rounded-full animate-bounce" />
              <span className="w-1 h-2 bg-white rounded-full animate-pulse" />
            </div>
          )}
        </button>
      ) : (
        <div className="bg-stone-900/95 backdrop-blur-md text-white rounded-3xl p-4 sm:p-5 border border-stone-700 shadow-2xl max-w-xs sm:max-w-sm w-full space-y-3 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <h4 className="font-heading font-black text-xs sm:text-sm text-white flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-red-500" />
                <span>Pemutar Musik Kemerdekaan</span>
              </h4>
            </div>
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              title="Kecilkan Pemutar"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Current Playing Track Info */}
          <div className="bg-stone-800/80 rounded-2xl p-3 border border-stone-700/60">
            <p className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
              {isPlaying ? 'Sedang Diputar:' : 'Siap Diputar:'}
            </p>
            <h5 className="font-heading font-bold text-xs sm:text-sm text-white truncate mt-0.5">
              {currentSong.title}
            </h5>
            <p className="text-[10px] text-stone-400">Cipt: {currentSong.composer}</p>

            {/* Equalizer Visualizer Bars */}
            <div className="flex items-end gap-1 h-4 mt-2">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-red-500' : 'bg-stone-700'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(20, (Math.sin(i + Date.now() / 300) + 1) * 50)}%` : '20%',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Song Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              Pilih Lagu Nasional:
            </label>
            <div className="grid grid-cols-1 gap-1">
              {NATIONAL_SONGS.map((song, idx) => (
                <button
                  key={song.id}
                  onClick={() => handleSelectSong(idx)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                    currentSongIndex === idx
                      ? 'bg-red-600 text-white font-bold'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  <span className="truncate">{song.title}</span>
                  {currentSongIndex === idx && isPlaying && (
                    <Volume2 className="w-3.5 h-3.5 text-amber-300 flex-shrink-0 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePlay}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl flex items-center gap-1.5 shadow-md shadow-red-600/30 transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Jeda' : 'Putar'}</span>
              </button>
              {isPlaying && (
                <button
                  onClick={handleStop}
                  className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs transition-colors"
                  title="Berhenti"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsCollapsed(true)}
              className="text-[11px] text-stone-400 hover:text-stone-200 underline"
            >
              Tutup Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
