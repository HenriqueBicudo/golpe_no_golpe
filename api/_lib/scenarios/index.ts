import type { ScenarioConfig } from "./types.js";
import { golpeBancario } from "./golpeBancario.js";
import { golpePix } from "./golpePix.js";
import { promocaoFalsa } from "./promocaoFalsa.js";
import { suporteVerdadeiro } from "./suporteVerdadeiro.js";
import { fakeNews } from "./fakeNews.js";
import { perfilFalso } from "./perfilFalso.js";
import { deepfake } from "./deepfake.js";
import { alertaCompra } from "./alertaCompra.js";
import { tioNumeroNovo } from "./tioNumeroNovo.js";

// A ordem aqui é a ordem dos cards na tela de seleção — os cenários
// legítimos ficam espalhados entre os golpes pra não formar um padrão.
export const scenarios: Record<string, ScenarioConfig> = {
  [golpeBancario.id]: golpeBancario,
  [golpePix.id]: golpePix,
  [alertaCompra.id]: alertaCompra,
  [promocaoFalsa.id]: promocaoFalsa,
  [suporteVerdadeiro.id]: suporteVerdadeiro,
  [fakeNews.id]: fakeNews,
  [tioNumeroNovo.id]: tioNumeroNovo,
  [perfilFalso.id]: perfilFalso,
  [deepfake.id]: deepfake,
};

export function getScenario(id: string): ScenarioConfig | undefined {
  return scenarios[id];
}

export function listScenarios(): ScenarioConfig[] {
  return Object.values(scenarios);
}
