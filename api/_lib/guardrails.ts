function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

// Frases claras de risco (autolesão/suicídio). Checagem por palavra-chave, não
// julgada pela LLM, então não dá pra contornar via prompt injection.
const CRISIS_PATTERNS = [
  /quero morrer/,
  /vou me matar/,
  /quero me matar/,
  /pensando em suicidio/,
  /cometer suicidio/,
  /acabar com (a )?minha vida/,
  /tirar (a )?minha vida/,
  /nao aguento mais viver/,
  /nao vejo sentido em viver/,
  /quero me cortar/,
  /quero me machucar/,
];

export function isCrisisMessage(text: string): boolean {
  const normalized = normalize(text);
  return CRISIS_PATTERNS.some((pattern) => pattern.test(normalized));
}

export const CRISIS_SUPPORT_MESSAGE =
  "Percebi algo na sua mensagem que me preocupou, e isso é mais importante do que o jogo. " +
  "Se você está passando por um momento difícil, o CVV (Centro de Valorização da Vida) oferece apoio emocional gratuito e sigiloso, 24h por dia, todos os dias: ligue 188 ou acesse cvv.org.br. " +
  "Você não precisa passar por isso sozinho(a).";

// Filtro leve de saída: remove links reais (a IA não deveria estar
// direcionando o jogador pra fora do cenário fictício), um denylist curto de
// palavrões e travessões, sem bloquear a resposta inteira. O prompt já pede
// pra não usar travessão, mas o modelo escorrega e um único já denuncia que
// o texto é de IA.
const URL_PATTERN = /\bhttps?:\/\/\S+/gi;
const PROFANITY = [/porra/gi, /caralho/gi, /merda/gi, /puta que pariu/gi];

export function sanitizeOutput(text: string): string {
  let clean = text
    .replace(URL_PATTERN, "[link removido]")
    .replace(/\s*—\s*/g, ", ")
    .replace(/\s+–\s+/g, ", ")
    .replace(/^,\s*/, "")
    .replace(/,\s*([.,!?;:])/g, "$1");
  for (const word of PROFANITY) {
    clean = clean.replace(word, "***");
  }
  return clean;
}
