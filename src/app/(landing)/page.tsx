// src/components/landing/CompleteLandingPage.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { 
  Shield, Bot, Activity, TrendingUp, AlertTriangle, 
  MessageSquare, Users, Eye, Lock, Zap, CheckCircle, 
  Moon, Sun, ArrowUpRight, Search,
  DollarSign, Globe, Briefcase, ArrowRight, Menu, X,
  Home, LayoutDashboard, LineChart, UserCheck, Headphones,
  Sparkles, Star, Wand2, Heart, Award, Coins, Mail
} from 'lucide-react'
import { useRouter } from 'next/navigation';

interface CompleteLandingPageProps {
  onEnterDashboard: () => void
}

export const CompleteLandingPage: React.FC<CompleteLandingPageProps> = ({ onEnterDashboard }) => {
  const [isDark, setIsDark] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [landingThreatCount, setLandingThreatCount] = useState(228)
  const [isAnimating, setIsAnimating] = useState(false)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([])
  const [currentSpell, setCurrentSpell] = useState('')
  const router = useRouter();

  const handleEnterDashboard = () => {
    // Call the prop function (for any custom logic)
    // onEnterDashboard();
    
    // Navigate to dashboard
    router.push('/dashboard');
  };
  // Generate floating sparkles
  const generateSparkles = () => {
    const newSparkles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2
    }))
    setSparkles(newSparkles)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setLandingThreatCount(prev => prev + Math.floor(Math.random() * 3) + 1)
        setIsAnimating(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    generateSparkles()
    const sparkleInterval = setInterval(generateSparkles, 8000)
    return () => clearInterval(sparkleInterval)
  }, [])

  // Demo spells for interaction
  const castSpell = (spellName: string) => {
    setCurrentSpell(spellName)
    setTimeout(() => setCurrentSpell(''), 2000)
  }

  const MagicalThreatCounter = ({ count }: { count: number }) => (
    <div className={`inline-flex items-center gap-2 ${isDark ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'bg-orange-100 border-orange-300 text-orange-600'} border rounded-full px-4 py-2 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-shimmer" />
      <div className="relative">
        <AlertTriangle className={`w-4 h-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
        <div className={`absolute -top-1 -right-1 w-2 h-2 ${isDark ? 'bg-orange-500' : 'bg-orange-500'} rounded-full animate-pulse`} />
      </div>
      <span className={`${isDark ? 'text-orange-400' : 'text-orange-600'} font-mono text-sm relative`}>
        {count.toLocaleString()} dark curses detected
      </span>
    </div>
  )

  const EnchantedFeatureCard = ({ icon: Icon, title, description, gradient }: {
    icon: React.ElementType
    title: string
    description: string
    gradient: string
  }) => (
    <div className={`group relative ${isDark ? 'bg-slate-900/50 border-slate-800/50' : 'bg-white/80 border-slate-200/50'} backdrop-blur-sm border rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden`}>
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping`}
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className={`mb-4 p-3 ${isDark ? 'bg-slate-800/50' : 'bg-slate-100/80'} rounded-lg w-fit relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Icon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'} relative z-10`} />
        </div>
        <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'} mb-2 flex items-center gap-2`}>
          {title}
          <Sparkles className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </h3>
        <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>{description}</p>
      </div>
    </div>
  )

  const MysticalStatCard = ({ number, label, icon: Icon, color = "blue" }: {
    number: string
    label: string
    icon: React.ElementType
    color?: string
  }) => {
    const colorClasses: Record<string, string> = {
      blue: isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600',
      green: isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600',
      yellow: isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-100 text-amber-600',
      purple: isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-100 text-indigo-600',
      orange: isDark ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-100 text-orange-600'
    }

    return (
      <div className={`${isDark ? 'bg-slate-900/30 border-slate-800/50' : 'bg-white/60 border-slate-200/50'} backdrop-blur-sm border rounded-xl p-6 text-center relative overflow-hidden group hover:transform hover:scale-105 transition-all duration-300`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className={`mx-auto mb-3 p-3 ${colorClasses[color]} rounded-lg w-fit relative`}>
          <Icon className={`w-6 h-6 ${colorClasses[color].split(' ')[1]}`} />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100" />
        </div>
        <div className={`text-2xl font-bold ${colorClasses[color].split(' ')[1]} mb-1`}>{number}</div>
        <div className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-sm`}>{label}</div>
      </div>
    )
  }

  const TestimonialCard = ({ name, role, avatar, quote, platform, spellsCast }: {
    name: string
    role: string
    avatar: string
    quote: string
    platform: string
    spellsCast: number
  }) => (
    <div className={`${isDark ? 'bg-slate-900/50 border-slate-800/50' : 'bg-white/80 border-slate-200/50'} backdrop-blur-sm border rounded-xl p-6 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300`}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-start gap-4 mb-4 relative z-10">
        <div className="relative">
          <div className={`w-12 h-12 rounded-full ${avatar} flex items-center justify-center text-white font-semibold text-lg`}>
            {name.charAt(0)}
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
            <CheckCircle className="w-2 h-2 text-white" />
          </div>
        </div>
        <div>
          <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{name}</h4>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{role} • {platform}</p>
          <div className="flex items-center gap-2 mt-1">
            <Wand2 className="w-3 h-3 text-purple-400" />
            <span className={`text-xs ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>{spellsCast} spells cast</span>
          </div>
        </div>
      </div>
      
      <blockquote className={`${isDark ? 'text-slate-300' : 'text-slate-700'} italic relative z-10`}>
        "{quote}"
      </blockquote>

      <div className="flex gap-1 mt-4 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} relative overflow-hidden`}>
      {/* Magical background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
        {sparkles.map((sparkle) => (
          <Star
            key={sparkle.id}
            className={`absolute w-2 h-2 text-yellow-400 opacity-20 animate-pulse`}
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.duration}s`
            }}
          />
        ))}
      </div>

      {/* Spell casting notification */}
      {currentSpell && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg">
            <Sparkles className="w-5 h-5 animate-spin" />
            <span className="font-medium">✨ {currentSpell} ✨</span>
          </div>
        </div>
      )}

      {/* Navigation */}
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

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className={`hover:${isDark ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>Spellbook</a>
            <a href="#testimonials" className={`hover:${isDark ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>Testimonials</a>
            <a href="#pricing" className={`hover:${isDark ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>Pricing</a>
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} transition-colors`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="mb-6">
              <MagicalThreatCounter count={landingThreatCount} />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight relative">
              <span className="relative">
                Magical AI Protection &
                <div className="absolute -top-2 -right-2 animate-bounce">
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                </div>
              </span>
              <span className="block bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">
                Enchanted Yields
              </span>
            </h1>
            
            <p className={`text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-12 max-w-3xl mx-auto leading-relaxed`}>
              The first magical AI that protects your digital treasures AND optimizes your yields. Real-time spell casting across DeFi protocols and wizarding communities, with intelligent potion brewing and auto-defense enchantments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => {
                  castSpell('Portal Opening')
                  handleEnterDashboard()
                }}
                className="group bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-200 transform hover:scale-105 flex items-center gap-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Wand2 className="w-5 h-5 relative z-10" />
                Enter the Castle
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </button>
              <button 
                onClick={() => castSpell('Revelio Demo')}
                className={`px-8 py-4 border ${isDark ? 'border-slate-600 hover:border-purple-400 hover:bg-slate-800/50' : 'border-slate-300 hover:border-purple-500 hover:bg-white/50'} rounded-xl font-semibold text-lg transition-all duration-200 flex items-center gap-2`}
              >
                <Eye className="w-5 h-5" />
                View Prophecy
              </button>
            </div>

            <div className="mt-12 flex justify-center">
              <div className={`flex items-center gap-2 ${isDark ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-emerald-600 bg-emerald-100 border-emerald-300'} border rounded-full px-4 py-2 relative`}>
                <Activity className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-medium">Magical Wards Active</span>
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-3 h-3 text-yellow-400 animate-spin" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`relative z-10 py-20 border-y ${isDark ? 'border-slate-800/50' : 'border-slate-200/50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <MysticalStatCard number="875" label="Spells Cast" icon={Wand2} />
            <MysticalStatCard number="54" label="Blocks Scried" icon={Eye} color="green" />
            <MysticalStatCard number="$2.1M" label="Treasures Protected" icon={Shield} color="blue" />
            <MysticalStatCard number="18.5%" label="Avg Potion Yield" icon={TrendingUp} color="yellow" />
            <MysticalStatCard number="99.2%" label="Ward Uptime" icon={Zap} color="purple" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 flex items-center justify-center gap-3">
              Intelligent Spellcraft &
              <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
              <span className={`block ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Yield Alchemy</span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto`}>
              Advanced magical AI that protects AND profits - seamlessly integrated across wizarding platforms and DeFi realms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EnchantedFeatureCard 
              icon={Shield}
              title="Socially-Powered Divination"
              description="Our Crystal Ball analyzes magical chatter across 100+ wizarding communities to discover new dark arts patterns and identify cursed contracts before they hex your vault."
              gradient="bg-gradient-to-br from-blue-600 to-indigo-500"
            />
            <EnchantedFeatureCard 
              icon={MessageSquare}
              title="Cross-Platform Patronus Network"
              description="Single protective charm powering payment shields and social ward. Unified magical architecture across Telegram owls, Discord familiars, and Twitter phoenixes."
              gradient="bg-gradient-to-br from-indigo-600 to-blue-500"
            />
            <EnchantedFeatureCard 
              icon={TrendingUp}
              title="Auto-Binding Yield Spells"
              description="When dark magic detected: cast Protego on malicious transactions, conjure safer yield potions, execute with wandless magic approval."
              gradient="bg-gradient-to-br from-emerald-600 to-teal-500"
            />
            <EnchantedFeatureCard 
              icon={Bot}
              title="Secure Payment Portkeys"
              description="AI scries recipient vaults before P2P or B2B transfers. Magical creature negotiations based on real-time curse assessment."
              gradient="bg-gradient-to-br from-blue-600 to-cyan-500"
            />
            <EnchantedFeatureCard 
              icon={Users}
              title="Auto-Defense Gringotts Vault"
              description="If treasures face the Killing Curse (rug detected), our House Elf automatically apparates assets to safety vault and transfigures to Muggle coins."
              gradient="bg-gradient-to-br from-teal-600 to-emerald-500"
            />
            <EnchantedFeatureCard 
              icon={Lock}
              title="Magical DeFi Prophecies"
              description="AI-driven crystal ball gazing scans blockchain prophecies for threats and opportunities. Order of Phoenix verified safe protocols with real APY divination."
              gradient="bg-gradient-to-br from-cyan-600 to-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 flex items-center justify-center gap-3">
              Wizarding Community
              <Award className="w-8 h-8 text-yellow-400 animate-pulse" />
              <span className={`block ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>Testimonials</span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto`}>
              Hear from wizards and magical communities already protected by our enchantments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Albus Dumbledore"
              role="Grand Wizard"
              avatar="bg-gradient-to-br from-blue-500 to-purple-500"
              quote="Protego AI has revolutionized how we protect our magical treasury. The social intelligence feature detected 3 major rug pulls before they happened!"
              platform="Telegram"
              spellsCast={247}
            />
            <TestimonialCard 
              name="Hermione Granger"
              role="DeFi Researcher"
              avatar="bg-gradient-to-br from-emerald-500 to-teal-500"
              quote="The yield optimization is incredibly intelligent. It automatically moved my funds to safer protocols when risk levels increased. Pure magic!"
              platform="Discord"
              spellsCast={189}
            />
            <TestimonialCard 
              name="Severus Snape"
              role="Potions Master"
              avatar="bg-gradient-to-br from-slate-600 to-slate-800"
              quote="Even I'm impressed by the threat detection accuracy. The AI caught suspicious contracts that even my advanced potions couldn't reveal."
              platform="Twitter"
              spellsCast={156}
            />
            <TestimonialCard 
              name="Luna Lovegood"
              role="Crypto Seer"
              avatar="bg-gradient-to-br from-yellow-500 to-orange-500"
              quote="The social monitoring saved my community from multiple scam campaigns. It's like having a crystal ball for DeFi risks!"
              platform="Telegram"
              spellsCast={134}
            />
            <TestimonialCard 
              name="Sirius Black"
              role="Yield Farmer"
              avatar="bg-gradient-to-br from-gray-700 to-black"
              quote="Auto-staking response system is brilliant. When threats are detected, it immediately suggests safer alternatives. Saved me thousands!"
              platform="Discord"
              spellsCast={198}
            />
            <TestimonialCard 
              name="McGonagall"
              role="Risk Manager"
              avatar="bg-gradient-to-br from-green-600 to-emerald-700"
              quote="The cross-platform integration is seamless. One magical shield protecting all our communication channels and DeFi positions."
              platform="Twitter"
              spellsCast={223}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 flex items-center justify-center gap-3">
              Choose Your
              <Coins className="w-8 h-8 text-yellow-400 animate-bounce" />
              <span className={`block ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Magical Plan</span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto`}>
              From apprentice wizards to grand masters - we have the perfect protection plan for every magical treasury
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className={`${isDark ? 'bg-slate-900/50 border-slate-800/50' : 'bg-white/80 border-slate-200/50'} backdrop-blur-sm border rounded-xl p-8 relative overflow-hidden hover:border-blue-500/30 transition-all duration-300`}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Apprentice Wizard</h3>
                  <div className="text-4xl font-bold text-blue-400 mb-2">Free</div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Perfect for learning basic spells</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Basic threat detection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">1 social platform monitoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Manual yield suggestions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Community spell support</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => castSpell('Enroll Apprentice')}
                  className="w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Wand2 className="w-5 h-5" />
                  Start Learning Magic
                </button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className={`${isDark ? 'bg-slate-900/50 border-emerald-500/50' : 'bg-white/80 border-emerald-300/50'} backdrop-blur-sm border-2 rounded-xl p-8 relative overflow-hidden transform scale-105 shadow-2xl`}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10" />
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Most Popular
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-6 mt-4">
                  <h3 className="text-2xl font-bold text-white mb-2">Master Wizard</h3>
                  <div className="text-4xl font-bold text-emerald-400 mb-1">$29</div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>per month • Advanced magical protection</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Advanced threat detection & analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">All platforms monitoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Auto-staking optimization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Real-time social intelligence</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Auto-defense mechanisms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Priority magical support</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    castSpell('Ascend to Master')
                    onEnterDashboard()
                  }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Cast Master Spells
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className={`${isDark ? 'bg-slate-900/50 border-slate-800/50' : 'bg-white/80 border-slate-200/50'} backdrop-blur-sm border rounded-xl p-8 relative overflow-hidden hover:border-purple-500/30 transition-all duration-300`}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Grand Wizard</h3>
                  <div className="text-4xl font-bold text-purple-400 mb-1">$99</div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>per month • Enterprise magical protection</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Everything in Master +</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Custom spell development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Dedicated magical advisor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Multi-vault management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Advanced analytics portal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">24/7 Order of Phoenix support</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => castSpell('Contact Grand Council')}
                  className="w-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  Contact Grand Council
                </button>
              </div>
            </div>
          </div>

          {/* Additional features note */}
          <div className="text-center mt-12">
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
              All plans include magical ward protection, spell-casting tutorials, and access to the wizarding community forum
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6 flex items-center justify-center gap-4">
            Protect Your Treasures &
            <Wand2 className="w-8 h-8 text-purple-400 animate-bounce" />
            <span className={`block ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Optimize Your Magic</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-12`}>
            Join thousands of wizards and magical communities already protected by Protego AI. 
            Experience the future of intelligent magical DeFi security today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                castSpell('Grand Opening Portal')
                onEnterDashboard()
              }}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Enter the Magical Realm
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => castSpell('Revelio Documentation')}
              className={`px-8 py-4 border ${isDark ? 'border-slate-600 hover:border-blue-400 hover:bg-slate-800/50' : 'border-slate-300 hover:border-blue-500 hover:bg-white/50'} rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2`}
            >
              <Eye className="w-5 h-5" />
              View Spellbook
            </button>
          </div>

          {/* Contact options */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${isDark ? 'bg-slate-900/30 border-slate-800/50' : 'bg-white/60 border-slate-200/50'} backdrop-blur-sm border rounded-xl p-6 text-center hover:border-blue-500/30 transition-all duration-300`}>
              <Mail className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Owl Post</h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Send us a magical message for support
              </p>
            </div>
            <div className={`${isDark ? 'bg-slate-900/30 border-slate-800/50' : 'bg-white/60 border-slate-200/50'} backdrop-blur-sm border rounded-xl p-6 text-center hover:border-emerald-500/30 transition-all duration-300`}>
              <MessageSquare className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Great Hall</h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Join our wizarding community discussions
              </p>
            </div>
            <div className={`${isDark ? 'bg-slate-900/30 border-slate-800/50' : 'bg-white/60 border-slate-200/50'} backdrop-blur-sm border rounded-xl p-6 text-center hover:border-purple-500/30 transition-all duration-300`}>
              <Headphones className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Magical Support</h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                24/7 assistance from certified wizards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 border-t ${isDark ? 'border-slate-800/50 bg-slate-950/50' : 'border-slate-200/50 bg-white/50'} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <Shield className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-ping" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
                Protego AI
              </span>
            </div>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} mb-6 max-w-2xl mx-auto`}>
              The magical AI that protects your digital treasures while optimizing your yields. 
              Built by wizards, for wizards, with love for the entire DeFi community.
            </p>
            <div className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
              © 2025 Protego AI. All magical rights reserved. 
              <span className="inline-flex items-center gap-1 ml-2">
                Made with <Heart className="w-4 h-4 text-red-400 animate-pulse" /> and magic
              </span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes gradient-x {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease-in-out infinite;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

export default CompleteLandingPage;