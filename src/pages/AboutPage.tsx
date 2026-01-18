import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { useSiteSettings } from '../lib/hooks'
import { placeholderSettings } from '../lib/placeholder-data'

export default function AboutPage() {
  const { data: settings, loading } = useSiteSettings()
  const displaySettings = settings || placeholderSettings

  return (
    <>
      <SEO
        title="About"
        description="Learn about my background, expertise, and analytical approach to political commentary and strategic advisory."
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
              About
            </p>
            <h1 className="font-serif text-display-lg md:text-display-xl text-primary-950 mb-8">
              Background & Expertise
            </h1>
            <p className="font-sans text-body-lg text-primary-600 leading-relaxed">
              A commitment to rigorous, non-partisan analysis that serves the public discourse.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-wide">
        <div className="divider" />
      </div>

      {/* Bio Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <h2 className="font-serif text-heading-xl text-primary-950 mb-8">
                Analytical Philosophy
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="font-sans text-body-lg text-primary-700 leading-relaxed mb-6">
                  {displaySettings.aboutShort}
                </p>
                
                <p className="font-sans text-body text-primary-600 leading-relaxed mb-6">
                  My transition from corporate leadership to full-time political analysis was driven by a conviction that the same rigorous, data-driven approaches that drive business success can illuminate the complexities of democratic processes. With three decades of experience in driving growth, optimizing processes, and helping leadership teams make strategic decisions, I bring a unique perspective to political commentary.
                </p>
                
                <p className="font-sans text-body text-primary-600 leading-relaxed mb-6">
                  As a business consultant, I continue to partner with organizations to identify challenges, design actionable solutions, and deliver measurable results. This dual expertise—understanding both business imperatives and political dynamics—enables me to offer uniquely integrated advisory services to corporations navigating the regulatory and political landscape.
                </p>
                
                <p className="font-sans text-body text-primary-600 leading-relaxed">
                  I'm passionate about solving complex problems, enabling sustainable growth, and building high-performance teams. Through media appearances, strategic consulting, and analytical commentary, I aim to contribute to more nuanced public discourse and better-informed decision-making across both political and business domains.
                </p>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="lg:sticky lg:top-32">
                <h3 className="font-sans text-caption uppercase tracking-widest text-primary-500 mb-6">
                  Areas of Expertise
                </h3>
                <ul className="space-y-4 mb-12">
                  {displaySettings.expertise?.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 font-sans text-body text-primary-800"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="font-sans text-caption uppercase tracking-widest text-primary-500 mb-6">
                  Media Presence
                </h3>
                <p className="font-sans text-body text-primary-600 leading-relaxed">
                  Regular appearances across major news networks, digital platforms, and policy forums. Featured analyst for election coverage, policy debates, and geopolitical commentary.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-wide">
        <div className="divider" />
      </div>

      {/* Credentials */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-serif text-heading-xl text-primary-950 mb-4">
              Experience
            </h2>
            <p className="font-sans text-body text-primary-600 max-w-xl">
              A trajectory built on rigorous analysis, trusted relationships, and consistent quality.
            </p>
          </motion.div>

          <div className="space-y-0">
            {loading ? (
              // Loading skeleton
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-t border-primary-200 pt-8 pb-8">
                    <div className="animate-pulse">
                      <div className="h-5 bg-primary-200 rounded w-48 mb-3" />
                      <div className="h-4 bg-primary-200 rounded w-64 mb-3" />
                      <div className="h-4 bg-primary-200 rounded w-full max-w-md" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              displaySettings.credentials?.map((credential, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-t border-primary-200 pt-8 pb-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                    <div className="md:col-span-3">
                      <p className="font-sans text-caption text-primary-500">
                        {credential.period}
                      </p>
                    </div>
                    <div className="md:col-span-9">
                      <h3 className="font-serif text-subheading text-primary-900 mb-1">
                        {credential.title}
                      </h3>
                      <p className="font-sans text-body font-medium text-accent mb-3">
                        {credential.organization}
                      </p>
                      {credential.description && (
                        <p className="font-sans text-body text-primary-600 leading-relaxed">
                          {credential.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="section-padding bg-primary-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-heading-xl text-primary-950 mb-8">
                Approach to Analysis
              </h2>
              <div className="space-y-6 font-sans text-body text-primary-700 leading-relaxed">
                <p>
                  <strong className="font-medium text-primary-900">Data-Driven:</strong>{' '}
                  Every analysis leverages quantitative methods, historical patterns, and verified information. Drawing from my technology background, I bring structured analytical frameworks to political commentary.
                </p>
                <p>
                  <strong className="font-medium text-primary-900">Non-Partisan:</strong>{' '}
                  Committed to examining all political actors and positions with the same rigorous standard. No ideological agenda shapes the analysis—only evidence and logic.
                </p>
                <p>
                  <strong className="font-medium text-primary-900">Interdisciplinary:</strong>{' '}
                  Political events intersect with economics, technology, and social dynamics. My diverse background enables integrated analysis that connects these domains meaningfully.
                </p>
                <p>
                  <strong className="font-medium text-primary-900">Actionable:</strong>{' '}
                  Whether for media audiences or consulting clients, insights are delivered with clarity and practical applicability. Understanding without action is incomplete.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
