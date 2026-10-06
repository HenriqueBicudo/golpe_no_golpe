import { useEffect, useRef, useState } from "react";
import { Play, Pause, AlertTriangle } from "lucide-react";

interface VoiceMessageBubbleProps {
  src: string;
  duration: string;
  transcript: string;
  time: string;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function VoiceMessageBubble({ src, duration, transcript, time }: VoiceMessageBubbleProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setErrored(false);
  }, [src]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || errored) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => setErrored(true));
    }
  }

  const progress = totalTime ? Math.min(currentTime / totalTime, 1) : 0;

  return (
    <div className="voice-bubble">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setTotalTime(e.currentTarget.duration)}
        onError={() => setErrored(true)}
      />

      <button
        className="voice-bubble__play"
        onClick={togglePlay}
        disabled={errored}
        aria-label={isPlaying ? "Pausar áudio" : "Reproduzir áudio"}
      >
        {errored ? (
          <AlertTriangle size={16} />
        ) : isPlaying ? (
          <Pause size={16} fill="currentColor" />
        ) : (
          <Play size={16} fill="currentColor" />
        )}
      </button>

      <div className="voice-bubble__body">
        <div className="voice-bubble__track">
          <div className="voice-bubble__progress" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="voice-bubble__meta">
          <span>
            {errored
              ? "Áudio indisponível"
              : `${formatTime(currentTime)} / ${totalTime ? formatTime(totalTime) : duration}`}
          </span>
          <button
            className="voice-bubble__transcript-toggle"
            onClick={() => setShowTranscript((v) => !v)}
          >
            {showTranscript ? "ocultar transcrição" : "ver transcrição"}
          </button>
        </div>
        {showTranscript && <p className="voice-bubble__transcript">{transcript}</p>}
      </div>

      <span className="bubble__time voice-bubble__time">{time}</span>
    </div>
  );
}
