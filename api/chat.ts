import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getScenario } from "./_lib/scenarios/index.js";
import { buildSystemPrompt } from "./_lib/promptBuilder.js";
import { getProvider } from "./_lib/providers/index.js";
import { parseLLMTurn } from "./_lib/responseSchema.js";
import { isCrisisMessage, CRISIS_SUPPORT_MESSAGE, sanitizeOutput } from "./_lib/guardrails.js";
import type { ChatMessage } from "./_lib/providers/types.js";

interface ChatRequestBody {
  scenarioId: string;
  history: { role: "npc" | "player"; text: string }[];
  message: string;
}

const MAX_MESSAGE_LENGTH = 500;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body as Partial<ChatRequestBody>;
  const { scenarioId, history, message } = body;

  if (!scenarioId || !Array.isArray(history) || typeof message !== "string") {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    res.status(400).json({ error: "Message too long" });
    return;
  }

  // Checagem por palavra-chave, não pela LLM — não dá pra contornar via prompt.
  // Se disparar, pula o modelo por completo e encerra a sessão com apoio real.
  if (isCrisisMessage(message)) {
    res.status(200).json({
      reply: null,
      status: "safety_stop",
      matchedSignal: "crisis_language",
      endSummary: CRISIS_SUPPORT_MESSAGE,
      turnCount: history.filter((entry) => entry.role === "player").length + 1,
    });
    return;
  }

  const scenario = getScenario(scenarioId);
  if (!scenario) {
    res.status(404).json({ error: "Unknown scenario" });
    return;
  }

  const turnCount = history.filter((entry) => entry.role === "player").length + 1;

  if (turnCount > scenario.maxTurns) {
    res.status(200).json({
      reply: null,
      status: "timeout",
      endSummary: scenario.endSummaries.timeout,
      turnCount,
    });
    return;
  }

  const systemPrompt = buildSystemPrompt(scenario);
  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...scenario.openingMessages.map((text): ChatMessage => ({ role: "assistant", content: text })),
    ...history.map(
      (entry): ChatMessage => ({
        role: entry.role === "npc" ? "assistant" : "user",
        content: entry.text,
      }),
    ),
    { role: "user", content: message },
  ];

  const provider = getProvider();

  try {
    let turn = parseLLMTurn(await provider.generate(messages));

    if (!turn) {
      // one repair attempt: ask the model to resend as valid JSON only
      const repairMessages: ChatMessage[] = [
        ...messages,
        { role: "user", content: "Sua última resposta não era um JSON válido. Responda novamente APENAS com o JSON no formato pedido." },
      ];
      turn = parseLLMTurn(await provider.generate(repairMessages));
    }

    if (!turn) {
      res.status(200).json({
        reply: "Desculpe, tive um problema técnico. Pode repetir?",
        status: "in_progress",
        matchedSignal: null,
        endSummary: null,
        turnCount,
      });
      return;
    }

    if (turn.matchedSignal === "jailbreak_attempt") {
      console.warn(`[guardrails] jailbreak attempt on scenario "${scenarioId}", turn ${turnCount}`);
    }

    const leakedSensitiveData = scenario.leakPatterns?.some((pattern) => pattern.test(message)) ?? false;
    const status = leakedSensitiveData ? "lost" : turn.status;
    res.status(200).json({
      reply: sanitizeOutput(turn.reply),
      status,
      matchedSignal: leakedSensitiveData ? "leaked_sensitive_data" : (turn.matchedSignal ?? null),
      endSummary: status === "won" ? scenario.endSummaries.won : status === "lost" ? scenario.endSummaries.lost : null,
      turnCount,
    });
  } catch (error) {
    console.error("chat handler error", error);
    res.status(502).json({ error: "LLM provider request failed" });
  }
}
