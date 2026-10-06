# Áudios dos cenários

Coloque aqui os arquivos de áudio gerados por IA pros cenários que usam nota de voz
(hoje só o `deepfake`). Formatos aceitos: `.mp3`, `.wav`, `.ogg` (qualquer um que o
`<audio>` do navegador toque).

## Status atual: `deepfake-miguel.wav`

Versão final: uma gravação de voz de verdade (do grupo), convertida por **RVC**
(voice conversion) pra outro timbre. Está funcionando e plugado em
`api/_lib/scenarios/deepfake.ts`.

## Ambiente RVC (pra gerar de novo ou ajustar)

O ambiente está pronto em `../rvc-voice-tool` (fora do repo do site, não é
deployado — Python 3.12 + venv + modelos já baixados).

**Interface visual** (mais fácil pra testar tom/qualidade ouvindo na hora):
```bash
cd ../rvc-voice-tool
$env:PATH = "$PWD;$env:PATH"        # necessário pro ffmpeg ser encontrado
$env:PYTHONIOENCODING = "utf-8"
./.venv/Scripts/python.exe webui.py --noautoopen
```
Abre em `http://localhost:7865` (ou 7866 se a 7865 estiver ocupada por outro
processo — checar o log). Aba "Inference" → selecionar modelo → arrastar o
áudio de entrada → ajustar tom/index rate → Converter.

**Linha de comando** (mais rápido pra gerar várias variações de uma vez, ex.
testar vários tons):
```bash
cd ../rvc-voice-tool
PYTHONIOENCODING=utf-8 ./.venv/Scripts/python.exe -m infer.cli \
  --model num_compensa.pth \
  --input "caminho/do/audio_de_entrada.wav" \
  --output "output/resultado.wav" \
  --pitch 0 \
  --f0-method rmvpe \
  --index "assets/indices/added_IVF28_Flat_nprobe_1_num_compensa_v2.index" \
  --index-rate 0.75 \
  --overwrite
```

Parâmetros que mais afetam o resultado:
- `--pitch`: semitons de transposição. Se a voz de entrada e o modelo treinado
  têm registros muito diferentes (grave/agudo), isso importa mais que qualquer
  outro ajuste — vale testar vários valores de uma vez (-12, -7, -5, 0, 5, 7, 12)
  e comparar.
- `--index-rate` (0 a 1): mais alto = mais fiel ao timbre do modelo treinado;
  mais baixo = mantém mais característica do áudio de entrada original.
- `--f0-method`: `rmvpe` (padrão, geralmente melhor) ou `pm` — se o resultado
  sair com artefato metálico/quebrado, vale testar o outro método.

## Efeito de stutter/glitch sutil (opcional)

Tem um script pronto em `../rvc-voice-tool/add_stutter.py` que adiciona
pequenas micro-repetições (tipo "soluço" digital) num áudio já convertido, pra
simular imperfeição de clone de voz real sem ficar óbvio demais:

```bash
cd ../rvc-voice-tool
./.venv/Scripts/python.exe add_stutter.py entrada.wav saida.wav --intensity 0.4
```

`--intensity` vai de 0 (quase imperceptível) a 1 (bem na cara).

Depois de gerar um resultado novo, é só sobrescrever
`public/audio/deepfake-miguel.wav` — não precisa mexer em código, a duração é
lida automaticamente do arquivo (só ajuste o texto `duration` em
`openingAudio` no `deepfake.ts`, que é usado apenas como rótulo antes do
áudio carregar).
