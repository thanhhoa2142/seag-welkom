"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { askLangflow } from "@/app/actions/langflow";

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
    content: "Where can I get Sim Card in Melbourne?",
    sender: "user",
    timestamp: "10:31 AM",
  },
  {
    id: "3",
    content:
      "You can get a SIM card in Melbourne at Melbourne Airport (MEL) from Vodafone, Optus, or SIM vending machines in the arrivals hall. In the city, SIM cards are available at Telstra, Optus, and Vodafone stores, as well as supermarkets like Coles, Woolworths, and ALDI. For a hassle-free option, you can also use eSIM providers like Airalo or SimCorner without needing a physical card.",
    sender: "bot",
    timestamp: "10:32 AM",
  },
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const mesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
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
    const result = await askLangflow(newMessage);
    console.log(result);

    setNewMessage("");
    // TODO: Add bot response logic (e.g., Supabase or AI integration)
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="font-bold flex items-center gap-1 text-lg">
        <Image
          src={"/chatbot.png"}
          width={24}
          height={24}
          alt="Chatbot"
          className="-mt-0.5"
        />
        Kom - Chatbot
      </div>
      <div className="text-sm text-gray-500 py-1">
        Hi, I am Kom, your personal assistant. This is private message, end to
        end encrypted...
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto p-4 bg-white">
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
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <p className="text-sm">{mes.content}</p>
                  <p className="text-xs opacity-70 mt-1">{mes.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={mesEndRef} />
          </div>
        </div>
        <div className="border-t p-4 bg-white">
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-gray-100 border-none rounded-md"
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-green-500 hover:bg-green-600 text-white rounded-md"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
