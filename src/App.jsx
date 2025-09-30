import { useState, useEffect } from 'react'
import { Sunrise, Heart, Sparkles, BookOpen, Sun, Moon, Flower2, PlayCircle, ExternalLink } from 'lucide-react'
import { getTodayContent } from './data/vedantaContent'
import { getRecommendedVideosByHandles, resolveChannelIdByHandle, getPlaylistsByChannel } from './services/youtube'

function App() {
  const [content, setContent] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('wisdom')
  const [embedUrl, setEmbedUrl] = useState('')
  const [ytVideos, setYtVideos] = useState([])
  const [ytLoading, setYtLoading] = useState(false)
  const [ytError, setYtError] = useState('')
  const [nyPlaylists, setNyPlaylists] = useState([])
  const [stPlaylists, setStPlaylists] = useState([])
  const [embedPlaylistId, setEmbedPlaylistId] = useState('')
  const hasYtKey = Boolean(import.meta.env.VITE_YT_API_KEY)

  // Known channel IDs for fallback embeds (uploads playlist = 'UU' + channelId.slice(2))
  const VEDANTA_NY_CHANNEL_ID = 'UCZOKv_xnTzyLD9RJmbBUV9Q'
  const SWAMIT_CHANNEL_ID = 'UC7i47784NqiOl244eGEJDew'
  const uploadsId = (channelId) => (channelId?.startsWith('UC') ? 'UU' + channelId.slice(2) : '')

  const extractVideoId = (url) => {
    // Supports youtu.be/<id>, youtube.com/watch?v=<id>, youtube.com/embed/<id>
    try {
      const u = new URL(url)
      if (u.hostname === 'youtu.be') return u.pathname.slice(1)
      if (u.searchParams.get('v')) return u.searchParams.get('v')
      const parts = u.pathname.split('/')
      const embedIndex = parts.findIndex(p => p === 'embed')
      if (embedIndex !== -1 && parts[embedIndex + 1]) return parts[embedIndex + 1]
      return ''
    } catch {
      return ''
    }
  }

  useEffect(() => {
    setContent(getTodayContent())
  }, [])

  // Load YouTube recommendations when the tab is opened
  useEffect(() => {
    const load = async () => {
      if (activeTab !== 'videos' || ytVideos.length || ytLoading || !hasYtKey) return
      setYtLoading(true)
      setYtError('')
      try {
        const vids = await getRecommendedVideosByHandles(['@VedantaNY', '@SwamiT'], 8)
        setYtVideos(vids)
      } catch (e) {
        setYtError(e?.message || 'Failed to load recommendations')
      } finally {
        setYtLoading(false)
      }
    }
    load()
  }, [activeTab, ytVideos.length, ytLoading, hasYtKey])

  // Load all playlists for both channels (requires API key)
  useEffect(() => {
    if (activeTab !== 'videos' || !hasYtKey) return
    const loadPlaylists = async () => {
      try {
        if (!nyPlaylists.length || !stPlaylists.length) {
          const [nyId, stId] = await Promise.all([
            resolveChannelIdByHandle('@VedantaNY'),
            resolveChannelIdByHandle('@SwamiT'),
          ])
          const [ny, st] = await Promise.all([
            getPlaylistsByChannel(nyId),
            getPlaylistsByChannel(stId),
          ])
          setNyPlaylists(ny)
          setStPlaylists(st)
        }
      } catch (e) {
        // Reuse ytError banner area
        setYtError(e?.message || 'Failed to load playlists')
      }
    }
    loadPlaylists()
  }, [activeTab, hasYtKey, nyPlaylists.length, stPlaylists.length])

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-vedic-orange text-2xl">ॐ</div>
      </div>
    )
  }

  const tabs = [
    { id: 'wisdom', label: 'Daily Wisdom', icon: Sparkles },
    { id: 'mantra', label: 'Mantra', icon: Flower2 },
    { id: 'practice', label: 'Practice', icon: Heart },
    { id: 'teaching', label: 'Teaching', icon: BookOpen },
    { id: 'videos', label: 'Recommendations', icon: PlayCircle }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50'}`}>
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-vedic-orange/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-vedic-saffron/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="text-4xl animate-float">🪷</div>
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Daily Vedanta
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Wisdom from Advaita Philosophy
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-full transition-all ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-indigo-900 text-white'} hover:scale-110`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Date Banner */}
          <div className="text-center mb-8 animate-fadeIn">
            <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full ${isDarkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'glass-effect'}`}>
              <Sunrise className="text-vedic-orange" size={20} />
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? isDarkMode
                        ? 'bg-gradient-to-r from-vedic-orange to-vedic-saffron text-white shadow-lg scale-105'
                        : 'bg-gradient-to-r from-vedic-orange to-vedic-saffron text-white shadow-lg scale-105'
                      : isDarkMode
                        ? 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
                        : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Content Cards */}
          <div className="space-y-6">
            {/* Daily Wisdom Card */}
            {activeTab === 'wisdom' && (
              <div className={`p-8 rounded-2xl animate-fadeIn ${isDarkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'glass-effect'}`}>
                <div className="flex items-center space-x-3 mb-6">
                  <Sparkles className="text-vedic-orange" size={28} />
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Today's Wisdom
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div className={`text-xl leading-relaxed italic ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    "{content.wisdom.text}"
                  </div>
                  
                  {content.wisdom.sanskrit && (
                    <div className={`text-center py-4 px-6 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gradient-to-r from-orange-100 to-amber-100'}`}>
                      <div className={`text-2xl font-sanskrit mb-2 ${isDarkMode ? 'text-vedic-gold' : 'text-vedic-orange'}`}>
                        {content.wisdom.sanskrit}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Sanskrit Text
                      </div>
                    </div>
                  )}
                  
                  <div className={`flex items-center justify-between pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                    <div>
                      <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        — {content.wisdom.author}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {content.wisdom.context}
                      </div>
                    </div>
                    <Flower2 className="text-vedic-orange opacity-50" size={32} />
                  </div>
                </div>

                {/* All Playlists */}
                <div className="mt-10 space-y-8">
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>All Playlists</h3>

                  {/* API-based listing */}
                  {hasYtKey ? (
                    <>
                      {/* VedantaNY Playlists */}
                      <div>
                        <div className={`mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Vedanta Society of New York</div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                          {nyPlaylists.map(p => (
                            <button
                              key={p.id}
                              onClick={() => { setEmbedPlaylistId(p.id); setEmbedUrl('') }}
                              className={`text-left rounded-xl overflow-hidden border transition hover:shadow-lg ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white'}`}
                            >
                              <div className="aspect-video w-full overflow-hidden">
                                <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="p-3">
                                <div className={`font-medium line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{p.title}</div>
                                <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{p.count} videos</div>
                              </div>
                            </button>
                          ))}
                          {!nyPlaylists.length && (
                            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No playlists found.</div>
                          )}
                        </div>
                      </div>

                      {/* SwamiT Playlists */}
                      <div>
                        <div className={`mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Swami Tadatmananda</div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                          {stPlaylists.map(p => (
                            <button
                              key={p.id}
                              onClick={() => { setEmbedPlaylistId(p.id); setEmbedUrl('') }}
                              className={`text-left rounded-xl overflow-hidden border transition hover:shadow-lg ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white'}`}
                            >
                              <div className="aspect-video w-full overflow-hidden">
                                <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="p-3">
                                <div className={`font-medium line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{p.title}</div>
                                <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{p.count} videos</div>
                              </div>
                            </button>
                          ))}
                          {!stPlaylists.length && (
                            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No playlists found.</div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    // Fallback without API key: embed the Uploads playlists for both channels
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className={`mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Uploads — Vedanta Society of New York</div>
                        <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10">
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube-nocookie.com/embed/videoseries?list=${uploadsId(VEDANTA_NY_CHANNEL_ID)}`}
                            title="VedantaNY uploads"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                      </div>
                      <div>
                        <div className={`mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Uploads — Swami Tadatmananda</div>
                        <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10">
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube-nocookie.com/embed/videoseries?list=${uploadsId(SWAMIT_CHANNEL_ID)}`}
                            title="Swami T uploads"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mantra Card */}
            {activeTab === 'mantra' && (
              <div className={`p-8 rounded-2xl animate-fadeIn ${isDarkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'glass-effect'}`}>
                <div className="flex items-center space-x-3 mb-6">
                  <Flower2 className="text-vedic-orange" size={28} />
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Today's Mantra
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div className={`text-center py-8 px-6 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-purple-900/40 to-indigo-900/40' : 'bg-gradient-to-br from-orange-100 to-amber-100'}`}>
                    <div className={`text-5xl font-sanskrit mb-4 ${isDarkMode ? 'text-vedic-gold' : 'text-vedic-orange'}`}>
                      {content.mantra.sanskrit}
                    </div>
                    <div className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {content.mantra.transliteration}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Meaning:
                    </h3>
                    <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {content.mantra.meaning}
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-teal-50'}`}>
                    <h3 className={`font-semibold mb-2 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      <Heart className="mr-2 text-vedic-orange" size={18} />
                      Benefit:
                    </h3>
                    <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {content.mantra.benefit}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Practice Card */}
            {activeTab === 'practice' && (
              <div className={`p-8 rounded-2xl animate-fadeIn ${isDarkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'glass-effect'}`}>
                <div className="flex items-center space-x-3 mb-6">
                  <Heart className="text-vedic-orange" size={28} />
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Today's Practice
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-vedic-gold' : 'text-vedic-orange'}`}>
                      {content.practice.title}
                    </h3>
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${isDarkMode ? 'bg-white/10 text-gray-200' : 'bg-orange-100 text-orange-800'}`}>
                      Duration: {content.practice.duration}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      How to Practice:
                    </h4>
                    <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {content.practice.description}
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gradient-to-r from-green-900/30 to-teal-900/30' : 'bg-gradient-to-r from-green-50 to-teal-50'}`}>
                    <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Benefit:
                    </h4>
                    <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {content.practice.benefit}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Teaching Card */}
            {activeTab === 'teaching' && (
              <div className={`p-8 rounded-2xl animate-fadeIn ${isDarkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'glass-effect'}`}>
                <div className="flex items-center space-x-3 mb-6">
                  <BookOpen className="text-vedic-orange" size={28} />
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Today's Teaching
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-vedic-gold' : 'text-vedic-orange'}`}>
                      {content.teaching.title}
                    </h3>
                    <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {content.teaching.content}
                    </p>
                  </div>
                  
                  <div className={`p-5 rounded-xl border-l-4 border-vedic-orange ${isDarkMode ? 'bg-white/5' : 'bg-amber-50'}`}>
                    <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      💡 Apply This Today:
                    </h4>
                    <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {content.teaching.practice}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations / Videos Card */}
            {activeTab === 'videos' && (
              <div className={`p-8 rounded-2xl animate-fadeIn ${isDarkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'glass-effect'}`}>
                <div className="flex items-center space-x-3 mb-6">
                  <PlayCircle className="text-vedic-orange" size={28} />
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Recommendations
                  </h2>
                </div>

                {/* Latest Videos (always embedded on the page) */}
                <div className="mb-8">
                  <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Latest videos</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className={`mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Vedanta Society of New York</div>
                      <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${uploadsId(VEDANTA_NY_CHANNEL_ID)}`}
                          title="VedantaNY uploads"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                    <div>
                      <div className={`mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Swami Tadatmananda</div>
                      <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${uploadsId(SWAMIT_CHANNEL_ID)}`}
                          title="Swami T uploads"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Channel Links */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className={`${isDarkMode ? 'bg-white/5' : 'bg-white/70'} rounded-xl p-5 border ${isDarkMode ? 'border-white/10' : 'border-white/50'} transition` }>
                    <div className="flex items-center mb-3">
                      <div className="text-3xl mr-3">🕉️</div>
                      <div>
                        <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Vedanta Society of New York</h3>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>Talks, lectures, and guided wisdom grounded in traditional Advaita Vedanta.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <a href="https://www.youtube.com/@VedantaNY" target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2 rounded-lg bg-vedic-orange text-white hover:opacity-90">
                        Visit Channel <ExternalLink size={16} className="ml-2" />
                      </a>
                      <a href="https://www.youtube.com/@VedantaNY/videos" target="_blank" rel="noreferrer" className={`${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-800'} inline-flex items-center px-4 py-2 rounded-lg hover:opacity-90`}>
                        All Videos <ExternalLink size={16} className="ml-2" />
                      </a>
                      <a href="https://www.youtube.com/@VedantaNY/playlists" target="_blank" rel="noreferrer" className={`${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-800'} inline-flex items-center px-4 py-2 rounded-lg hover:opacity-90`}>
                        Playlists <ExternalLink size={16} className="ml-2" />
                      </a>
                    </div>
                  </div>

                  <div className={`${isDarkMode ? 'bg-white/5' : 'bg-white/70'} rounded-xl p-5 border ${isDarkMode ? 'border-white/10' : 'border-white/50'} transition` }>
                    <div className="flex items-center mb-3">
                      <div className="text-3xl mr-3">🪷</div>
                      <div>
                        <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Swami Tadatmananda</h3>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>Clear, modern explanations of Vedanta, Upanishads, and the Gita.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <a href="https://www.youtube.com/@SwamiT" target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2 rounded-lg bg-vedic-orange text-white hover:opacity-90">
                        Visit Channel <ExternalLink size={16} className="ml-2" />
                      </a>
                      <a href="https://www.youtube.com/@SwamiT/videos" target="_blank" rel="noreferrer" className={`${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-800'} inline-flex items-center px-4 py-2 rounded-lg hover:opacity-90`}>
                        All Videos <ExternalLink size={16} className="ml-2" />
                      </a>
                      <a href="https://www.youtube.com/@SwamiT/playlists" target="_blank" rel="noreferrer" className={`${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-800'} inline-flex items-center px-4 py-2 rounded-lg hover:opacity-90`}>
                        Playlists <ExternalLink size={16} className="ml-2" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Optional Embed (single video or playlist) */}
                <div className={`${isDarkMode ? 'bg-white/5' : 'bg-white/70'} rounded-xl p-5 border ${isDarkMode ? 'border-white/10' : 'border-white/50'}`}>
                  <h3 className={`font-semibold mb-3 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    <PlayCircle size={18} className="mr-2 text-vedic-orange" />
                    Embed a YouTube video (paste URL) or click a playlist below
                  </h3>
                  <div className="flex flex-col md:flex-row gap-3">
                    <input
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={embedUrl}
                      onChange={(e) => setEmbedUrl(e.target.value)}
                      className={`flex-1 px-4 py-3 rounded-lg outline-none ${isDarkMode ? 'bg-white/10 text-white placeholder-gray-400' : 'bg-white text-gray-800 placeholder-gray-500'} border ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}
                    />
                    <button
                      onClick={() => {
                        try {
                          localStorage.removeItem(`yt_recs_${new Date().toISOString().slice(0,10)}`)
                        } catch {}
                        setYtVideos([])
                        setYtLoading(false)
                        setYtError('')
                        setEmbedPlaylistId('')
                      }}
                      className={`px-4 py-3 rounded-lg font-medium ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-800'} hover:opacity-90`}
                    >
                      Refresh Picks
                    </button>
                  </div>
                  {extractVideoId(embedUrl) && (
                    <div className="mt-5 aspect-video w-full overflow-hidden rounded-xl border border-black/10">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${extractVideoId(embedUrl)}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  )}
                  {embedPlaylistId && !extractVideoId(embedUrl) && (
                    <div className="mt-5 aspect-video w-full overflow-hidden rounded-xl border border-black/10">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/videoseries?list=${embedPlaylistId}`}
                        title="YouTube playlist player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  )}
                  {!extractVideoId(embedUrl) && (
                    <p className={`mt-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Paste any YouTube video URL or click a playlist card below to embed it here.
                    </p>
                  )}
                </div>

                {/* Popular Picks Grid (only when API key is present) */}
                {hasYtKey && (
                  <div className="mt-8">
                  <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Popular picks today</h3>
                  {ytLoading && (
                    <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading videos…</div>
                  )}
                  {ytError && (
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-900/30 text-red-200' : 'bg-red-50 text-red-700'}`}>
                      {ytError} — add VITE_YT_API_KEY to .env and restart the dev server.
                    </div>
                  )}
                  {!ytLoading && !ytError && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {ytVideos.map(v => (
                        <button
                          key={v.id}
                          onClick={() => setEmbedUrl(v.url)}
                          className={`text-left rounded-xl overflow-hidden border transition hover:shadow-lg ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white'}`}
                        >
                          <div className="aspect-video w-full overflow-hidden">
                            <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-3">
                            <div className={`font-medium line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{v.title}</div>
                            <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{v.channelTitle}</div>
                          </div>
                        </button>
                      ))}
                      {!ytVideos.length && (
                        <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No videos yet. Try Refresh Picks.</div>
                      )}
                    </div>
                  )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Quote */}
          <div className="mt-12 text-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className={`text-3xl mb-3 ${isDarkMode ? 'text-vedic-gold' : 'text-vedic-orange'}`}>
              ॐ
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              "The Self is the same in all beings" — Bhagavad Gita
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
