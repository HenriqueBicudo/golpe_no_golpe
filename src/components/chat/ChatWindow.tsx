import { useEffect, useRef } from "react";
import MessageBubble, { type ChatMessage } from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface ChatWindowProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onTrapLinkClick?: () => void;
  trapDisabled?: boolean;
}

export default function ChatWindow({ messages, isTyping, onTrapLinkClick, trapDisabled }: ChatWindowProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  return (
    <div className="chat-window">
      <span className="chat-day-divider">Hoje</span>
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          {...message}
          onTrapLinkClick={onTrapLinkClick}
          trapDisabled={trapDisabled}
        />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={endRef} />
    </div>
  );
}
