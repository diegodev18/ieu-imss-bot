export type Session = {
  id: number;
  chat_id: number;
  admin_id: number;
  user_metadata: Object;
  company: {
    id: number;
    name: string;
    rfc: string;
    status: "active" | "inactive";
    created_at: Date;
  };
  created_at: Date;
};

export type ContextWithSession = Context & {
  session?: Session;
};
