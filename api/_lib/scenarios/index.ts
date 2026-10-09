import type { ScenarioConfig } from "./types.ts";
import { golpeBancario } from "./golpeBancario.ts";
import { golpePix } from "./golpePix.ts";
import { promocaoFalsa } from "./promocaoFalsa.ts";
import { suporteVerdadeiro } from "./suporteVerdadeiro.ts";
import { fakeNews } from "./fakeNews.ts";
import { perfilFalso } from "./perfilFalso.ts";
import { deepfake } from "./deepfake.ts";
import { alertaCompra } from "./alertaCompra.ts";
import { tioNumeroNovo } from "./tioNumeroNovo.ts";

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
