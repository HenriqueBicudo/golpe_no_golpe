import type { VercelRequest, VercelResponse } from "@vercel/node";

interface TranscribeRequestBody {
  audio: string; // base64, sem o prefixo "data:"
  mimeType: string;
}

// ~60s de áudio comprimido do navegador ficam bem abaixo disso; o limite
// existe pra respeitar os 4,5 MB de corpo das funções da Vercel.
const MAX_BASE64_LENGTH = 3_500_000;

// O que o MediaRecorder grava em cada navegador (Chrome/Edge/Firefox: webm ou
// ogg com opus; Safari: mp4), mapeado pra extensão que o Whisper reconhece.
const EXTENSIONS: Record<string, string> = {
  "audio/webm": "webm",
  "audio/ogg": "ogg",
  "audio/mp4": "mp4",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/x-m4a": "m4a",
};

// O Whisper costuma "ouvir" essas frases em áudio mudo ou só com ruído
// (vícios de legendas de vídeo no treino). Se a transcrição for só isso,
// tratamos como áudio vazio em vez de mandar pro personagem.
const SILENCE_HALLUCINATIONS = [
  /amara\.org/i,
  /legendas? (pela|por|da)/i,
  /obrigad[oa] por assistir/i,
  /inscreva-se no canal/i,
];

function isLikelySilence(text: string): boolean {
  const clean = text.trim();
  return clean.length === 0 || SILENCE_HALLUCINATIONS.some((pattern) => pattern.test(clean));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { audio, mimeType } = (req.body ?? {}) as Partial<TranscribeRequestBody>;
  const baseType = typeof mimeType === "string" ? mimeType.split(";")[0].trim().toLowerCase() : "";
  const extension = EXTENSIONS[baseType];

  if (typeof audio !== "string" || !audio || !extension) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  if (audio.length > MAX_BASE64_LENGTH) {
    res.status(413).json({ error: "Audio too long" });
    return;
  }

  // A transcrição usa o Whisper da Groq mesmo quando o chat roda no Ollama
  // local: o Ollama não transcreve áudio.
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "Transcription unavailable: missing GROQ_API_KEY" });
    return;
  }

  const form = new FormData();
  form.append("file", new Blob([Buffer.from(audio, "base64")], { type: baseType }), `audio.${extension}`);
  form.append("model", process.env.TRANSCRIBE_MODEL ?? "whisper-large-v3-turbo");
  form.append("language", "pt");
  form.append("response_format", "json");
  form.append("temperature", "0");

  try {
    const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });

    if (!response.ok) {
      console.error("transcribe provider error", response.status, (await response.text()).slice(0, 300));
      res.status(response.status === 429 ? 429 : 502).json({ error: "Transcription failed" });
      return;
    }

    const data = (await response.json()) as { text?: string };
    const text = data.text?.trim() ?? "";
    res.status(200).json({ text: isLikelySilence(text) ? "" : text });
  } catch (error) {
    console.error("transcribe handler error", error);
    res.status(502).json({ error: "Transcription failed" });
  }
}
