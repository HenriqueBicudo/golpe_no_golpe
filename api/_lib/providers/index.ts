import type { LLMProvider } from "./types.ts";
import { ollamaProvider } from "./ollama.ts";

// GroqProvider (hosted, used for the Vercel deploy) is added in a later pass —
// Vercel functions can't reach an Ollama daemon on localhost, so LLM_PROVIDER=ollama
// only works when the whole stack runs on the same machine.
export function getProvider(): LLMProvider {
  const provider = process.env.LLM_PROVIDER ?? "ollama";

  switch (provider) {
    case "ollama":
      return ollamaProvider;
    default:
      throw new Error(`Unknown LLM_PROVIDER "${provider}"`);
  }
}
