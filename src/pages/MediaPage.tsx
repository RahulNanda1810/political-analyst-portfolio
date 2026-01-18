import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import { useYouTubeVideos } from '../lib/youtube-hooks'
import { roleLabels } from '../lib/types'
import type { Appearance } from '../lib/types'

// Video Modal Component
function VideoModal({
  appearance,
  onClose,
}: {
  appearance: Appearance
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-950/90"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-5xl bg-primary-950 rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Close video"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Embed */}
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${appearance.youtubeId}?autoplay=1&rel=0`}
            title={appearance.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="font-serif text-subheading text-white mb-2">
            {appearance.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-white/60">
            <span>{appearance.channelName}</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>{roleLabels[appearance.role]}</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>{appearance.topic}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Appearance Card Component
function AppearanceCard({
  appearance,
  onClick,
  index,
}: {
  appearance: Appearance
  onClick: () => void
  index: number
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-primary-200 mb-4 overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${appearance.youtubeId}/maxresdefault.jpg`}
          alt={appearance.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Fallback to default quality if maxresdefault doesn't exist
            const target = e.target as HTMLImageElement
            if (target.src.includes('maxresdefault')) {
              target.src = `https://img.youtube.com/vi/${appearance.youtubeId}/hqdefault.jpg`
            }
          }}
        />
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary-950/0 group-hover:bg-primary-950/30 transition-colors duration-300">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-90">
            <svg className="w-6 h-6 text-primary-950 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-sans text-caption text-accent font-medium">
            {roleLabels[appearance.role]}
          </span>
          <span className="w-1 h-1 rounded-full bg-primary-400" />
          <time className="font-sans text-caption text-primary-500">
            {new Date(appearance.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </div>
        <h3 className="font-serif text-subheading text-primary-900 mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {appearance.title}
        </h3>
        <div className="flex items-center gap-2 text-caption text-primary-600">
          <span>{appearance.channelName}</span>
          <span className="w-1 h-1 rounded-full bg-primary-400" />
          <span>{appearance.topic}</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function MediaPage() {
  const { data: appearances, loading, lastFetched } = useYouTubeVideos()
  const [selectedAppearance, setSelectedAppearance] = useState<Appearance | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')

  // Use the fetched data directly (already has fallback built in)
  const displayAppearances = appearances

  // Get unique topics and roles for filtering
  const filters = useMemo(() => {
    const topics = new Set<string>()
    displayAppearances.forEach((a) => topics.add(a.topic))
    return ['all', ...Array.from(topics)]
  }, [displayAppearances])

  // Filter appearances
  const filteredAppearances = useMemo(() => {
    if (activeFilter === 'all') return displayAppearances
    return displayAppearances.filter((a) => a.topic === activeFilter)
  }, [displayAppearances, activeFilter])

  return (
    <>
      <SEO
        title="Media Appearances"
        description="Watch political analysis, commentary, and discussions across leading media platforms and news channels."
      />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="font-sans text-caption uppercase tracking-[0.2em] text-primary-500 mb-6">
              Media & Appearances
            </p>
            <h1 className="font-serif text-display-lg md:text-display-xl text-primary-950 mb-8">
              Analysis & Commentary
            </h1>
            <p className="font-sans text-body-lg text-primary-600 leading-relaxed">
              Featured appearances across news networks, digital platforms, and policy forums. 
              Select any video to watch the full discussion.
            </p>
            
            {/* Auto-sync indicator */}
            <div className="mt-6 flex items-center gap-2 text-caption text-primary-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>
                {loading ? 'Syncing with YouTube...' : 'Auto-synced with YouTube'}
                {lastFetched && !loading && (
                  <span className="ml-2 text-primary-400">
                    • Last updated {new Date(lastFetched).toLocaleTimeString()}
                  </span>
                )}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-wide">
        <div className="divider" />
      </div>

      {/* Filter Bar */}
      <section className="py-8">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 font-sans text-caption uppercase tracking-wider transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-accent text-white'
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                }`}
              >
                {filter === 'all' ? 'All Topics' : filter}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="section-padding pt-8">
        <div className="container-wide">
          {loading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-primary-200 mb-4" />
                  <div className="h-3 bg-primary-200 rounded w-24 mb-3" />
                  <div className="h-5 bg-primary-200 rounded w-full mb-2" />
                  <div className="h-5 bg-primary-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-primary-200 rounded w-48" />
                </div>
              ))}
            </div>
          ) : filteredAppearances.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-sans text-body text-primary-600">
                No appearances found for this filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredAppearances.map((appearance, index) => (
                <AppearanceCard
                  key={appearance._id}
                  appearance={appearance}
                  onClick={() => setSelectedAppearance(appearance)}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary-50">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="font-serif text-display text-accent mb-2">
                {displayAppearances.length}+
              </p>
              <p className="font-sans text-caption uppercase tracking-widest text-primary-600">
                Media Appearances
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <p className="font-serif text-display text-accent mb-2">
                {new Set(displayAppearances.map((a) => a.channelName)).size}+
              </p>
              <p className="font-sans text-caption uppercase tracking-widest text-primary-600">
                Media Platforms
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <p className="font-serif text-display text-accent mb-2">10+</p>
              <p className="font-sans text-caption uppercase tracking-widest text-primary-600">
                Years Experience
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <p className="font-serif text-display text-accent mb-2">
                {filters.length - 1}
              </p>
              <p className="font-sans text-caption uppercase tracking-widest text-primary-600">
                Topic Areas
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedAppearance && (
          <VideoModal
            appearance={selectedAppearance}
            onClose={() => setSelectedAppearance(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
