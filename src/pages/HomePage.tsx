import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { useSiteSettings } from '../lib/hooks'
import { useYouTubeRecentVideos } from '../lib/youtube-hooks'
import { placeholderSettings } from '../lib/placeholder-data'
import { roleLabels } from '../lib/types'

export default function HomePage() {
  const { data: appearances, loading: appearancesLoading } = useYouTubeRecentVideos()
  const { data: settings, loading: settingsLoading } = useSiteSettings()

  // Use fetched data (already has fallback built in)
  const displayAppearances = appearances
  const displaySettings = settings || placeholderSettings

  return (
    <>
      <SEO />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-24 pb-20">
        <div className="container-wide">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Small Label */}
              <p className="font-sans text-caption uppercase tracking-[0.2em] text-primary-500 mb-6">
                Political Analysis & Strategic Advisory
              </p>

              {/* Name */}
              <h1 className="font-serif text-display-lg md:text-display-xl text-primary-950 mb-8">
                {settingsLoading ? 'Nandakumar K' : displaySettings.name}
              </h1>

              {/* Title */}
              <p className="font-serif text-heading-xl md:text-display text-primary-700 mb-8">
                {displaySettings.title}
              </p>

              {/* Tagline */}
              <p className="font-sans text-body-lg text-primary-600 max-w-content mb-12 leading-relaxed">
                {displaySettings.tagline}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/media" className="btn-primary">
                  View Analysis
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Contact
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-wide">
        <div className="divider" />
      </div>

      {/* About Preview */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-heading-xl text-primary-950 mb-6">
                Analytical Expertise
              </h2>
              <p className="font-sans text-body-lg text-primary-600 leading-relaxed mb-8">
                {displaySettings.aboutShort}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-sans text-body font-medium text-accent hover:text-accent-light transition-colors"
              >
                Learn more about my work
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-sans text-caption uppercase tracking-widest text-primary-500 mb-6">
                Areas of Focus
              </h3>
              <ul className="space-y-4">
                {displaySettings.expertise?.slice(0, 6).map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 font-sans text-body text-primary-800"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-wide">
        <div className="divider" />
      </div>

      {/* Recent Appearances Preview */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <h2 className="font-serif text-heading-xl text-primary-950 mb-4">
                Recent Appearances
              </h2>
              <p className="font-sans text-body text-primary-600 max-w-lg">
                Analysis and commentary across leading media platforms.
              </p>
            </div>
            <Link
              to="/media"
              className="inline-flex items-center gap-2 font-sans text-body font-medium text-accent hover:text-accent-light transition-colors whitespace-nowrap"
            >
              View all appearances
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Appearances List */}
          <div className="space-y-0">
            {appearancesLoading ? (
              // Loading skeleton
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-t border-primary-200 pt-8">
                    <div className="animate-pulse">
                      <div className="h-4 bg-primary-200 rounded w-32 mb-4" />
                      <div className="h-6 bg-primary-200 rounded w-3/4 mb-3" />
                      <div className="h-4 bg-primary-200 rounded w-48" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              displayAppearances.map((appearance, index) => (
                <motion.article
                  key={appearance._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-t border-primary-200 pt-8 pb-8 group"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="flex-shrink-0 md:w-32">
                      <time className="font-sans text-caption text-primary-500">
                        {new Date(appearance.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                    <div className="flex-1">
                      <a
                        href={`https://youtube.com/watch?v=${appearance.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <h3 className="font-serif text-subheading text-primary-900 mb-2 group-hover:text-accent transition-colors">
                          {appearance.title}
                        </h3>
                      </a>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-primary-600">
                        <span>{appearance.channelName}</span>
                        <span className="w-1 h-1 rounded-full bg-primary-400" />
                        <span>{roleLabels[appearance.role]}</span>
                        <span className="w-1 h-1 rounded-full bg-primary-400" />
                        <span>{appearance.topic}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-accent">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-heading-xl md:text-display text-white mb-6">
              Available for Consultation
            </h2>
            <p className="font-sans text-body-lg text-white/80 max-w-xl mx-auto mb-10">
              For media appearances, strategic advisory, and institutional consulting engagements.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-accent font-sans font-medium text-body tracking-wide transition-all duration-300 hover:bg-primary-100"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
