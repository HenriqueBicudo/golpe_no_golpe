import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ChatPreview from "../components/chat/ChatPreview";
import "./Home.css";

const reasons = [
  {
    lead: "Conversa de verdade.",
    text: "Sem múltipla escolha — você digita a resposta com suas próprias palavras, como faria de verdade.",
  },
  {
    lead: "A IA reage como um golpista reagiria.",
    text: "Insiste, cria urgência, muda de tática — do jeito que golpe de verdade funciona.",
  },
  {
    lead: "Sete situações, um só golpe de vista não basta.",
    text: "Pix, boleto, promoção, perfil clonado, áudio de voz clonada — e um caso que não é golpe nenhum.",
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
            Você entra numa conversa — mensagem, Pix, ligação — e responde do
            seu jeito. A IA do outro lado reage como a pessoa reagiria de
            verdade. Só descobre se caiu depois que responder.
          </p>
          <div className="hero__actions">
            <Link to="/tutorial" className="btn btn-primary">
              Como jogar <ArrowRight size={18} />
            </Link>
            <Link to="/aprenda-mais" className="btn btn-ghost">
              Aprenda mais
            </Link>
          </div>
        </div>

        <div className="hero__demo">
          <ChatPreview
            messages={[
              {
                role: "npc",
                text: "Parabéns! Você ganhou R$ 50.000 na loteria. Envie seu CPF pra liberarmos o prêmio.",
              },
              {
                role: "player",
                text: "Qual o número do sorteio? Vou confirmar direto com a empresa.",
              },
            ]}
          />
          <span className="hero__demo-caption">↑ é assim que uma rodada real se parece</span>
        </div>
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
        <Link to="/tutorial" className="btn btn-primary">
          Começar a jogar <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
