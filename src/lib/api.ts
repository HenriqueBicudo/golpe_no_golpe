export interface ScenarioSummary {
  id: string;
  title: string;
  teaser: string;
  difficulty: "iniciante" | "intermediario" | "avancado";
  avatarAsset: string;
}

export interface ScenarioStart {
  contactName: string;
  avatarAsset: string;
  openingMessages: string[];
  openingAudio: { src: string; duration: string } | null;
  trapLink: string | null;
  maxTurns: number;
}

export interface ChatTurnRequest {
  scenarioId: string;
  history: { role: "npc" | "player"; text: string }[];
  message: string;
}

export interface ChatTurnResponse {
  reply: string | null;
  status: "in_progress" | "won" | "lost" | "timeout" | "safety_stop";
  matchedSignal: string | null;
  endSummary: string | null;
  turnCount: number;
}

export interface TrapResponse {
  status: "lost";
  matchedSignal: string;
  endSummary: string;
}

export async function fetchScenarios(): Promise<ScenarioSummary[]> {
  const response = await fetch("/api/scenarios");
  if (!response.ok) throw new Error("Failed to load scenarios");
  return response.json();
}

export async function fetchScenarioStart(scenarioId: string): Promise<ScenarioStart> {
  const response = await fetch(`/api/scenarios/${scenarioId}/start`);
  if (!response.ok) throw new Error("Failed to load scenario");
  return response.json();
}

export async function postChatTurn(payload: ChatTurnRequest): Promise<ChatTurnResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Failed to send message");
  return response.json();
}

export async function postTrapClick(scenarioId: string): Promise<TrapResponse> {
  const response = await fetch(`/api/scenarios/${scenarioId}/trap`, { method: "POST" });
  if (!response.ok) throw new Error("Failed to register trap click");
  return response.json();
}

export type EvaluationOutcome = "won" | "lost" | "timeout";

export interface EvaluationRequest {
  scenarioId: string;
  outcome: EvaluationOutcome;
  history: { role: "npc" | "player"; text: string }[];
}

export interface Evaluation {
  score: number;
  rating: string;
  positives: string[];
  negatives: string[];
  tip: string;
  wasScam: boolean;
}

export async function postEvaluation(payload: EvaluationRequest): Promise<Evaluation> {
  const response = await fetch("/api/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Failed to evaluate conversation");
  return response.json();
}
