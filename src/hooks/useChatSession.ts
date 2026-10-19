import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../components/chat/MessageBubble";
import {
  fetchScenarioStart,
  postChatTurn,
  postEvaluation,
  postTranscription,
  postTrapClick,
  type Evaluation,
  type EvaluationOutcome,
} from "../lib/api";

export type GameStatus =
  | "loading"
  | "in_progress"
  | "transcribing"
  | "sending"
  | "won"
  | "lost"
  | "timeout"
  | "safety_stop"
  | "error";

export type EvaluationState =
  | { status: "idle" | "loading" | "error" }
  | { status: "done"; data: Evaluation };

interface ContactInfo {
  name: string;
  avatarAsset: string;
}

function isEvaluable(status: GameStatus): status is EvaluationOutcome {
  return status === "won" || status === "lost" || status === "timeout";
}

// Mesmo limite do servidor (api/chat.ts): ~1 minuto de fala transcrita.
const MAX_MESSAGE_LENGTH = 1000;

function formatDuration(seconds: number): string {
  const rounded = Math.round(seconds);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}

function now() {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export function useChatSession(scenarioId: string) {
  const [status, setStatus] = useState<GameStatus>("loading");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [endSummary, setEndSummary] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluationState>({ status: "idle" });
  // Aviso curto acima do campo de texto (ex: áudio que não deu pra entender).
  const [notice, setNotice] = useState<string | null>(null);
  // Incrementa a cada (re)início, pra descartar uma avaliação que chegue
  // depois de o jogador já ter clicado em "Tentar novamente".
  const sessionRef = useRef(0);

  const start = useCallback(async () => {
    sessionRef.current += 1;
    setStatus("loading");
    setEndSummary(null);
    setEvaluation({ status: "idle" });
    setNotice(null);
    setMessages((current) => {
      // Libera da memória os áudios gravados pelo jogador na partida anterior.
      for (const m of current) {
        if (m.audioSrc?.startsWith("blob:")) URL.revokeObjectURL(m.audioSrc);
      }
      return [];
    });
    try {
      const data = await fetchScenarioStart(scenarioId);
      setContact({ name: data.contactName, avatarAsset: data.avatarAsset });
      const lastIndex = data.openingMessages.length - 1;
      setMessages(
        data.openingMessages.map((text, index) => ({
          id: `opening-${index}`,
          role: "npc",
          text,
          time: now(),
          ...(data.openingAudio && index === lastIndex
            ? { audioSrc: data.openingAudio.src, audioDuration: data.openingAudio.duration }
            : {}),
          ...(data.trapLink && text.includes(data.trapLink)
            ? { trapLink: data.trapLink }
            : {}),
        })),
      );
      setStatus("in_progress");
    } catch {
      setStatus("error");
    }
  }, [scenarioId]);

  useEffect(() => {
    start();
  }, [start]);

  const runTurn = useCallback(
    async (history: { role: "npc" | "player"; text: string }[], text: string) => {
      setStatus("sending");
      try {
        const response = await postChatTurn({ scenarioId, history, message: text });

        if (response.reply) {
          setMessages((current) => [
            ...current,
            { id: `npc-${Date.now()}`, role: "npc", text: response.reply as string, time: now() },
          ]);
        }

        setStatus(response.status);
        if (response.endSummary) setEndSummary(response.endSummary);
      } catch {
        setStatus("error");
      }
    },
    [scenarioId],
  );

  const sendMessage = useCallback(
    (text: string) => {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      setNotice(null);
      setMessages((current) => [
        ...current,
        { id: `player-${Date.now()}`, role: "player", text, time: now() },
      ]);
      runTurn(history, text);
    },
    [messages, runTurn],
  );

  // O áudio aparece na hora como nota de voz do jogador; depois de transcrito,
  // só o texto vai para a IA (o personagem "lê" o que foi falado).
  const sendAudio = useCallback(
    async (audio: Blob, seconds: number) => {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      const id = `player-audio-${Date.now()}`;
      const audioSrc = URL.createObjectURL(audio);
      const removeBubble = () => {
        URL.revokeObjectURL(audioSrc);
        setMessages((current) => current.filter((m) => m.id !== id));
        setStatus("in_progress");
      };

      setNotice(null);
      setMessages((current) => [
        ...current,
        { id, role: "player", text: "", time: now(), audioSrc, audioDuration: formatDuration(seconds), pending: true },
      ]);
      setStatus("transcribing");

      let text: string;
      try {
        text = (await postTranscription(audio)).slice(0, MAX_MESSAGE_LENGTH);
      } catch {
        removeBubble();
        setNotice("Não consegui transcrever o áudio agora. Tente de novo ou digite sua resposta.");
        return;
      }

      if (!text) {
        removeBubble();
        setNotice("Não entendi o áudio. Tente falar mais perto do microfone ou digite sua resposta.");
        return;
      }

      setMessages((current) => current.map((m) => (m.id === id ? { ...m, text, pending: false } : m)));
      runTurn(history, text);
    },
    [messages, runTurn],
  );

  const clickTrapLink = useCallback(async () => {
    if (status !== "in_progress") return;
    setMessages((current) => [
      ...current,
      { id: `player-trap-${Date.now()}`, role: "player", text: "🔗 [Link aberto]", time: now() },
    ]);
    setStatus("sending");
    try {
      const response = await postTrapClick(scenarioId);
      setStatus(response.status);
      setEndSummary(response.endSummary);
    } catch {
      setStatus("error");
    }
  }, [scenarioId, status]);

  const evaluate = useCallback(async () => {
    if (!isEvaluable(status)) return;
    const session = sessionRef.current;
    setEvaluation({ status: "loading" });
    try {
      const data = await postEvaluation({
        scenarioId,
        outcome: status,
        history: messages.map((m) => ({ role: m.role, text: m.text })),
      });
      if (sessionRef.current === session) setEvaluation({ status: "done", data });
    } catch {
      if (sessionRef.current === session) setEvaluation({ status: "error" });
    }
  }, [messages, scenarioId, status]);

  useEffect(() => {
    if (isEvaluable(status) && evaluation.status === "idle") evaluate();
  }, [status, evaluation.status, evaluate]);

  return {
    status,
    messages,
    contact,
    endSummary,
    evaluation,
    notice,
    sendMessage,
    sendAudio,
    clickTrapLink,
    retryEvaluation: evaluate,
    restart: start,
  };
}
