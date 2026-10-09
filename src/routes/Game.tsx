import { Navigate, useParams } from "react-router-dom";
import ChatHeader from "../components/chat/ChatHeader";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import EndOfGameSummary from "../components/chat/EndOfGameSummary";
import { useChatSession } from "../hooks/useChatSession";
import { assetUrl } from "../lib/assetMap";
import "../components/chat/chat.css";

export default function Game() {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const {
    status,
    messages,
    contact,
    endSummary,
    evaluation,
    sendMessage,
    clickTrapLink,
    retryEvaluation,
    restart,
  } = useChatSession(scenarioId ?? "");

  if (!scenarioId) return <Navigate to="/jogo" replace />;

  const isTyping = status === "sending";
  const isOver =
    status === "won" || status === "lost" || status === "timeout" || status === "safety_stop";
  const avatar = contact ? assetUrl(contact.avatarAsset) : "";

  return (
    <div className="chat">
      <ChatHeader
        contactName={contact?.name ?? "Carregando..."}
        avatar={avatar}
        isTyping={isTyping}
      />

      <ChatWindow
        messages={messages}
        isTyping={isTyping}
        onTrapLinkClick={clickTrapLink}
        trapDisabled={status !== "in_progress"}
      />

      {status === "error" ? (
        <p className="chat-error">
          Não consegui falar com o servidor do jogo — pode ser muita gente
          jogando ao mesmo tempo. Espere um minutinho e tente novamente.
        </p>
      ) : (
        <ChatInput
          disabled={status !== "in_progress"}
          onSend={sendMessage}
        />
      )}

      {isOver && endSummary && (
        <EndOfGameSummary
          status={status as "won" | "lost" | "timeout" | "safety_stop"}
          summary={endSummary}
          evaluation={evaluation}
          onRetry={restart}
          onRetryEvaluation={retryEvaluation}
        />
      )}
    </div>
  );
}
