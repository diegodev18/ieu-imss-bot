export type ContextWithSession = Context & {
  session?: {
    id: number;
    chat_id: number;
    admin_user_tokens_id: number;
    user_metadata: string;
    created_at: Date;
  };
};
