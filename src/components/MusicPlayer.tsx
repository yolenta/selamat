'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, SkipForward, Music2, Volume2 } from 'lucide-react';

export type Track = { src: string; title?: string };

export default function MusicPlayer({
  playlist = [],
  autoPlay = false,
  loop = true,
  showNext = true,        // 👈 prop baru
}: {
  playlist?: Track[];
  autoPlay?: boolean;
  loop?: boolean;
  showNext?: boolean;     // 👈 prop baru
}) {
  const list = useMemo(
    () => (playlist.length ? playlist : [
      { src: '/music/kubahagiakauterlahirdidunia.mp3', title: 'Happy Birthday' },
      { src: '/music/kubahagiakauterlahirdidunia.mp3', title: 'Happy Birthday' },
    ]),
    [playlist]
  );

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const current = list[index] ?? list[0];

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = current.src;
    if (playing) {
      void audioRef.current.play().catch(() => setPlaying(false));
    }
  }, [current?.src]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      void audioRef.current.play().catch(() => setPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  // Autoplay + “polite unlock” (kalau diblokir browser, akan jalan setelah tap pertama)
  useEffect(() => {
    if (!audioRef.current || !autoPlay) return;
    const el = audioRef.current;
    el.src = current.src;

    const tryPlay = () => el.play().then(() => setPlaying(true));
    tryPlay().catch(() => {
      const unlock = () => {
        tryPlay().then(() => {
          window.removeEventListener('pointerdown', unlock);
          window.removeEventListener('keydown', unlock);
          window.removeEventListener('touchstart', unlock);
        }).catch(() => {});
      };
      window.addEventListener('pointerdown', unlock, { once: true });
      window.addEventListener('keydown', unlock, { once: true });
      window.addEventListener('touchstart', unlock, { once: true });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  const next = () => setIndex((i) => (i + 1) % list.length);

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center">
      <div className="flex items-center gap-3 rounded-full bg-white/90 backdrop-blur px-4 py-2 shadow-lg ring-1 ring-slate-200">
        <Music2 className="h-4 w-4 text-slate-500" />
        <button
          onClick={() => setPlaying((p) => !p)}
          className="h-8 w-8 rounded-full border border-slate-200 bg-white/70 grid place-items-center hover:bg-white active:scale-95"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        {showNext && (
          <button onClick={next} className="h-8 px-3 rounded-full border border-slate-200 bg-white/70 text-sm hover:bg-white">
            <div className="flex items-center gap-1"><SkipForward className="h-4 w-4" /> Next</div>
          </button>
        )}

        <div className="text-sm max-w-[40vw] md:max-w-xs truncate" title={current?.title || current?.src}>
          {current?.title || current?.src}
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-slate-500" />
          <input type="range" min={0} max={1} step={0.01} value={volume}
                 onChange={(e) => setVolume(Number(e.target.value))} />
        </div>

        <audio
          ref={audioRef}
          preload="metadata"
          onEnded={() => (loop ? next() : setPlaying(false))}
        />
      </div>
    </div>
  );
}
