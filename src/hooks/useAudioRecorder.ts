import { useCallback, useEffect, useRef, useState } from "react";

export type RecorderState = "idle" | "starting" | "recording";

interface UseAudioRecorderOptions {
  maxSeconds: number;
  onComplete: (audio: Blob, seconds: number) => void;
}

// Menos que isso costuma ser toque acidental no botão, não uma fala.
const MIN_SECONDS = 1;

export function useAudioRecorder({ maxSeconds, onComplete }: UseAudioRecorderOptions) {
  const [state, setState] = useState<RecorderState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);
  const cancelledRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const cleanup = useCallback(() => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    recorderRef.current = null;
    setElapsed(0);
    setState("idle");
  }, []);

  const stop = useCallback(() => {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }, []);

  const cancel = useCallback(() => {
    cancelledRef.current = true;
    stop();
  }, [stop]);

  const start = useCallback(async () => {
    setError(null);
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Seu navegador não permite gravar áudio. Digite sua resposta.");
      return;
    }

    setState("starting");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setState("idle");
      setError("Não consegui acessar o microfone. Libere a permissão no navegador ou digite sua resposta.");
      return;
    }

    const recorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];
    cancelledRef.current = false;
    streamRef.current = stream;
    recorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };
    recorder.onstop = () => {
      const seconds = (Date.now() - startedAtRef.current) / 1000;
      const wasCancelled = cancelledRef.current;
      cleanup();
      if (wasCancelled) return;
      if (seconds < MIN_SECONDS) {
        setError("Áudio muito curto. Fale por pelo menos um segundo.");
        return;
      }
      onCompleteRef.current(new Blob(chunks, { type: recorder.mimeType }), seconds);
    };

    recorder.start();
    startedAtRef.current = Date.now();
    setState("recording");
    timerRef.current = window.setInterval(() => {
      const seconds = Math.floor((Date.now() - startedAtRef.current) / 1000);
      setElapsed(seconds);
      if (seconds >= maxSeconds) recorder.stop();
    }, 250);
  }, [cleanup, maxSeconds]);

  // Saiu da tela no meio da gravação: descarta e libera o microfone.
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, []);

  return { state, elapsed, error, clearError: () => setError(null), start, stop, cancel };
}
