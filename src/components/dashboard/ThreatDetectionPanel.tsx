'use client'

import React, { useState, useEffect } from 'react'
import { 
  AlertTriangle, Shield, Eye, Zap, Clock, Users, 
  MessageSquare, ExternalLink, Sparkles, Wand2
} from 'lucide-react'

interface ThreatDetectionPanelProps {
  onSpellCast: (spell: string) => void
}

interface Threat {
  id: string
  type: 'contract' | 'social' | 'transaction'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  source: string
  timestamp: string
  spell?: string
}

interface SocialAlert {
  id: string
  platform: 'telegram' | 'discord' | 'twitter'
  message: string
  mentions: number
  timestamp: string
  riskLevel: 'safe' | 'warning' | 'danger'
}

export const ThreatDetectionPanel: React.FC<ThreatDetectionPanelProps> = ({ onSpellCast }) => {
  const [threats, setThreats] = useState<Threat[]>([])
  const [socialAlerts, setSocialAlerts] = useState<SocialAlert[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for demonstration - replace with actual SEI MCP server calls
  useEffect(() => {
    const mockThreats: Threat[] = [
      {
        id: '1',
        type: 'contract',
        severity: 'critical',
        title: 'Malicious Contract Detected',
        description: 'High-risk DeFi contract with suspicious drain functions',
        source: '0x742d35Cc6e8A2B3C456E...a8F9',
        timestamp: '2 min ago',
        spell: 'Protego Maxima'
      },
      {
        id: '2',
        type: 'social',
        severity: 'high',
        title: 'Coordinated Shill Campaign',
        description: 'Bot network promoting fake yield farming protocol',
        source: 'Telegram: DeFi Wizards',
        timestamp: '5 min ago',
        spell: 'Revelio'
      },
      {
        id: '3',
        type: 'transaction',
        severity: 'medium',
        title: 'Unusual Transaction Pattern',
        description: 'Large wallet movements suggesting possible rug pull',
        source: 'On-chain Analysis',
        timestamp: '12 min ago',
        spell: 'Homenum Revelio'
      }
    ]

    const mockSocialAlerts: SocialAlert[] = [
      {
        id: '1',
        platform: 'telegram',
        message: 'NEW DEFI GEM 🚀 1000x POTENTIAL',
        mentions: 50,
        timestamp: '1 min ago',
        riskLevel: 'danger'
      },
      {
        id: '2',
        platform: 'discord',
        message: 'Astroport LP farming looks legit',
        mentions: 15,
        timestamp: '8 min ago',
        riskLevel: 'safe'
      }
    ]

    setThreats(mockThreats)
    setSocialAlerts(mockSocialAlerts)
  }, [])

  // Function to fetch threats from SEI MCP server
  const fetchThreats = async () => {
    setIsLoading(true)
    try {
      // Replace with actual SEI MCP server endpoint
      const response = await fetch('/api/sei-mcp/threats')
      const data = await response.json()
      setThreats(data.threats || [])
    } catch (error) {
      console.error('Failed to fetch threats:', error)
    }
    setIsLoading(false)
  }

  // Function to fetch social alerts from SEI MCP server
  const fetchSocialAlerts = async () => {
    try {
      const response = await fetch('/api/sei-mcp/social-alerts')
      const data = await response.json()
      setSocialAlerts(data.alerts || [])
    } catch (error) {
      console.error('Failed to fetch social alerts:', error)
    }
  }

  useEffect(() => {
    // Fetch data every 30 seconds
    const interval = setInterval(() => {
      fetchThreats()
      fetchSocialAlerts()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20'
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20'
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
      case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20'
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'danger': return 'text-red-500'
      case 'warning': return 'text-yellow-500'
      case 'safe': return 'text-emerald-500'
      default: return 'text-slate-500'
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'telegram': return '📱'
      case 'discord': return '🎮'
      case 'twitter': return '🐦'
      default: return '📢'
    }
  }

  const handleCastProtectionSpell = (threat: Threat) => {
    onSpellCast(threat.spell || 'Protego')
  }

  return (
    <div className="h-full flex flex-col bg-slate-900/30 backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <Shield className="w-6 h-6 text-blue-400" />
            <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-ping" />
          </div>
          <h2 className="text-lg font-semibold text-white">Threat Detection</h2>
        </div>

        <button
          onClick={() => {
            fetchThreats()
            onSpellCast('Revelio Totalum')
          }}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 px-4 py-2 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Cast Revelio
            </>
          )}
        </button>
      </div>

      {/* Threat Feed */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Active Threats ({threats.length})
          </h3>

          <div className="space-y-3">
            {threats.map((threat) => (
              <div
                key={threat.id}
                className={`p-3 rounded-lg border backdrop-blur-sm ${getSeverityColor(threat.severity)} relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{threat.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(threat.severity)} border`}>
                      {threat.severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-400 mb-2">{threat.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {threat.timestamp}
                    </div>
                    
                    <button
                      onClick={() => handleCastProtectionSpell(threat)}
                      className="text-xs bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 px-2 py-1 rounded flex items-center gap-1 transition-all"
                    >
                      <Wand2 className="w-3 h-3" />
                      Cast {threat.spell}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Alerts */}
        <div className="p-4 border-t border-slate-800/50">
          <h3 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Social Intelligence ({socialAlerts.length})
          </h3>

          <div className="space-y-2">
            {socialAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
              >
                <div className="flex items-start gap-2 mb-1">
                  <span className="text-lg">{getPlatformIcon(alert.platform)}</span>
                  <div className="flex-1">
                    <p className="text-xs text-slate-300">{alert.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Users className="w-3 h-3" />
                        {alert.mentions} mentions
                      </div>
                      <div className={`text-xs ${getRiskColor(alert.riskLevel)}`}>
                        {alert.riskLevel.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}