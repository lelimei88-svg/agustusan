/**
 * Audio Engine for Independence Day Songs and 5-Second Countdown Sound Effects
 * Uses Web Audio API for guaranteed cross-browser synthesizers (brass marches, drums, countdown beeps, fanfare)
 * + HTML5 Audio support for streaming national anthems.
 */

// Synthesized melody notes for "Hari Merdeka (17 Agustus 45)"
// Frequencies in Hz
const NOTES: Record<string, number> = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
  C6: 1046.50
};

// "Tujuh belas agustus tahun empat lima..."
const HARI_MERDEKA_SCORE = [
  { note: 'G4', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'E4', dur: 0.35 }, { note: 'G4', dur: 0.35 },
  { note: 'C5', dur: 0.7 }, { note: 'G4', dur: 0.7 },
  { note: 'E4', dur: 0.35 }, { note: 'F4', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'A4', dur: 0.35 },
  { note: 'G4', dur: 0.7 }, { note: 'E4', dur: 0.7 },
  { note: 'G4', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'E4', dur: 0.35 }, { note: 'G4', dur: 0.35 },
  { note: 'C5', dur: 0.7 }, { note: 'G4', dur: 0.7 },
  { note: 'A4', dur: 0.35 }, { note: 'B4', dur: 0.35 }, { note: 'C5', dur: 0.35 }, { note: 'D5', dur: 0.35 },
  { note: 'C5', dur: 0.9 },
  // Refrain: "Sekali merdeka tetap merdeka..."
  { note: 'C5', dur: 0.35 }, { note: 'C5', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'C5', dur: 0.35 },
  { note: 'E5', dur: 0.7 }, { note: 'C5', dur: 0.7 },
  { note: 'D5', dur: 0.35 }, { note: 'C5', dur: 0.35 }, { note: 'B4', dur: 0.35 }, { note: 'A4', dur: 0.35 },
  { note: 'G4', dur: 0.9 },
  // "Kita tetap setia tetap sedia mempertahankan Indonesia..."
  { note: 'G4', dur: 0.35 }, { note: 'C5', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'C5', dur: 0.35 },
  { note: 'D5', dur: 0.35 }, { note: 'E5', dur: 0.35 }, { note: 'D5', dur: 0.7 },
  { note: 'C5', dur: 0.35 }, { note: 'B4', dur: 0.35 }, { note: 'C5', dur: 0.9 }
];

// "Maju Tak Gentar Membela yang Benar..."
const MAJU_TAK_GENTAR_SCORE = [
  { note: 'C4', dur: 0.35 }, { note: 'E4', dur: 0.35 }, { note: 'G4', dur: 0.5 }, { note: 'G4', dur: 0.5 },
  { note: 'A4', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'E4', dur: 0.7 },
  { note: 'F4', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'A4', dur: 0.5 }, { note: 'F4', dur: 0.5 },
  { note: 'E4', dur: 0.35 }, { note: 'D4', dur: 0.35 }, { note: 'C4', dur: 0.8 },
  { note: 'C4', dur: 0.35 }, { note: 'E4', dur: 0.35 }, { note: 'G4', dur: 0.5 }, { note: 'C5', dur: 0.5 },
  { note: 'B4', dur: 0.35 }, { note: 'A4', dur: 0.35 }, { note: 'G4', dur: 0.8 }
];

export interface SongTrack {
  id: string;
  title: string;
  composer: string;
  score: Array<{ note: string; dur: number }>;
  tempo: number; // in BPM
}

export const NATIONAL_SONGS: SongTrack[] = [
  {
    id: 'hari-merdeka',
    title: 'Hari Merdeka (17 Agustus 1945)',
    composer: 'H. Mutahar',
    score: HARI_MERDEKA_SCORE,
    tempo: 120,
  },
  {
    id: 'maju-tak-gentar',
    title: 'Maju Tak Gentar',
    composer: 'Cornel Simanjuntak',
    score: MAJU_TAK_GENTAR_SCORE,
    tempo: 110,
  },
];

class AudioController {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTimeout: any = null;
  private gainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Plays a beep for the 5-second countdown (pitch changes per count)
   */
  public playCountdownTick(count: number) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pitch increases as countdown approaches 1
      const frequencies = [880, 784, 698, 659, 587, 523];
      const freq = frequencies[count] || 600;

      osc.type = count === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {
      console.warn('Audio tick failed:', e);
    }
  }

  /**
   * Plays a triumphant brass fanfare when timer hits 0 (MERDEKA!)
   */
  public playVictoryFanfare() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const chords = [
        { notes: [523.25, 659.25, 783.99], dur: 0.2 }, // C Maj
        { notes: [587.33, 698.46, 880.00], dur: 0.2 }, // D Min
        { notes: [659.25, 783.99, 1046.50], dur: 0.25 }, // E Min
        { notes: [783.99, 987.77, 1174.66], dur: 0.3 }, // G Maj
        { notes: [1046.50, 1318.51, 1567.98], dur: 0.9 }, // High C Maj
      ];

      let timeOffset = this.ctx.currentTime;
      chords.forEach((chord) => {
        chord.notes.forEach((freq) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, timeOffset);

          gain.gain.setValueAtTime(0.12, timeOffset);
          gain.gain.exponentialRampToValueAtTime(0.001, timeOffset + chord.dur);

          osc.connect(gain);
          gain.connect(this.ctx!.destination);

          osc.start(timeOffset);
          osc.stop(timeOffset + chord.dur);
        });
        timeOffset += chord.dur * 0.9;
      });
    } catch (e) {
      console.warn('Victory fanfare failed:', e);
    }
  }

  /**
   * Plays a national anthem / march synthesized score
   */
  public playSong(song: SongTrack, onEnded?: () => void) {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.isPlaying = true;
    let noteIndex = 0;
    const score = song.score;

    const playNextNote = () => {
      if (!this.isPlaying || noteIndex >= score.length) {
        this.isPlaying = false;
        if (onEnded) onEnded();
        return;
      }

      const item = score[noteIndex];
      const freq = NOTES[item.note] || 440;
      const duration = item.dur;

      if (this.ctx) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Brass-like march timbre
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration * 0.95);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      }

      noteIndex++;
      this.currentTimeout = setTimeout(playNextNote, duration * 1000);
    };

    playNextNote();
  }

  public stop() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioController = new AudioController();
