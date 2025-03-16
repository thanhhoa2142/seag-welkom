"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send } from "lucide-react";
import EmojiAvatar from "@/components/ui2/emoji-avatar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "friend";
  timestamp: string;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastSeen?: string;
}

const mockFriend: Friend = {
  id: "1",
  name: "Sarah Chen",
  avatar: "/avatars/sarah.jpg",
  status: "online",
};

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hey! How&apos;s your campus exploration going?",
    sender: "friend",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    content: "It&apos;s great! I just visited the Central Library",
    sender: "user",
    timestamp: "10:31 AM",
  },
  {
    id: "3",
    content: "That&apos;s awesome! Have you checked out the Student Hub yet?",
    sender: "friend",
    timestamp: "10:32 AM",
  },
];

interface ChatWindowProps {
  friendId: string;
}

export function ChatWindow({ friendId }: ChatWindowProps) {
  const router = useRouter();
  const [friend] = useState<Friend>(mockFriend);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  console.log(friendId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <EmojiAvatar name={friend.name} />
            <div>
              <h2 className="font-semibold">{friend.name}</h2>
              <Badge
                variant={friend.status === "online" ? "default" : "secondary"}
                className="text-xs"
              >
                {friend.status === "online" ? "Online" : "Offline"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
