export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface GenerateOptions {
  temperature?: number;
}

export interface LLMProvider {
  name: string;
  generate(messages: ChatMessage[], options?: GenerateOptions): Promise<string>;
}
