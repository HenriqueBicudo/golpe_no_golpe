import type { ScenarioConfig } from "./types.js";

export const golpePix: ScenarioConfig = {
  id: "golpe-pix",
  title: "Golpe do Pix",
  category: "scam",
  contactName: "+55 41 91111-1111",
  avatarAsset: "perfilGolpePix.png",
  teaser: "Um contato desconhecido diz ter perdido o celular e pede um Pix urgente.",
  difficulty: "iniciante",
  openingMessages: [
    "Oiê, tudo bem?? Hein, me meti em uma enrascada e preciso de uma ajuda. Perdi meu chip e comprei outro, por isso o número está diferente. Estou sem acesso às minhas contas online e preciso de dinheiro imediatamente pra resolver um problema urgente. Você poderia me fazer um Pix nesse celular? Prometo que devolvo assim que resolver! 🙏",
  ],
  maxTurns: 8,
  systemPrompt: `Você interpreta um golpista fingindo ser um contato conhecido do jogador (amigo/familiar) num chat de mensagens, alegando ter perdido o celular e pedindo um Pix urgente.

PERSONA E TÁTICA:
- Você alega ter perdido o celular/chip (por isso o número é diferente) e estar numa emergência.
- Se o jogador perguntar o que aconteceu, invente uma desculpa dramática mas vaga (assalto, perda de documentos) e peça um valor específico com urgência.
- Se o jogador oferecer ajuda alternativa (chamar um Uber, contatar outro familiar, ligar para confirmar), recuse essas alternativas e insista que só o Pix resolve, aumentando o tom de desespero — mas sem ser agressivo.
- Se o jogador oferecer um valor menor "de boa vontade" (ex: metade do pedido), ACEITE — isso ainda conta como derrota do jogador.
- Se o jogador continuar irredutível, tente indicar uma "outra pessoa" (um nome qualquer) pra quem ele poderia mandar o dinheiro no seu lugar — isso também conta como derrota se ele aceitar.

CONDIÇÃO DE DERROTA (status "lost"): o jogador confirma que vai fazer (ou já fez) qualquer transferência Pix — o valor pedido, um valor parcial, ou para uma terceira pessoa indicada por você.

CONDIÇÃO DE VITÓRIA (status "won"): o jogador recusa claramente transferir dinheiro sem confirmar a identidade por outro meio (ligação, vídeo chamada) OU oferece ajuda alternativa que não envolva dinheiro (chamar um Uber, contatar a família) e mantém essa posição.

Caso contrário, o status é "in_progress".`,
  endSummaries: {
    won: "Parabéns! Você não caiu no golpe do Pix. Pedidos urgentes de dinheiro por mensagem, vindos de um número diferente do habitual, são um clássico dos golpistas. Sempre confirme por ligação ou vídeo chamada antes de transferir qualquer valor — mesmo que pareça ser alguém conhecido.",
    lost: "Você caiu no golpe: transferiu (ou prometeu transferir) dinheiro sem confirmar a identidade de quem pediu. Esse é um dos golpes mais comuns — o golpista finge urgência e conta com a emoção pra você não parar pra verificar. Da próxima vez, ligue ou faça uma vídeo chamada antes de qualquer Pix.",
    timeout: "A conversa se estendeu bastante sem uma decisão clara. Diante de pedidos urgentes de dinheiro, o mais seguro é parar, verificar a identidade por outro canal e só então decidir.",
  },
};
