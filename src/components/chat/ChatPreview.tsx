import { ArrowLeft, Send } from "lucide-react";
import gerenteAvatar from "../../assets/gerente.png";
import "./chat.css";
import "./ChatPreview.css";

interface PreviewMessage {
  role: "npc" | "player";
  text: string;
}

interface ChatPreviewProps {
  messages: PreviewMessage[];
  typing?: boolean;
}

export default function ChatPreview({ messages, typing }: ChatPreviewProps) {
  return (
    <div className="chat-preview">
      <div className="chat-preview__frame">
        <div className="chat-header chat-preview__header">
          <ArrowLeft size={18} className="chat-preview__back" />
          <img src={gerenteAvatar} alt="" className="chat-header__avatar" />
          <div>
            <div className="chat-header__name">Gerente Banco Seguro</div>
            <div
              className={
                typing
                  ? "chat-header__status chat-header__status--typing"
                  : "chat-header__status"
              }
            >
              {typing ? "digitando..." : "online"}
            </div>
          </div>
        </div>

        <div className="chat-window chat-preview__window">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "npc" ? "bubble-row bubble-row--npc" : "bubble-row bubble-row--player"
              }
            >
              <div className={message.role === "npc" ? "bubble bubble--npc" : "bubble bubble--player"}>
                <span className="bubble__text">{message.text}</span>
              </div>
            </div>
          ))}
          {typing && (
            <div className="bubble-row bubble-row--npc">
              <div className="bubble bubble--npc typing-bubble">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        <div className="chat-input chat-preview__input">
          <span className="chat-preview__field">Digite sua resposta...</span>
          <span className="chat-input__send chat-preview__send">
            <Send size={16} />
          </span>
        </div>
      </div>
    </div>
  );
}
