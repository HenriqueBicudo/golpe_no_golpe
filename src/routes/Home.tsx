import { Link } from "react-router-dom";
import { ArrowRight, LayoutGrid, MessageSquareText, ShieldCheck } from "lucide-react";
import "./Home.css";

// No lugar de um chat de exemplo: a prévia de conversa na home parecia
// clicável e as pessoas tentavam jogar ali mesmo.
const steps = [
  {
    icon: LayoutGrid,
    title: "Escolha uma situação",
    text: "Pix, banco, promoção, parente com número novo e outras.",
  },
  {
    icon: MessageSquareText,
    title: "Responda do seu jeito",
    text: "Escreva ou grave um áudio, como faria no seu celular.",
  },
  {
    icon: ShieldCheck,
    title: "Descubra se era golpe",
    text: "No fim você vê o resultado, sua nota e o que fazer na vida real.",
  },
];

const reasons = [
  {
    lead: "Conversa de verdade.",
    text: "Sem múltipla escolha: você escreve ou grava um áudio com suas próprias palavras, como faria de verdade.",
  },
  {
    lead: "A IA reage como um golpista reagiria.",
    text: "Insiste, cria urgência, muda de tática, do jeito que golpe de verdade funciona.",
  },
  {
    lead: "Nove situações, um só golpe de vista não basta.",
    text: "Pix, banco, promoção, perfil clonado, áudio de voz clonada e também situações em que o contato é de verdade.",
  },
  {
    lead: "Você só sabe o resultado no fim.",
    text: "Cada rodada termina explicando exatamente o que te entregou, ou o que te salvou.",
  },
];

export default function Home() {
  return (
    <div className="section">
      <div className="hero">
        <div>
          <h1 className="hero__title">É golpe ou não é golpe?</h1>
          <p className="hero__subtitle">
            Você entra numa conversa (mensagem, Pix, ligação) e responde do
            seu jeito. A IA do outro lado reage como a pessoa reagiria de
            verdade. Só descobre se caiu depois que responder.
          </p>
          <div className="hero__actions">
            <Link to="/jogo" className="btn btn-primary">
              Começar a jogar <ArrowRight size={18} />
            </Link>
            <Link to="/tutorial" className="btn btn-ghost">
              Como jogar
            </Link>
          </div>
        </div>

        <ol className="how-steps" aria-label="Como funciona">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li className="how-steps__item" key={title}>
              <span className="how-steps__number">{index + 1}</span>
              <div>
                <span className="how-steps__title">
                  <Icon size={18} aria-hidden="true" /> {title}
                </span>
                <p className="how-steps__text">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="reasons">
        <h2 className="reasons__title">Por que isso funciona melhor que uma cartilha</h2>
        <div className="reasons__list">
          {reasons.map((reason) => (
            <p className="reasons__item" key={reason.lead}>
              <strong>{reason.lead}</strong> {reason.text}
            </p>
          ))}
        </div>
      </div>

      <div className="home-cta">
        <Link to="/jogo" className="btn btn-primary">
          Começar a jogar <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
