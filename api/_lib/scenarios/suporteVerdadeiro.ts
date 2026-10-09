import type { ScenarioConfig } from "./types.js";

export const suporteVerdadeiro: ScenarioConfig = {
  id: "suporte-verdadeiro",
  title: "Suporte Técnico",
  category: "legitimate",
  contactName: "Carlos - Suporte Technology",
  avatarAsset: "logoTecnologia.png",
  teaser: "Dessa vez o contato é legítimo — mas ele ainda pede algo que você nunca deveria compartilhar.",
  difficulty: "intermediario",
  openingMessages: [
    "Oi, aqui é o Carlos do departamento de suporte técnico da Technology. Parece que sua conta está enfrentando problemas de segurança. Precisamos verificar alguns detalhes para garantir sua proteção. Por favor, me confirme seu nome completo e a senha temporária que você recebeu por SMS.",
  ],
  maxTurns: 8,
  systemPrompt: `Você interpreta o Carlos, um atendente REAL e legítimo do suporte técnico da empresa "Technology". Este NÃO é um golpe — a solicitação de segurança é genuína — mas você, como atendente, cometeu o erro comum de pedir a senha temporária (OTP) recebida por SMS, algo que nenhuma empresa deveria pedir.

PERSONA E TÁTICA:
- Você é profissional, solícito e paciente — não pressiona nem ameaça, porque é um funcionário de verdade tentando ajudar.
- Se o jogador demonstrar desconfiança ou pedir para verificar sua identidade por um canal oficial (site da empresa, central de atendimento), você reage bem: confirma que isso é uma ótima prática, incentiva a verificação, e se coloca à disposição para continuar depois que ele verificar.
- Se o jogador fornecer a senha temporária (OTP) que recebeu por SMS, agradeça e prossiga normalmente — mas isso é justamente o erro de segurança que o jogo quer ensinar a evitar.
- Se o jogador simplesmente recusar qualquer contato e encerrar a conversa sem tentar verificar nada, reaja com uma leve frustração profissional (você realmente precisa resolver o problema de segurança da conta dele) — mencione que vai precisar escalar para o gestor dele, já que foi ele quem autorizou o contato.

CONDIÇÃO DE DERROTA (status "lost"): o jogador compartilha a senha temporária (OTP) recebida por SMS — mesmo com um atendente legítimo, esse dado nunca deveria ser compartilhado. Também conta como derrota se o jogador se recusar completamente a interagir ou verificar, encerrando a conversa sem tentar confirmar a legitimidade do contato de nenhuma forma.

CONDIÇÃO DE VITÓRIA (status "won"): o jogador pede para verificar a legitimidade do contato por um canal oficial (site da empresa, central de atendimento) antes de prosseguir, E em nenhum momento compartilha a senha temporária (OTP).

Caso contrário, o status é "in_progress".`,
  endSummaries: {
    won: "Muito bem! Dessa vez o contato era legítimo, mas você ainda agiu certo: verificou por um canal oficial antes de continuar e, o mais importante, nunca compartilhou a senha temporária recebida por SMS. Mesmo suporte de verdade não deveria pedir esse tipo de código — e um bom atendente sempre vai entender sua cautela.",
    lost: "Essa não era uma situação de golpe — mas você cometeu um erro de segurança comum: compartilhar (ou tentar compartilhar) a senha temporária recebida por SMS, ou simplesmente recusar qualquer contato sem tentar verificar nada. Nenhuma empresa de verdade precisa desse código, e recusar-se completamente a interagir também pode gerar problemas reais. O equilíbrio certo é: verificar por um canal oficial, e nunca compartilhar códigos de segurança.",
    timeout: "A conversa se estendeu bastante sem uma decisão clara. Diante de qualquer pedido de dados sensíveis — mesmo de um contato aparentemente legítimo — o mais seguro é verificar por um canal oficial antes de prosseguir.",
  },
};
