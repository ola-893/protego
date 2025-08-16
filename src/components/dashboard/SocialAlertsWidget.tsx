'use client'

import React, { useState, useEffect } from 'react'
import { 
  MessageSquare, X, ChevronUp, ChevronDown, Bell,
  Users, TrendingUp, AlertTriangle, CheckCircle,
  Sparkles, Wand2, Eye
} from 'lucide-react'

interface SocialAlertsWidgetProps {
  onSpellCast: (spell: string) => void
}

interface SocialAlert {
  id: string
  platform: 'telegram' | 'discord' | 'twitter'
  type: 'threat' | 'opportunity' | 'trending' | 'mention'
  title: string
  message: string
  mentions: number
  sentiment: 'positive' | 'negative' | 'neutral'
  timestamp: string
  groupName?: string
  verified?: boolean
}

export const SocialAlertsWidget: React.FC<SocialAlertsWidgetProps> = ({ onSpellCast }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [alerts, setAlerts] = useState<SocialAlert[]>([])
  const [newAlertsCount, setNewAlertsCount] = useState(0)

  // Mock data - replace with actual SEI MCP server calls
  useEffect(() => {
    const mockAlerts: SocialAlert[] = [
      {
        id: '1',
        platform: 'telegram',
        type: 'threat',
        title: 'Scam Alert',
        message: 'Fake "Sei Foundation" bot detected in multiple groups promoting malicious airdrop',
        mentions: 127,
        sentiment: 'negative',
        timestamp: '2 min ago',
        groupName: 'SEI Traders',
        verified: true
      },
      {
        id: '2',
        platform: 'discord',
        type: 'opportunity',
        title: 'New Protocol Launch',
        message: 'Astroport announcing new LP rewards program with 25% APY boost',
        mentions: 45,
        sentiment: 'positive',
        timestamp: '5 min ago',
        groupName: 'DeFi Dragons',
        verified: true
      },
      {
        id: '3',
        platform: 'twitter',
        type: 'trending',
        title: 'Trending Discussion',
        message: 'SEI network upgrade discussions trending with mostly positive sentiment',
        mentions: 892,
        sentiment: 'positive',
        timestamp: '12 min ago',
        verified: false
      }
    ]

    setAlerts(mockAlerts)
    setNewAlertsCount(mockAlerts.length)

    // Simulate new alerts coming in
    const interval = setInterval(() => {
      setNewAlertsCount(prev => prev + Math.floor(Math.random() * 2))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'telegram': return '📱'
      case 'discord': return '🎮'
      case 'twitter': return '🐦'
      default: return '📢'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'threat': return 'text-red-500 bg-red-500/10'
      case 'opportunity': return 'text-emerald-500 bg-emerald-500/10'
      case 'trending': return 'text-blue-500 bg-blue-500/10'
      case 'mention': return 'text-purple-500 bg-purple-500/10'
      default: return 'text-slate-500 bg-slate-500/10'
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="w-3 h-3 text-emerald-500" />
      case 'negative': return <AlertTriangle className="w-3 h-3 text-red-500" />
      case 'neutral': return <Eye className="w-3 h-3 text-slate-500" />
      default: return null
    }
  }

  const handleAlertAction = (alert: SocialAlert) => {
    if (alert.type === 'threat') {
      onSpellCast('Protego Totalum')
    } else if (alert.type === 'opportunity') {
      onSpellCast('Accio Opportunity')
    } else {
      onSpellCast('Revelio')
    }
  }

  const clearNewAlerts = () => {
    setNewAlertsCount(0)
  }

  return (
    <div className="relative">
      {/* Widget Toggle Button */}
      <button
        onClick={() => {
          setIsExpanded(!isExpanded)
          if (!isExpanded) clearNewAlerts()
        }}
        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 p-3 rounded-full shadow-lg text-white transition-all duration-200 hover:scale-110 relative"
      >
        <MessageSquare className="w-6 h-6" />
        {newAlertsCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
            {newAlertsCount > 9 ? '9+' : newAlertsCount}
          </div>
        )}
        <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -left-1 animate-ping" />
      </button>

      {/* Expanded Widget */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 w-80 bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold text-white">Social Intelligence</h3>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Alerts List */}
          <div className="max-h-96 overflow-y-auto">
            <div className="p-2 space-y-2">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/30 hover:border-slate-600/50 transition-all group"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0">
                      {getPlatformIcon(alert.platform)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-1 rounded ${getTypeColor(alert.type)}`}>
                          {alert.type.toUpperCase()}
                        </span>
                        {alert.verified && (
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                        )}
                        {getSentimentIcon(alert.sentiment)}
                      </div>
                      
                      <h4 className="font-medium text-sm text-white mb-1">
                        {alert.title}
                      </h4>
                      
                      <p className="text-xs text-slate-300 mb-2 line-clamp-2">
                        {alert.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          {alert.groupName && (
                            <span>{alert.groupName}</span>
                          )}
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {alert.mentions}
                          </div>
                          <span>{alert.timestamp}</span>
                        </div>
                        
                        <button
                          onClick={() => handleAlertAction(alert)}
                          className="opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 px-2 py-1 rounded text-xs flex items-center gap-1 transition-all"
                        >
                          <Wand2 className="w-3 h-3" />
                          Cast Spell
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-3 border-t border-slate-700/50 flex gap-2">
            <button
              onClick={() => onSpellCast('Muffliato Socialis')}
              className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 px-3 py-2 rounded text-sm font-medium text-blue-400 flex items-center justify-center gap-2 transition-all"
            >
              <Bell className="w-4 h-4" />
              Silence All
            </button>
            <button
              onClick={() => {
                onSpellCast('Revelio Socialis')
                // Refresh alerts from SEI MCP server
              }}
              className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 px-3 py-2 rounded text-sm font-medium text-emerald-400 flex items-center justify-center gap-2 transition-all"
            >
              <Eye className="w-4 h-4" />
              Scan Networks
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}