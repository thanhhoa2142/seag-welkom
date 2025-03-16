"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import {
  createMessage,
  getChatFromConnectionId,
} from "@/app/actions/connection";
import { format } from "date-fns";
import EmojiAvatar from "@/components/ui2/emoji-avatar";
import { getAvatarAttributes } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ChatFriend({ connectionId }: { connectionId: string }) {
  const [newMessage, setNewMessage] = useState("");
  const mesEndRef = useRef<HTMLDivElement>(null);
  const { data, refetch } = useQuery({
    queryKey: ["chatLogs"],
    queryFn: () => getChatFromConnectionId(connectionId),
  });
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["createMessage"],
    mutationFn: createMessage,
  });

  const me = data?.user;
  const friend = data?.friend;
  const messages = data?.chatConnections;
  const avatar = friend?.username && getAvatarAttributes(friend.username);

  useEffect(() => {
    mesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!me || !friend) return;
    if (!newMessage.trim()) return;

    await mutateAsync({ from: me.id, to: friend.id, message: newMessage });
    await refetch();

    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {friend && avatar && (
        <>
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ backgroundColor: `${avatar.color}30` }}
          >
            <Link href="/friends">
              <ChevronLeft />
            </Link>
            <EmojiAvatar name={friend.username} className="size-11" />
            <div>
              <strong>{friend.username}</strong>
              <p className="text-xs text-gray-500">Online 3 mins ago</p>
            </div>
          </div>
        </>
      )}
      <div
        className="flex-1 overflow-y-hidden space-y-2 p-4"
        style={{ backgroundColor: `${avatar && avatar.color}10` }}
      >
        {messages?.map((mes) => {
          return (
            <div
              key={mes.id}
              className={`flex ${
                mes.userTwoId === friend?.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] rounded-xl p-3 ${
                  mes.userTwoId === friend?.id
                    ? "bg-emerald-700 text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                <ReactMarkdown className="text-sm">{mes.message}</ReactMarkdown>
                <p className="text-xs opacity-60 mt-2">
                  {format(mes.createdAt, "HH:mm a dd/MM/yyyy")}
                </p>
              </div>
            </div>
          );
        })}
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
