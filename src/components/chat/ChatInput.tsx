import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  disabled?: boolean;
  onSend: (text: string) => void;
}

export default function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        className="chat-input__field"
        type="text"
        placeholder="Digite sua resposta..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={disabled}
        maxLength={500}
        aria-label="Mensagem"
      />
      <button
        type="submit"
        className="chat-input__send"
        disabled={disabled || !value.trim()}
        aria-label="Enviar"
      >
        <Send size={18} />
      </button>
    </form>
  );
}
