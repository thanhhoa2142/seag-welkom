"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { askLangflow, getChatLogs } from "@/app/actions/langflow";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: string;
}

export default function Chatbot() {
  const [newMessage, setNewMessage] = useState("");
  const mesEndRef = useRef<HTMLDivElement>(null);
  const { data: chatLogs, refetch } = useQuery({
    queryKey: ["chatLogs"],
    queryFn: getChatLogs,
  });
  const messages = (
    chatLogs?.map((log): [Message, Message] => [
      {
        id: log.id + "user",
        content: log.messageText,
        sender: "user",
        timestamp: log.timestamp.toLocaleString(),
      },
      {
        id: log.id + "bot",
        content: log.responseText,
        sender: "bot",
        timestamp: log.timestamp.toLocaleString(),
      },
    ]) || []
  ).flat();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["askLangflow"],
    mutationFn: askLangflow,
  });

  useEffect(() => {
    mesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLogs]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    await mutateAsync(newMessage);
    await refetch();

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
      <div className="font-bold flex items-center gap-1 text-lg px-4 pt-4">
        <Image
          src={"/chatbot.png"}
          width={24}
          height={24}
          alt="Chatbot"
          className="-mt-0.5"
        />
        Kom - Chatbot
      </div>
      <div className="text-sm text-gray-500 py-1 pl-4 pr-8">
        Hi, I am Kom, your personal assistant. This is private message, end to
        end encrypted...
      </div>

      <div className="flex-1 overflow-y-hidden space-y-2 p-4 bg-white">
        {messages.map((mes) => (
          <div
            key={mes.id}
            className={`flex ${
              mes.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[90%] rounded-lg p-3 ${
                mes.sender === "user"
                  ? "bg-emerald-700 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <ReactMarkdown className="text-sm">{mes.content}</ReactMarkdown>
              <p className="text-xs opacity-60 mt-2">
                {/* {format(mes.timestamp, "HH:mm a dd/MM/yyyy")} */}
                {mes.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={mesEndRef} />
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
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isPending}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
