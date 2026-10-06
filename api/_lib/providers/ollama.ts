import type { ChatMessage, GenerateOptions, LLMProvider } from "./types.ts";

const BASE_URL = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
const MODEL = process.env.OLLAMA_MODEL ?? "qwen2.5:7b-instruct";

export const ollamaProvider: LLMProvider = {
  name: "ollama",
  async generate(messages: ChatMessage[], options?: GenerateOptions): Promise<string> {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages,
        stream: false,
        format: "json",
        options: { temperature: options?.temperature ?? 0.8 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama request failed: ${response.status} ${await response.text()}`);
    }

    const data = (await response.json()) as { message?: { content?: string } };
    const content = data.message?.content;
    if (!content) {
      throw new Error("Ollama response had no message content");
    }
    return content;
  },
};
