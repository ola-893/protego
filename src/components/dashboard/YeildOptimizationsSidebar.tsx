'use client'

import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, DollarSign, Zap, ArrowUpRight, ArrowDownRight,
  Coins, Shield, Star, Sparkles, Wand2, Target, Award
} from 'lucide-react'

interface YieldOptimizationSidebarProps {
  onSpellCast: (spell: string) => void
}

interface StakingOpportunity {
  id: string
  protocol: string
  apy: number
  tvl: string
  riskScore: number
  minAmount: string
  description: string
  verified: boolean
  spell: string
}

interface WalletAnalysis {
  totalValue: number
  currentAPY: number
  recommendations: string[]
  riskDistribution: {
    low: number
    medium: number
    high: number
  }
}

export const YieldOptimizationSidebar: React.FC<YieldOptimizationSidebarProps> = ({ onSpellCast }) => {
  const [opportunities, setOpportunities] = useState<StakingOpportunity[]>([])
  const [walletAnalysis, setWalletAnalysis] = useState<WalletAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Mock data - replace with actual API calls to your ElizaOS agent
  useEffect(() => {
    const mockOpportunities: StakingOpportunity[] = [
      {
        id: '1',
        protocol: 'Astroport LP',
        apy: 18.5,
        tvl: '4.2M SEI',
        riskScore: 85,
        minAmount: '100 SEI',
        description: 'Stable LP pair with auto-compounding rewards',
        verified: true,
        spell: 'Accio Profit'
      },
      {
        id: '2',
        protocol: 'StellaSwap Farms',
        apy: 24.3,
        tvl: '2.1M SEI',
        riskScore: 72,
        minAmount: '50 SEI',
        description: 'High-yield farming with bonus token rewards',
        verified: true,
        spell: 'Geminio Galleon'
      },
      {
        id: '3',
        protocol: 'Dragonswap Vaults',
        apy: 31.7,
        tvl: '1.8M SEI',
        riskScore: 65,
        minAmount: '200 SEI',
        description: 'Aggressive yield strategy with higher volatility',
        verified: false,
        spell: 'Fortuna Major'
      }
    ]

    const mockWalletAnalysis: WalletAnalysis = {
      totalValue: 12450.67,
      currentAPY: 8.2,
      recommendations: [
        'Move 30% from low-yield staking to Astroport LP',
        'Consider diversifying into 3 different protocols',
        'Current risk exposure is too conservative'
      ],
      riskDistribution: {
        low: 65,
        medium: 25,
        high: 10
      }
    }

    setOpportunities(mockOpportunities)
    setWalletAnalysis(mockWalletAnalysis)
  }, [])

  const analyzeWallet = async (walletAddress?: string) => {
    setIsAnalyzing(true)
    onSpellCast('Specialis Revelio')
    
    // This would normally communicate with your ElizaOS agent
    // The agent would use the MCP plugin to analyze the wallet
    setTimeout(() => {
      setIsAnalyzing(false)
      // Update wallet analysis with real data
    }, 2000)
  }

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 80) return 'text-emerald-500 bg-emerald-500/10'
    if (riskScore >= 60) return 'text-yellow-500 bg-yellow-500/10'
    return 'text-red-500 bg-red-500/10'
  }

  const handleStakeOpportunity = (opportunity: StakingOpportunity) => {
    onSpellCast(opportunity.spell)
    // Here you would integrate with your staking logic
  }

  return (
    <div className="h-full flex flex-col bg-slate-900/30 backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-ping" />
          </div>
          <h2 className="text-lg font-semibold text-white">Yield Optimization</h2>
        </div>

        <button
          onClick={() => analyzeWallet()}
          disabled={isAnalyzing}
          className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:opacity-50 px-4 py-2 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all"
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Target className="w-4 h-4" />
              Cast Analysis Spell
            </>
          )}
        </button>
      </div>

      {/* Wallet Analysis */}
      {walletAnalysis && (
        <div className="p-4 border-b border-slate-800/50">
          <h3 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Portfolio Divination
          </h3>

          <div className="space-y-3">
            <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Total Treasury</span>
                <span className="text-lg font-bold text-emerald-400">
                  ${walletAnalysis.totalValue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Current Yield</span>
                <span className="text-sm font-medium text-yellow-400">
                  {walletAnalysis.currentAPY}% APY
                </span>
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
              <h4 className="text-sm font-medium text-white mb-2">Risk Distribution</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400">Low Risk</span>
                  <span>{walletAnalysis.riskDistribution.low}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-yellow-400">Medium Risk</span>
                  <span>{walletAnalysis.riskDistribution.medium}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-red-400">High Risk</span>
                  <span>{walletAnalysis.riskDistribution.high}%</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
              <h4 className="text-sm font-medium text-white mb-2">Crystal Ball Insights</h4>
              <div className="space-y-1">
                {walletAnalysis.recommendations.map((rec, index) => (
                  <p key={index} className="text-xs text-slate-400">• {rec}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Staking Opportunities */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Golden Snitch Opportunities ({opportunities.length})
          </h3>

          <div className="space-y-3">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50 hover:border-slate-600/50 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm text-white flex items-center gap-2">
                        {opportunity.protocol}
                        {opportunity.verified && (
                          <Award className="w-3 h-3 text-emerald-400" />
                        )}
                      </h4>
                      <p className="text-xs text-slate-400">{opportunity.description}</p>
                    </div>
                    <span className="text-lg font-bold text-emerald-400">
                      {opportunity.apy}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">TVL:</span>
                      <span className="text-slate-300">{opportunity.tvl}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Min:</span>
                      <span className="text-slate-300">{opportunity.minAmount}</span>
                    </div>
                    <div className="flex items-center justify-between col-span-2">
                      <span className="text-slate-500">Risk Score:</span>
                      <span className={`px-2 py-1 rounded text-xs ${getRiskColor(opportunity.riskScore)}`}>
                        {opportunity.riskScore}/100
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStakeOpportunity(opportunity)}
                    className="w-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 hover:from-emerald-500/30 hover:to-blue-500/30 px-3 py-2 rounded text-sm font-medium text-white flex items-center justify-center gap-2 transition-all"
                  >
                    <Wand2 className="w-4 h-4" />
                    Cast {opportunity.spell}
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-slate-800/50">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Quick Spells</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSpellCast('Accio Safe Yield')}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 px-3 py-2 rounded text-xs font-medium text-emerald-400 flex items-center justify-center gap-1 transition-all"
            >
              <Shield className="w-3 h-3" />
              Safe Yields
            </button>
            <button
              onClick={() => onSpellCast('Geminio Profits')}
              className="bg-yellow-500/20 hover:bg-yellow-500/30 px-3 py-2 rounded text-xs font-medium text-yellow-400 flex items-center justify-center gap-1 transition-all"
            >
              <Coins className="w-3 h-3" />
              High APY
            </button>
            <button
              onClick={() => onSpellCast('Protego Portfolio')}
              className="bg-blue-500/20 hover:bg-blue-500/30 px-3 py-2 rounded text-xs font-medium text-blue-400 flex items-center justify-center gap-1 transition-all col-span-2"
            >
              <Zap className="w-3 h-3" />
              Auto-Optimize Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}