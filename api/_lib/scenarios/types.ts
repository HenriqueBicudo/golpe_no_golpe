export interface ScenarioConfig {
  id: string;
  title: string;
  category: "scam" | "legitimate";
  contactName: string;
  avatarAsset: string;
  teaser: string;
  difficulty: "iniciante" | "intermediario" | "avancado";
  openingMessages: string[];
  // Opcional: quando definido, a última mensagem de openingMessages é
  // renderizada como nota de voz (com o texto servindo de transcrição) em vez
  // de bolha de texto normal. O arquivo precisa existir em public/audio/.
  openingAudio?: {
    src: string;
    duration: string;
  };
  // Opcional: um trecho literal de texto (ex: uma URL) dentro da última
  // openingMessage que vira um botão clicável no chat. Clicar nele é falha
  // instantânea (usa endSummaries.lost) — não navega pra lugar nenhum, nunca
  // deve ser transformado num link real.
  trapLink?: string;
  // Opcional: padrões de dado sensível (ex: número de cartão) que, se
  // aparecerem numa mensagem do jogador, forçam derrota — checagem
  // determinística, porque o modelo local às vezes deixa passar.
  leakPatterns?: RegExp[];
  systemPrompt: string;
  maxTurns: number;
  endSummaries: {
    won: string;
    lost: string;
    timeout: string;
  };
}
