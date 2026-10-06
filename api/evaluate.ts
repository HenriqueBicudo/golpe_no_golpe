import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getScenario } from "./_lib/scenarios/index.ts";
import { getProvider } from "./_lib/providers/index.ts";
import { buildEvaluationMessages, parseEvaluation, type EvaluationOutcome } from "./_lib/evaluation.ts";
import { sanitizeOutput } from "./_lib/guardrails.ts";
import type { ChatMessage } from "./_lib/providers/types.ts";

interface EvaluateRequestBody {
  scenarioId: string;
  outcome: EvaluationOutcome;
  history: { role: "npc" | "player"; text: string }[];
}

const OUTCOMES: EvaluationOutcome[] = ["won", "lost", "timeout"];
const MAX_HISTORY_ENTRIES = 60;
const MAX_ENTRY_LENGTH = 2000;

function isValidHistory(history: unknown): history is EvaluateRequestBody["history"] {
  return (
    Array.isArray(history) &&
    history.length > 0 &&
    history.length <= MAX_HISTORY_ENTRIES &&
    history.every(
      (entry) =>
        (entry?.role === "npc" || entry?.role === "player") &&
        typeof entry.text === "string" &&
        entry.text.length <= MAX_ENTRY_LENGTH,
    )
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { scenarioId, outcome, history } = (req.body ?? {}) as Partial<EvaluateRequestBody>;

  if (!scenarioId || !outcome || !OUTCOMES.includes(outcome) || !isValidHistory(history)) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const scenario = getScenario(scenarioId);
  if (!scenario) {
    res.status(404).json({ error: "Unknown scenario" });
    return;
  }

  const messages = buildEvaluationMessages(scenario, outcome, history);
  const provider = getProvider();

  try {
    // Temperatura baixa: a mesma conversa deve receber uma nota parecida
    // se o jogador pedir a avaliação de novo.
    let evaluation = parseEvaluation(
      await provider.generate(messages, { temperature: 0.3 }),
      scenario,
      outcome,
    );

    if (!evaluation) {
      const repairMessages: ChatMessage[] = [
        ...messages,
        { role: "user", content: "Sua última resposta não era um JSON válido. Responda novamente APENAS com o JSON no formato pedido." },
      ];
      evaluation = parseEvaluation(
        await provider.generate(repairMessages, { temperature: 0.3 }),
        scenario,
        outcome,
      );
    }

    if (!evaluation) {
      res.status(502).json({ error: "Evaluation could not be parsed" });
      return;
    }

    res.status(200).json({
      ...evaluation,
      positives: evaluation.positives.map(sanitizeOutput),
      negatives: evaluation.negatives.map(sanitizeOutput),
      tip: sanitizeOutput(evaluation.tip),
    });
  } catch (error) {
    console.error("evaluate handler error", error);
    res.status(502).json({ error: "LLM provider request failed" });
  }
}
