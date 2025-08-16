import { Suspense } from "react";

import { Footer } from "@/components/footer";
import { LandingTextarea } from "@/components/landing-textarea";
import { LandingChatSessions } from "@/components/landing-chat-sessions";

import { MagicalChatWrapper } from '@/components/dashboard/MagicalChatWrapper'

export default function Dashboard() {
  return (
    <MagicalChatWrapper>
      <main className="flex-1 size-full overflow-hidden flex flex-col relative">
        {/* Magical background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/3 to-emerald-500/3 pointer-events-none" />
        
        {/* Floating magical elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-30"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 12}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>

        <div className="flex-1 size-full overflow-hidden flex flex-col justify-center items-center gap-8 px-4 md:px-0 relative z-10">
          {/* Magical Title with sparkles */}
          <div className="text-center relative">
            <div className="absolute -top-4 -left-4 animate-bounce">
              <span className="text-2xl">✨</span>
            </div>
            <div className="absolute -top-4 -right-4 animate-bounce delay-300">
              <span className="text-2xl">🔮</span>
            </div>
            <h1 className="text-3xl xl:text-4xl font-bold text-center tracking-tighter text-pretty relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Cast Your Magical Query
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60" />
            </h1>
            <p className="text-slate-400 mt-4 text-lg">
              Ask about spells, potions, magical defenses, or yield enchantments
            </p>
          </div>

          {/* Magical Input Section */}
          <div className="max-w-xl mx-auto w-full">
            <div className="relative group">
              {/* Magical glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <Suspense fallback={null}>
                <LandingTextarea />
              </Suspense>
            </div>
          </div>

          {/* Magical Divider */}
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-slate-600" />
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-full backdrop-blur-sm">
              <span className="text-sm text-slate-400">Previous Magical Consultations</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-600 to-slate-600" />
          </div>

          {/* Previous Chat Sessions with magical styling */}
          <div className="max-w-2xl mx-auto w-full">
            <div className="relative">
              {/* Subtle magical background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-slate-800/20 rounded-xl blur-sm" />
              
              <Suspense fallback={null}>
                <LandingChatSessions />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </MagicalChatWrapper>
  );
}