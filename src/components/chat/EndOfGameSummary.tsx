import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  HeartHandshake,
  RotateCcw,
  LayoutGrid,
  CircleCheck,
  CircleAlert,
  Lightbulb,
  LoaderCircle,
} from "lucide-react";
import type { EvaluationState } from "../../hooks/useChatSession";
import type { Evaluation } from "../../lib/api";

interface EndOfGameSummaryProps {
  status: "won" | "lost" | "timeout" | "safety_stop";
  summary: string;
  evaluation: EvaluationState;
  onRetry: () => void;
  onRetryEvaluation: () => void;
}

const config = {
  won: { title: "Boa decisão", icon: ShieldCheck, tone: "won" },
  lost: { title: "Isso não foi ideal", icon: ShieldAlert, tone: "lost" },
  timeout: { title: "A conversa ficou longa demais", icon: Clock, tone: "neutral" },
  safety_stop: { title: "Vamos fazer uma pausa", icon: HeartHandshake, tone: "neutral" },
} as const;

function scoreTone(score: number) {
  if (score >= 70) return "won";
  if (score >= 50) return "neutral";
  return "lost";
}

function EvaluationReport({ data }: { data: Evaluation }) {
  const tone = scoreTone(data.score);

  return (
    <div className="evaluation">
      <span className={`tag evaluation__reveal evaluation__reveal--${data.wasScam ? "scam" : "legit"}`}>
        {data.wasScam ? "Era golpe" : "Era um contato legítimo"}
      </span>

      <div className="evaluation__score">
        <div className={`evaluation__number evaluation__number--${tone}`}>
          {data.score}
          <span className="evaluation__max">/100</span>
        </div>
        <div className={`evaluation__rating evaluation__rating--${tone}`}>{data.rating}</div>
      </div>
      <div
        className="evaluation__bar"
        role="meter"
        aria-label="Pontuação"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={data.score}
      >
        <div
          className={`evaluation__bar-fill evaluation__bar-fill--${tone}`}
          style={{ width: `${data.score}%` }}
        />
      </div>

      <div className="evaluation__section">
        <h3 className="evaluation__heading">O que você fez bem</h3>
        {data.positives.length > 0 ? (
          <ul className="evaluation__list">
            {data.positives.map((item) => (
              <li key={item} className="evaluation__item">
                <CircleCheck size={18} className="evaluation__item-icon evaluation__item-icon--won" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="evaluation__empty">Nada que se destaque desta vez.</p>
        )}
      </div>

      <div className="evaluation__section">
        <h3 className="evaluation__heading">O que pode melhorar</h3>
        {data.negatives.length > 0 ? (
          <ul className="evaluation__list">
            {data.negatives.map((item) => (
              <li key={item} className="evaluation__item">
                <CircleAlert size={18} className="evaluation__item-icon evaluation__item-icon--lost" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="evaluation__empty">Nenhum deslize. Continue assim!</p>
        )}
      </div>

      {data.tip && (
        <p className="evaluation__tip">
          <Lightbulb size={18} className="evaluation__tip-icon" />
          <span>{data.tip}</span>
        </p>
      )}
    </div>
  );
}

export default function EndOfGameSummary({
  status,
  summary,
  evaluation,
  onRetry,
  onRetryEvaluation,
}: EndOfGameSummaryProps) {
  const isSafetyStop = status === "safety_stop";
  const { title, icon: Icon, tone } = config[status];

  return (
    <div className="end-summary">
      <div className="card end-summary__card">
        <Icon className={`end-summary__icon end-summary__icon--${tone}`} size={30} strokeWidth={1.6} />
        <h2 className="end-summary__title">{title}</h2>
        <p className="end-summary__text">{summary}</p>

        {!isSafetyStop && evaluation.status === "loading" && (
          <p className="evaluation__status">
            <LoaderCircle size={18} className="evaluation__spinner" /> Analisando sua conversa…
          </p>
        )}
        {!isSafetyStop && evaluation.status === "error" && (
          <p className="evaluation__status">
            Não consegui gerar sua pontuação agora.{" "}
            <button className="evaluation__retry" onClick={onRetryEvaluation}>
              Tentar de novo
            </button>
          </p>
        )}
        {!isSafetyStop && evaluation.status === "done" && <EvaluationReport data={evaluation.data} />}

        <div className="end-summary__actions">
          {!isSafetyStop && (
            <button className="btn btn-primary" onClick={onRetry}>
              <RotateCcw size={16} /> Tentar novamente
            </button>
          )}
          <Link to={isSafetyStop ? "/" : "/jogo"} className="btn btn-ghost">
            {isSafetyStop ? "Voltar ao início" : <><LayoutGrid size={16} /> Escolher outra situação</>}
          </Link>
        </div>
      </div>
    </div>
  );
}
