"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ChatSessions } from "@/components/chat-sessions";

export const LandingChatSessions = () => {
  const [userEntity, setUserEntity] = useState<string | null>(null);

  // Initialize user entity on client side only to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEntity = localStorage.getItem("elizaHowUserEntity");
      if (storedEntity) {
        setUserEntity(storedEntity);
      } else {
        const newEntity = uuidv4();
        localStorage.setItem("elizaHowUserEntity", newEntity);
        setUserEntity(newEntity);
      }
    }
  }, []);

  return (
    <div className="w-full relative">
      {/* Magical container with subtle glow */}
      <div className="relative">
        {/* Subtle magical background */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl blur-xl opacity-50" />
        
        {/* Main content */}
        <div className="relative z-10">
          <ChatSessions userId={userEntity} />
        </div>
      </div>
    </div>
  );
};

export default LandingChatSessions;