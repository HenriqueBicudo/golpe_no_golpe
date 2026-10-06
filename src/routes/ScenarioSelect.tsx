import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchScenarios, type ScenarioSummary } from "../lib/api";
import { assetUrl } from "../lib/assetMap";
import "./ScenarioSelect.css";

export default function ScenarioSelect() {
  const [scenarios, setScenarios] = useState<ScenarioSummary[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchScenarios()
      .then(setScenarios)
      .catch(() => setScenarios([]));
  }, []);

  return (
    <div className="scenario-select">
      <div className="scenario-select__header">
        <h1 className="scenario-select__title">Escolha uma situação</h1>
        <p className="scenario-select__intro">
          Cada conversa é diferente — e nem toda mensagem suspeita é golpe.
        </p>
      </div>

      <div className="scenario-grid">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            className="card scenario-card"
            onClick={() => navigate(`/jogo/${scenario.id}`)}
          >
            <span className="tag scenario-card__badge">{scenario.difficulty}</span>
            <div className="scenario-card__top">
              <img
                src={assetUrl(scenario.avatarAsset)}
                alt=""
                className="scenario-card__avatar"
              />
              <span className="scenario-card__title">{scenario.title}</span>
            </div>
            <p className="scenario-card__teaser">{scenario.teaser}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
