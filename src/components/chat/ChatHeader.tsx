import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ChatHeaderProps {
  contactName: string;
  avatar: string;
  isTyping: boolean;
}

export default function ChatHeader({ contactName, avatar, isTyping }: ChatHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="chat-header">
      <button
        className="chat-header__back"
        aria-label="Voltar"
        onClick={() => navigate("/jogo")}
      >
        <ArrowLeft size={20} />
      </button>
      {avatar && <img src={avatar} alt="" className="chat-header__avatar" />}
      <div>
        <div className="chat-header__name">{contactName}</div>
        <div
          className={
            isTyping
              ? "chat-header__status chat-header__status--typing"
              : "chat-header__status"
          }
        >
          {isTyping ? "digitando..." : "online"}
        </div>
      </div>
    </div>
  );
}
