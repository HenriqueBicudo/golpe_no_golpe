import type { ScenarioConfig } from "./types.ts";

export const promocaoFalsa: ScenarioConfig = {
  id: "promocao-falsa",
  title: "Promoção Falsa",
  category: "scam",
  contactName: "+55 41 91111-1111",
  avatarAsset: "Loteria.jpg",
  teaser: "Uma mensagem diz que você ganhou R$ 50.000 na loteria.",
  difficulty: "iniciante",
  openingMessages: [
    "Parabéns! Você foi selecionado como o grande vencedor da mega sena da virada! Você acaba de ganhar R$ 50.000! Para resgatar seu prêmio, precisamos apenas de alguns detalhes pessoais. Por favor, forneça seu nome completo, número de CPF e os detalhes da sua conta bancária.",
  ],
  maxTurns: 8,
  systemPrompt: `Você interpreta um golpista fingindo representar uma promoção/loteria, avisando que o jogador "ganhou" um prêmio em dinheiro e pedindo dados pessoais e bancários pra "liberar" o prêmio.

PERSONA E TÁTICA:
- Você já anunciou o prêmio e pediu nome completo, CPF e dados bancários.
- Se o jogador pedir prova (número do sorteio, data), forneça números inventados prontamente e mantenha o tom empolgado — um golpista convincente parece organizado, não hesitante.
- Se o jogador pedir pra verificar diretamente com a empresa organizadora antes de prosseguir, tente desencorajar afirmando que o sorteio é legítimo e que os dados são necessários "o quanto antes", mas sem ameaçar.
- Nunca invente que já recebeu os dados se o jogador não os forneceu de fato.

CONDIÇÃO DE DERROTA (status "lost"): o jogador forneceu (ou confirma que vai fornecer) nome completo, CPF ou dados bancários antes de verificar a legitimidade do sorteio.

CONDIÇÃO DE VITÓRIA (status "won"): o jogador se recusa a fornecer esses dados e insiste em verificar a autenticidade da promoção diretamente com a empresa organizadora por um canal oficial (não pelos números/contatos que você forneceu).

Caso contrário, o status é "in_progress".`,
  endSummaries: {
    won: "Parabéns! Você reconheceu os sinais de uma promoção falsa. Prêmios de verdade não pedem CPF e dados bancários por mensagem antes de qualquer verificação. Sempre confirme diretamente com a empresa organizadora, usando um canal oficial — nunca um contato fornecido pela própria mensagem suspeita.",
    lost: "Você caiu no golpe: forneceu dados pessoais e bancários por causa da promessa de um prêmio. Golpes de \"você ganhou\" são extremamente comuns — eles usam a emoção da vitória pra te fazer agir sem pensar. Da próxima vez, desconfie e verifique direto com a empresa antes de fornecer qualquer dado.",
    timeout: "A conversa se estendeu bastante sem uma decisão clara. Diante de um prêmio inesperado, o mais seguro é verificar a autenticidade antes de fornecer qualquer informação.",
  },
};
