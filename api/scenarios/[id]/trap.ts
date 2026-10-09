import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getScenario } from "../../_lib/scenarios/index.ts";

// Falha instantânea e determinística (clicou no link armadilha) — não
// precisa da LLM, então nem chama o provider.
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const id = req.query.id;
  const scenario = typeof id === "string" ? getScenario(id) : undefined;

  if (!scenario || !scenario.trapLink) {
    res.status(404).json({ error: "No trap link for this scenario" });
    return;
  }

  res.status(200).json({
    status: "lost",
    matchedSignal: "clicked_trap_link",
    endSummary: scenario.endSummaries.lost,
  });
}
