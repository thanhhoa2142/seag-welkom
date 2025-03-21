import ChatFriend from "../components/chat-window";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat with your friends",
};

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  return <ChatFriend connectionId={(await params).id} />;
}
