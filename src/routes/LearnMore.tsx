import "./LearnMore.css";

const tips = [
  {
    title: "Desconfie de ofertas irresistíveis",
    text: "Golpistas frequentemente usam ofertas muito atrativas para atrair vítimas. Se algo parecer bom demais para ser verdade, provavelmente é.",
  },
  {
    title: "Proteja suas informações pessoais",
    text: "Nunca compartilhe números de cartão, senhas ou outros dados confidenciais por mensagem ou e-mail. Instituições legítimas não pedem isso dessa forma.",
  },
  {
    title: "Verifique a autenticidade",
    text: "Antes de responder a uma mensagem, e-mail ou ligação, confirme se a fonte é legítima entrando em contato pelos canais oficiais.",
  },
  {
    title: "Desconfie de pagamentos antecipados",
    text: "Golpistas frequentemente pedem dinheiro antecipado para supostos serviços, prêmios ou oportunidades. Nunca pague sem ter certeza da legitimidade.",
  },
  {
    title: "Analise a URL dos sites",
    text: 'Golpistas criam páginas falsas parecidas com sites legítimos. Confira se o site começa com "https://" e tem um cadeado de segurança.',
  },
  {
    title: "Não ceda à pressão ou urgência",
    text: "Golpistas tentam criar um senso de urgência para forçar decisões precipitadas. Verifique os fatos antes de agir.",
  },
  {
    title: "Mantenha seu software atualizado",
    text: "Dispositivos e programas atualizados protegem contra vulnerabilidades que os golpistas costumam explorar.",
  },
  {
    title: "Eduque-se constantemente",
    text: "Fique atualizado sobre os tipos mais recentes de golpes. Quanto mais você souber, mais preparado estará para evitá-los.",
  },
];

export default function LearnMore() {
  return (
    <div className="section">
      <div className="learn-more__header">
        <h1 className="learn-more__title">
          Saiba mais sobre golpes online e como se proteger
        </h1>
        <p className="learn-more__intro">
          Viver em um mundo cada vez mais conectado traz vantagens, mas
          também desafios — como o aumento dos golpes online. Aqui estão
          algumas dicas essenciais para se proteger.
        </p>
      </div>

      <ol className="tips-list">
        {tips.map((tip) => (
          <li className="tip-row" key={tip.title}>
            <div>
              <span className="tip-row__title">{tip.title}</span>
              <p className="tip-row__text">{tip.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="learn-more__closing">
        Quanto mais gente souber reconhecer esses sinais, menos gente cai
        neles. Se aprendeu algo aqui, vale a pena repassar pra alguém.
      </p>
    </div>
  );
}
