import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getScenario } from "../../_lib/scenarios/index.ts";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const id = req.query.id;
  const scenario = typeof id === "string" ? getScenario(id) : undefined;

  if (!scenario) {
    res.status(404).json({ error: "Unknown scenario" });
    return;
  }

  res.status(200).json({
    contactName: scenario.contactName,
    avatarAsset: scenario.avatarAsset,
    openingMessages: scenario.openingMessages,
    openingAudio: scenario.openingAudio ?? null,
    trapLink: scenario.trapLink ?? null,
    maxTurns: scenario.maxTurns,
  });
}
