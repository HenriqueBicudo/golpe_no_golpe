import type { ChatMessage, GenerateOptions, LLMProvider } from "./types.js";

interface OpenAICompatibleConfig {
  name: string;
  baseUrl: string;
  apiKey: string;
  model: string;
}

// Erro com o status HTTP, pra cadeia de fallback saber se vale tentar o
// próximo provider (limite de uso, instabilidade) ou não.
export class ProviderHttpError extends Error {
  status: number;

  constructor(providerName: string, status: number, body: string) {
    super(`${providerName} request failed: ${status} ${body.slice(0, 300)}`);
    this.status = status;
  }
}

// Groq, OpenRouter e a maioria das APIs hospedadas falam o mesmo formato
// do endpoint /chat/completions da OpenAI — muda só a URL, a chave e o modelo.
export function createOpenAICompatibleProvider(config: OpenAICompatibleConfig): LLMProvider {
  return {
    name: config.name,
    async generate(messages: ChatMessage[], options?: GenerateOptions): Promise<string> {
      const response = await fetch(`${config.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.model,
          messages,
          temperature: options?.temperature ?? 0.8,
          response_format: { type: "json_object" },
        }),
      });

      if (!response.ok) {
        throw new ProviderHttpError(config.name, response.status, await response.text());
      }

      const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error(`${config.name} response had no message content`);
      }
      return content;
    },
  };
}
