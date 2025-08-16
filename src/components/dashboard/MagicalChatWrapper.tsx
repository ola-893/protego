'use client'


import React, { useState, useEffect } from 'react'
import { 
  Shield, AlertTriangle, TrendingUp, Activity, Sparkles, 
  Star, Wand2, Eye, Zap, Users, MessageSquare, ArrowRight,
  Bell, DollarSign, Home, Settings
} from 'lucide-react'
import { ThreatDetectionPanel } from './ThreatDetectionPanel'
import { YieldOptimizationSidebar } from './YeildOptimizationsSidebar'
import { SocialAlertsWidget } from './SocialAlertsWidget'

interface MagicalChatWrapperProps {
  children: React.ReactNode
}

export const MagicalChatWrapper: React.FC<MagicalChatWrapperProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(true)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [currentSpell, setCurrentSpell] = useState('')
  const [threatCount, setThreatCount] = useState(847)
  const [isSpellCasting, setIsSpellCasting] = useState(false)

  // Generate floating sparkles for magical effect
  const generateSparkles = () => {
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }))
    setSparkles(newSparkles)
  }

  useEffect(() => {
    generateSparkles()
    const sparkleInterval = setInterval(generateSparkles, 10000)
    return () => clearInterval(sparkleInterval)
  }, [])

  // Update threat count periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  const castSpell = (spellName: string) => {
    setCurrentSpell(spellName)
    setIsSpellCasting(true)
    setTimeout(() => {
      setIsSpellCasting(false)
      setCurrentSpell('')
    }, 2000)
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} relative overflow-hidden`}>
      {/* Magical background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
        {sparkles.map((sparkle) => (
          <Star
            key={sparkle.id}
            className="absolute w-1 h-1 text-yellow-400 opacity-30 animate-pulse"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Spell casting notification */}
      {currentSpell && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg animate-fade-in-down">
            <Sparkles className="w-5 h-5 animate-spin" />
            <span className="font-medium">✨ {currentSpell} ✨</span>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-40 ${isDark ? 'bg-slate-950/80' : 'bg-white/80'} backdrop-blur-md border-b ${isDark ? 'border-slate-800/50' : 'border-slate-200/50'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-ping" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              Protego AI
            </span>
          </div>

          {/* Threat Counter */}
          <div className={`flex items-center gap-2 ${isDark ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'bg-orange-100 border-orange-300 text-orange-600'} border rounded-full px-4 py-2 relative overflow-hidden`}>
            <AlertTriangle className="w-4 h-4" />
            <span className="font-mono text-sm">
              {threatCount.toLocaleString()} threats blocked
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => castSpell('Protego Totalum')}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} transition-colors`}
            >
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} transition-colors`}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Layout */}
      <div className="pt-16 flex h-screen">
        {/* Threat Detection Sidebar */}
        <div className="w-80 border-r border-slate-800/50 bg-slate-900/20 backdrop-blur-sm">
          <ThreatDetectionPanel onSpellCast={castSpell} />
        </div>

        {/* Main Chat Interface - Your existing content goes here */}
        <div className="flex-1 flex flex-col relative">
          {/* Magical overlay for existing chat */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/2 to-purple-500/2 pointer-events-none" />
          
          {/* Your existing chat interface wrapped with magical styling */}
          <div className="relative z-10 flex-1 flex flex-col">
            {children}
          </div>
        </div>

        {/* Yield Optimization Sidebar */}
        <div className="w-80 border-l border-slate-800/50 bg-slate-900/20 backdrop-blur-sm">
          <YieldOptimizationSidebar onSpellCast={castSpell} />
        </div>
      </div>

      {/* Social Alerts Widget - Floating */}
      <div className="fixed bottom-6 right-6 z-30">
        <SocialAlertsWidget onSpellCast={castSpell} />
      </div>

      {/* Magical Status Bar */}
      <div className={`fixed bottom-0 w-full ${isDark ? 'bg-slate-950/90' : 'bg-white/90'} backdrop-blur-sm border-t ${isDark ? 'border-slate-800/50' : 'border-slate-200/50'} h-8`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center">
          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>SEI MCP Connected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>ElizaOS Agent Active</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-yellow-400 animate-spin" />
              <span className={isDark ? 'text-yellow-400' : 'text-yellow-600'}>Magical Wards Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}