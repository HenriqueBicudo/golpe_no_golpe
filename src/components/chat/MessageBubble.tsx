import VoiceMessageBubble from "./VoiceMessageBubble";

export interface ChatMessage {
  id: string;
  role: "npc" | "player";
  text: string;
  time: string;
  // Presentes só quando essa mensagem representa uma nota de voz (ex: cenário
  // de deepfake). Quando ausentes, a mensagem é renderizada como texto normal.
  audioSrc?: string;
  audioDuration?: string;
  // Presente só quando essa mensagem contém o link-armadilha do cenário (ex:
  // perfil-falso). O trecho de texto igual a trapLink vira um botão clicável
  // — clicar é falha instantânea. Nunca é um link real/navegável.
  trapLink?: string;
}

interface MessageBubbleProps extends ChatMessage {
  onTrapLinkClick?: () => void;
  trapDisabled?: boolean;
}

function TextWithTrapLink({
  text,
  trapLink,
  onClick,
  disabled,
}: {
  text: string;
  trapLink: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const index = text.indexOf(trapLink);
  if (index === -1) return <span className="bubble__text">{text}</span>;

  const before = text.slice(0, index);
  const after = text.slice(index + trapLink.length);

  return (
    <span className="bubble__text">
      {before}
      <button className="bubble__trap-link" onClick={onClick} disabled={disabled}>
        {trapLink}
      </button>
      {after}
    </span>
  );
}

export default function MessageBubble({
  role,
  text,
  time,
  audioSrc,
  audioDuration,
  trapLink,
  onTrapLinkClick,
  trapDisabled,
}: MessageBubbleProps) {
  return (
    <div className={role === "npc" ? "bubble-row bubble-row--npc" : "bubble-row bubble-row--player"}>
      {audioSrc ? (
        <VoiceMessageBubble
          src={audioSrc}
          duration={audioDuration ?? "0:00"}
          transcript={text}
          time={time}
        />
      ) : (
        <div className={role === "npc" ? "bubble bubble--npc" : "bubble bubble--player"}>
          {trapLink ? (
            <TextWithTrapLink
              text={text}
              trapLink={trapLink}
              onClick={onTrapLinkClick}
              disabled={trapDisabled}
            />
          ) : (
            <span className="bubble__text">{text}</span>
          )}
          <span className="bubble__time">{time}</span>
        </div>
      )}
    </div>
  );
}
