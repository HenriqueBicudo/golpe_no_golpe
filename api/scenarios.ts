import type { VercelRequest, VercelResponse } from "@vercel/node";
import { listScenarios } from "./_lib/scenarios/index.js";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  // "category" (scam vs. legitimate) is deliberately left out — showing it
  // upfront would spoil the point of scenarios like "suporte-verdadeiro".
  const catalog = listScenarios().map((scenario) => ({
    id: scenario.id,
    title: scenario.title,
    teaser: scenario.teaser,
    difficulty: scenario.difficulty,
    avatarAsset: scenario.avatarAsset,
  }));

  res.status(200).json(catalog);
}
