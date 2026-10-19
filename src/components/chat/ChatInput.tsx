import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Mic, Send, Trash2 } from "lucide-react";
import { useAudioRecorder } from "../../hooks/useAudioRecorder";

interface ChatInputProps {
  disabled?: boolean;
  notice?: string | null;
  onSend: (text: string) => void;
  onSendAudio: (audio: Blob, seconds: number) => void;
}

const MAX_LENGTH = 1000;
const MAX_AUDIO_SECONDS = 60;
// Depois disso o campo para de crescer e ganha barra de rolagem.
const MAX_FIELD_HEIGHT = 180;

function formatSeconds(total: number): string {
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export default function ChatInput({ disabled, notice, onSend, onSendAudio }: ChatInputProps) {
  const [value, setValue] = useState("");
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  const recorder = useAudioRecorder({ maxSeconds: MAX_AUDIO_SECONDS, onComplete: onSendAudio });
  const isRecording = recorder.state === "recording";

  function resizeField() {
    const field = fieldRef.current;
    if (!field) return;
    field.style.height = "auto";
    field.style.height = `${Math.min(field.scrollHeight, MAX_FIELD_HEIGHT)}px`;
    // Barra de rolagem só quando o texto passa do tamanho máximo do campo.
    field.style.overflowY = field.scrollHeight > MAX_FIELD_HEIGHT ? "auto" : "hidden";
  }

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    requestAnimationFrame(resizeField);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    submit();
  }

  // Enter envia; Shift+Enter quebra a linha, como no WhatsApp Web.
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  }

  const message = recorder.error ?? notice;

  return (
    <div className="chat-input-area">
      {message && (
        <p className="chat-input__notice" role="status">
          {message}
        </p>
      )}

      <form className="chat-input" onSubmit={handleSubmit}>
        {isRecording ? (
          <div className="chat-input__recording">
            <button
              type="button"
              className="chat-input__icon-btn"
              onClick={recorder.cancel}
              aria-label="Cancelar gravação"
            >
              <Trash2 size={20} />
            </button>
            <span className="chat-input__rec-dot" aria-hidden="true" />
            <span className="chat-input__rec-time">
              Gravando {formatSeconds(recorder.elapsed)}
              <span className="chat-input__rec-max"> / {formatSeconds(MAX_AUDIO_SECONDS)}</span>
            </span>
            <button
              type="button"
              className="chat-input__send"
              onClick={recorder.stop}
              aria-label="Enviar áudio"
            >
              <Send size={18} />
            </button>
          </div>
        ) : (
          <>
            <textarea
              ref={fieldRef}
              className="chat-input__field"
              placeholder="Digite sua resposta ou grave um áudio..."
              value={value}
              rows={1}
              onChange={(event) => {
                setValue(event.target.value);
                recorder.clearError();
                resizeField();
              }}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              maxLength={MAX_LENGTH}
              aria-label="Mensagem"
            />
            {value.trim() ? (
              <button type="submit" className="chat-input__send" disabled={disabled} aria-label="Enviar">
                <Send size={18} />
              </button>
            ) : (
              <button
                type="button"
                className="chat-input__send"
                onClick={recorder.start}
                disabled={disabled || recorder.state === "starting"}
                aria-label="Gravar áudio"
                title="Gravar áudio"
              >
                <Mic size={20} />
              </button>
            )}
          </>
        )}
      </form>
    </div>
  );
}
