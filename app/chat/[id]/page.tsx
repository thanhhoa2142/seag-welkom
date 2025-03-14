import { ChatWindow } from "../components/chat-window";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat with your friends",
};

interface ChatPageProps {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  return (
    <div className="container relative min-h-screen">
      <ChatWindow friendId={params.id} />
    </div>
  );
}
