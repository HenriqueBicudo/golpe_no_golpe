import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ChatPreview from "../components/chat/ChatPreview";
import "./Tutorial.css";

export default function Tutorial() {
  const [step, setStep] = useState<1 | 2>(1);
  const navigate = useNavigate();

  return (
    <div className="section">
      <div className="tutorial-steps">
        <span
          className={
            step === 1
              ? "tutorial-steps__dot tutorial-steps__dot--active"
              : "tutorial-steps__dot"
          }
        />
        <span
          className={
            step === 2
              ? "tutorial-steps__dot tutorial-steps__dot--active"
              : "tutorial-steps__dot"
          }
        />
      </div>

      {step === 1 ? (
        <div className="card tutorial-card">
          <h1 className="tutorial-card__title">Como funciona?</h1>
          <p className="tutorial-card__intro">
            Utilizamos situações reais de golpes como base para criar
            cenários fictícios. Veja como o jogo funciona.
          </p>

          <div className="tutorial-card__body">
            <div className="tutorial-card__note">
              <p>1º Vai aparecer uma tentativa de golpe no chat.</p>
              <br />
              <p>
                Você deverá responder como faria numa conversa de verdade — e
                tentar descobrir se é ou não um golpe.
              </p>
            </div>
            <div className="tutorial-card__frame">
              <ChatPreview
                messages={[
                  {
                    role: "npc",
                    text: "Olá! Aqui é o gerente do Banco Seguro. Notamos atividades suspeitas em sua conta.",
                  },
                  {
                    role: "npc",
                    text: "Poderia confirmar o número do seu cartão pra verificarmos?",
                  },
                ]}
              />
            </div>
          </div>

          <div className="tutorial-card__next">
            <button className="btn btn-primary" onClick={() => setStep(2)}>
              Próximo <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="card tutorial-card">
          <h1 className="tutorial-card__title">Cada resposta conta</h1>

          <div className="tutorial-card__body">
            <div className="tutorial-card__note">
              <p>
                Algumas respostas fazem o golpista continuar insistindo,
                enquanto outras podem encerrar a conversa — pra melhor ou pra
                pior. Você digita, a IA reage de verdade.
              </p>
            </div>
            <div className="tutorial-card__frame">
              <ChatPreview
                messages={[
                  {
                    role: "npc",
                    text: "Poderia confirmar o número do seu cartão pra verificarmos?",
                  },
                  {
                    role: "player",
                    text: "Prefiro ligar pra central do banco pra confirmar antes.",
                  },
                ]}
                typing
              />
            </div>
          </div>

          <div className="tutorial-card__next">
            <button className="btn btn-primary" onClick={() => navigate("/jogo")}>
              Iniciar <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
