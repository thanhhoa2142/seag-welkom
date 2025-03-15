/** @format */

"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Minimize2, Maximize2, Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Please ask me anything about Melbourne!",
    sender: "bot",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    content: "What's the best coffee spot in the CBD?",
    sender: "user",
    timestamp: "10:31 AM",
  },
  {
    id: "3",
    content: "Try Brother Baba Budan on Little Bourke St - great flat whites!",
    sender: "bot",
    timestamp: "10:32 AM",
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const mesEndRef = useRef<HTMLDivElement>(null);

  // Open chat on page load
  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    mesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to bottom when new messages are added
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

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

    // TODO: handle more logic - need supabase stuff and ai
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-10 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card
          className={`w-80 pt-0 rounded-t-xl overflow-hidden transition-all duration-300 ${
            isMinimized ? "h-12" : "h-[400px]"
          }`}
        >
          <CardHeader className="p-3 flex flex-row items-center justify-between bg-primary text-primary-foreground">
            <div className="font-semibold flex items-center">
              <MessageCircle className="mr-2 h-4 w-4" />
              Chatbot
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMinimize}
                className="p-1 text-primary-foreground hover:bg-primary-foreground/20"
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="p-1 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <div className="flex flex-col h-[calc(100%-48px)]">
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((mes) => (
                    <div
                      key={mes.id}
                      className={`flex ${
                        mes.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          mes.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{mes.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {mes.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={mesEndRef} />
                </div>
              </CardContent>
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask about Melbourne..."
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
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
