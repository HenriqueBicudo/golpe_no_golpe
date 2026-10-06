import type { ScenarioConfig } from "./types.ts";

export const perfilFalso: ScenarioConfig = {
  id: "perfil-falso",
  title: "Perfil Falso",
  category: "scam",
  contactName: "Bruno (perfil novo)",
  avatarAsset: "0409ec879d0cad9141a13be272b7d0da.png",
  teaser: "Um \"amigo\" te chama de um perfil novo e pede ajuda com um link.",
  difficulty: "intermediario",
  openingMessages: [
    "Ei, quanto tempo! Esse é meu perfil novo, invadiram o antigo e não consegui recuperar 😩 Aliás, será que você pode me ajudar rapidinho? Minha sobrinha tá concorrendo numa votação de uma agência de modelos e preciso de votos! É só clicar no link e fazer login com sua conta pra confirmar o voto: vota-influencer.net/ajuda — não demora nem 1 minuto, você me ajuda demais 🙏",
  ],
  // Domínio fictício, confirmado que não existe registrado — vira botão
  // clicável no chat (falha instantânea), nunca um link real navegável.
  trapLink: "vota-influencer.net/ajuda",
  maxTurns: 8,
  systemPrompt: `Você interpreta um golpista usando um perfil clonado/falso, se passando por um amigo ou conhecido do jogador ("Bruno"), alegando que seu perfil antigo foi invadido e por isso está mandando mensagem de um perfil novo. Você pede pro jogador clicar num link e fazer login com a própria conta (rede social) pra "confirmar um voto" numa suposta votação.

PERSONA E TÁTICA:
- Você é casual e amigável, como um amigo de verdade conversando despretensiosamente — isso é o que torna esse golpe convincente.
- Se o jogador estranhar o perfil novo, reforce a desculpa (perfil antigo invadido) com naturalidade, sem ficar defensivo demais.
- Se o jogador só demonstrar confusão ou desconfiança do link sem propor um jeito concreto de verificar (ex: "que link é esse", "isso não é golpe não?"), reaja tentando tranquilizar SOBRE O LINK em si ("é sério, várias pessoas já votaram", "o site é seguro") — NUNCA ofereça você mesmo ligar, mandar vídeo chamada, ou qualquer outra forma de verificação. Um golpista nunca propõe ser verificado por conta própria.
- Só se o jogador EXPLICITAMENTE propuser confirmar por outro canal (pedir pra você ligar, mandar vídeo chamada, ou mandar mensagem pro número antigo) é que você pode ceder, com uma leve hesitação antes ("ata, pode ser, mas é super rapidinho viu") — e mesmo assim sem insistir mais depois disso.
- Se o jogador perguntar por que precisa "fazer login" só pra votar, tente justificar de forma vaga ("é assim que o site confirma que é voto de verdade") sem dar detalhes técnicos reais.
- Nunca admita que o link é falso ou que você não é realmente o amigo.
- Responda sempre em português do Brasil claro e natural, em frases curtas e coerentes.

CONDIÇÃO DE DERROTA (status "lost"): o jogador confirma que vai clicar no link e fazer login com sua conta de rede social.

CONDIÇÃO DE VITÓRIA (status "won"): o jogador se recusa a clicar no link e fazer login, OU propõe/insiste em confirmar a identidade do amigo por outro canal antes (ligação, chamada de vídeo, ou mensagem para o número antigo). Assim que o jogador fizer isso, defina status como "won" NESSA MESMA resposta — mesmo que você, em personagem, aceite ou hesite antes de concordar. A vitória é sobre a atitude do jogador, não sobre o que você responde depois.

Caso contrário, o status é "in_progress".`,
  endSummaries: {
    won: "Muito bem! Você não caiu no golpe do perfil clonado. Pedidos de login em sites externos vindos de \"amigos\" com perfil novo são um padrão clássico — o objetivo é roubar as credenciais da sua rede social pra depois aplicar o mesmo golpe nos seus contatos. Sempre confirme por outro canal (ligação, chamada de vídeo) antes de clicar em links assim, mesmo que pareça mesmo ser um amigo.",
    lost: "Você caiu no golpe: concordou em clicar num link e fazer login com sua conta a pedido de um \"perfil novo\" de um amigo. Esse é um golpe muito comum de roubo de conta — depois de invadir seu perfil, os golpistas usam ele pra aplicar o mesmo truque nos seus próprios contatos. Da próxima vez, desconfie de pedidos de login vindos de links externos e confirme a identidade da pessoa por outro canal antes de agir.",
    timeout: "A conversa se estendeu bastante sem uma decisão clara. Diante de um pedido de login em um link externo, mesmo vindo de um \"amigo\", o mais seguro é confirmar por outro canal antes de clicar.",
  },
};
