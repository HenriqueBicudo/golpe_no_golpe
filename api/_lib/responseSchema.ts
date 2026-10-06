import { z } from "zod";

export const llmTurnSchema = z.object({
  reply: z.string().min(1),
  status: z.enum(["in_progress", "won", "lost"]),
  matchedSignal: z.string().nullable().optional(),
});

export type LLMTurn = z.infer<typeof llmTurnSchema>;

export function parseLLMTurn(raw: string): LLMTurn | null {
  try {
    const parsed = JSON.parse(raw);
    const result = llmTurnSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
