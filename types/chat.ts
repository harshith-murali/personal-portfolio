export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface RecruiterLead {
  name: string;
  company: string;
  email: string;
  reason: string;
  notes?: string;
  timestamp: string;
}

export interface SuggestionChip {
  id: string;
  label: string;
  prompt: string;
}

export interface ChatApiRequest {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}
