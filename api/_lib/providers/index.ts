import type { LLMProvider } from "./types.ts";
import { ollamaProvider } from "./ollama.ts";
import { createOpenAICompatibleProvider, ProviderHttpError } from "./openaiCompatible.ts";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var ${name}`);
  return value;
}

function buildProvider(name: string): LLMProvider {
  switch (name) {
    // Só funciona com tudo rodando na mesma máquina — uma função da Vercel
    // não alcança um Ollama em localhost.
    case "ollama":
      return ollamaProvider;
    case "groq":
      return createOpenAICompatibleProvider({
        name: "groq",
        baseUrl: "https://api.groq.com/openai/v1",
        apiKey: requireEnv("GROQ_API_KEY"),
        model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
      });
    case "openrouter":
      return createOpenAICompatibleProvider({
        name: "openrouter",
        baseUrl: "https://openrouter.ai/api/v1",
        apiKey: requireEnv("OPENROUTER_API_KEY"),
        // Os modelos gratuitos do OpenRouter mudam com frequência, então não
        // tem valor padrão: escolha um ":free" em openrouter.ai/models.
        model: requireEnv("OPENROUTER_MODEL"),
      });
    default:
      throw new Error(`Unknown LLM provider "${name}"`);
  }
}

// Vale tentar o próximo provider quando o atual bateu no limite do plano
// gratuito (429), está instável (5xx) ou nem respondeu (erro de rede).
// Chave errada (401/403) ou pedido inválido (400) não melhoram trocando.
function shouldFallBack(error: unknown): boolean {
  if (error instanceof ProviderHttpError) {
    return error.status === 429 || error.status >= 500;
  }
  return error instanceof TypeError; // fetch lança TypeError em falha de rede
}

// LLM_PROVIDER aceita uma lista separada por vírgula (ex: "groq,openrouter"):
// o primeiro é o principal e os seguintes só são usados se o anterior falhar.
export function getProvider(): LLMProvider {
  const names = (process.env.LLM_PROVIDER ?? "ollama")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
  const providers = names.map(buildProvider);

  if (providers.length === 1) return providers[0];

  return {
    name: names.join(","),
    async generate(messages, options) {
      let lastError: unknown;
      for (const provider of providers) {
        try {
          return await provider.generate(messages, options);
        } catch (error) {
          lastError = error;
          if (!shouldFallBack(error)) throw error;
          console.warn(`[providers] ${provider.name} failed, trying next provider`, error);
        }
      }
      throw lastError;
    },
  };
}
