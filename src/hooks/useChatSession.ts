import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../components/chat/MessageBubble";
import {
  fetchScenarioStart,
  postChatTurn,
  postEvaluation,
  postTrapClick,
  type Evaluation,
  type EvaluationOutcome,
} from "../lib/api";

export type GameStatus =
  | "loading"
  | "in_progress"
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

function now() {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export function useChatSession(scenarioId: string) {
  const [status, setStatus] = useState<GameStatus>("loading");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [endSummary, setEndSummary] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluationState>({ status: "idle" });
  // Incrementa a cada (re)início, pra descartar uma avaliação que chegue
  // depois de o jogador já ter clicado em "Tentar novamente".
  const sessionRef = useRef(0);

  const start = useCallback(async () => {
    sessionRef.current += 1;
    setStatus("loading");
    setMessages([]);
    setEndSummary(null);
    setEvaluation({ status: "idle" });
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

  const sendMessage = useCallback(
    async (text: string) => {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));

      setMessages((current) => [
        ...current,
        { id: `player-${Date.now()}`, role: "player", text, time: now() },
      ]);
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
    [messages, scenarioId],
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
    sendMessage,
    clickTrapLink,
    retryEvaluation: evaluate,
    restart: start,
  };
}
