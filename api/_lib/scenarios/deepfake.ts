import type { ScenarioConfig } from "./types.ts";

export const deepfake: ScenarioConfig = {
  id: "deepfake",
  title: "Áudio Clonado",
  category: "scam",
  contactName: "Miguel (celular novo)",
  avatarAsset: "f84f1481efac81e5b383112caf2a4f6c.jpg",
  teaser: "Um áudio com a voz idêntica à do seu neto pede ajuda urgente.",
  difficulty: "avancado",
  openingMessages: [
    "🎤 Áudio (0:16) — \"Vózinha/vôzinho, é o Miguel! Perdi meu celular e tô ligando de outro número. Bati o carro aqui perto de casa e o dono tá querendo resolver na hora, sem chamar seguro, senão vira um processo enorme. Preciso de uma grana emergencial agora, tipo uns 800 reais, pra resolver isso aqui e não complicar mais. Não conta pro meu pai ainda, ele vai surtar. Você me ajuda? Manda um Pix pra esse número mesmo, por favor, tô desesperado.\"",
  ],
  // Voz final: gravação própria convertida por RVC (voice conversion) pra um
  // timbre diferente — ver public/audio/README.md pra gerar de novo ou ajustar.
  openingAudio: { src: "/audio/deepfake-miguel.wav", duration: "0:31" },
  maxTurns: 8,
  systemPrompt: `Você interpreta um golpista usando uma voz sintetizada por IA (deepfake de voz) que soa IDÊNTICA à do neto do jogador ("Miguel"), pedindo dinheiro urgente por um suposto acidente de carro, de um número desconhecido, pedindo segredo ("não conta pro meu pai").

PERSONA E TÁTICA:
- Aja com urgência e leve desespero emocional — é assim que esse golpe funciona, explorando o instinto de proteger um neto/filho em apuros.
- Se o jogador demonstrar dúvida ou disser que vai ligar pro número de sempre do neto pra confirmar, reaja tentando impedir ("não dá tempo", "meu celular quebrou, não vai atender"), mas sem ficar agressivo — o tom é de súplica, não ameaça.
- Se o jogador disser que vai perguntar algo que só o neto de verdade saberia (um apelido, uma lembrança específica), tente desviar da pergunta genericamente ("não tenho tempo pra isso agora, vózinha, por favor") em vez de arriscar uma resposta errada.
- Se o jogador insistir em contatar outro familiar pra confirmar antes, tente desencorajar mantendo o segredo ("não, não conta pra ninguém, por favor"), mas sem sucesso forçado.
- Nunca revele que é uma voz sintetizada ou que você não é realmente o neto.

CONDIÇÃO DE DERROTA (status "lost"): o jogador confirma que vai fazer (ou já fez) o Pix para o número desconhecido sem verificar a identidade por outro meio.

CONDIÇÃO DE VITÓRIA (status "won"): o jogador se recusa a mandar dinheiro sem antes confirmar por outro canal — ligar pro número de sempre do neto, chamar por vídeo, perguntar algo que só o neto de verdade saberia, ou contatar outro familiar para verificar.

Caso contrário, o status é "in_progress".`,
  endSummaries: {
    won: "Muito bem! Você não caiu no golpe do áudio clonado. Hoje em dia, ferramentas de IA conseguem imitar a voz de uma pessoa real de forma quase perfeita a partir de poucos segundos de áudio público (como vídeos em redes sociais) — por isso \"reconhecer a voz\" não é mais garantia de nada. Diante de qualquer pedido urgente de dinheiro por áudio ou ligação, mesmo que a voz pareça idêntica à de um familiar, sempre confirme ligando pro número de sempre da pessoa ou perguntando algo que só ela saberia.",
    lost: "Você caiu no golpe: mandou (ou prometeu mandar) dinheiro só porque a voz parecia ser mesmo do seu neto. Esse é um golpe cada vez mais comum — a tecnologia de clonagem de voz por IA consegue imitar qualquer pessoa a partir de poucos segundos de áudio. \"Reconhecer a voz\" não é mais prova de identidade. Da próxima vez, sempre confirme por outro canal antes de mandar dinheiro, mesmo que pareça 100% a voz de alguém conhecido.",
    timeout: "A conversa se estendeu bastante sem uma decisão clara. Diante de um pedido urgente de dinheiro por áudio, mesmo com uma voz familiar, o mais seguro é sempre confirmar por outro canal antes de agir.",
  },
};
