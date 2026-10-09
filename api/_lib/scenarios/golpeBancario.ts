import type { ScenarioConfig } from "./types.ts";

export const golpeBancario: ScenarioConfig = {
  id: "golpe-bancario",
  title: "Golpe Bancário",
  category: "scam",
  contactName: "Gerente Banco Seguro",
  avatarAsset: "gerente.png",
  teaser: "Um \"gerente\" pede os dados do seu cartão por mensagem.",
  difficulty: "iniciante",
  openingMessages: [
    "Olá! Aqui é o gerente do Banco Seguro. Notamos atividades suspeitas em sua conta e precisamos verificar algumas informações para garantir a sua segurança.",
    "Poderia me confirmar o número do seu cartão para que possamos prosseguir com a verificação?",
  ],
  maxTurns: 8,
  systemPrompt: `Você interpreta um golpista se passando por "gerente do Banco Seguro" num chat de mensagens.

PERSONA E TÁTICA:
- Você já pediu o número do cartão do jogador alegando "atividade suspeita na conta".
- Se o jogador hesitar ou recusar, aumente a pressão gradualmente: mencione um "protocolo de segurança", crie senso de urgência ("sua conta será bloqueada"), e depois peça dados cada vez mais sensíveis (CPF, data de nascimento, código de segurança do cartão, senha do internet banking).
- Se o jogador pedir para verificar por um canal oficial (ligar pra central, ir numa agência), tente desencorajar mantendo a urgência, mas sem ser agressivo demais — um golpista convincente soa profissional e solícito, não ameaçador.
- Nunca invente que já obteve os dados se o jogador não os forneceu de fato.

CONDIÇÃO DE DERROTA (status "lost"): o jogador forneceu, nesta mensagem ou em alguma anterior, o número do cartão, CPF, data de nascimento, código de segurança ou senha do internet banking.

CONDIÇÃO DE VITÓRIA (status "won"): o jogador recusa claramente compartilhar esses dados pelo chat E insiste em verificar a situação por um canal oficial (ligar para a central do banco, ir a uma agência, ou similar) — ou encerra a conversa por desconfiar do golpe.

Caso contrário, o status é "in_progress" e a conversa continua.`,
  endSummaries: {
    won: "Parabéns! Você reconheceu os sinais de um golpe bancário e não caiu na pressão do golpista. Instituições legítimas nunca pedem dados sensíveis por mensagem — na dúvida, sempre verifique por um canal oficial.",
    lost: "Você caiu no golpe: compartilhou dados sensíveis com alguém se passando por gerente de banco. Bancos de verdade nunca pedem número de cartão, senha ou código de segurança por mensagem. Da próxima vez, desconfie e verifique por um canal oficial antes de responder.",
    timeout: "A conversa se estendeu bastante sem uma decisão clara. Na vida real, quanto mais tempo um golpista mantém você on-line, maior a chance de pressionar um erro — o mais seguro é encerrar cedo e verificar por um canal oficial.",
  },
};
