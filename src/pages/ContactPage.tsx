import { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { useSiteSettings } from '../lib/hooks'
import { placeholderSettings } from '../lib/placeholder-data'

export default function ContactPage() {
  const { data: settings } = useSiteSettings()
  const displaySettings = settings || placeholderSettings

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    // In production, this would send to a backend API or form service
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({
      name: '',
      email: '',
      organization: '',
      subject: '',
      message: '',
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch for media appearances, consulting, and strategic advisory engagements."
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
              Contact
            </p>
            <h1 className="font-serif text-display-lg md:text-display-xl text-primary-950 mb-8">
              Get in Touch
            </h1>
            <p className="font-sans text-body-lg text-primary-600 leading-relaxed">
              Available for media appearances, consulting, and strategic advisory engagements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-wide">
        <div className="divider" />
      </div>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4"
            >
              <h2 className="font-serif text-heading text-primary-950 mb-8">
                Professional Inquiries
              </h2>

              <div className="space-y-8">
                {/* Email */}
                <div>
                  <h3 className="font-sans text-caption uppercase tracking-widest text-primary-500 mb-3">
                    Email
                  </h3>
                  <a
                    href={`mailto:${displaySettings.email}`}
                    className="font-sans text-body-lg text-accent hover:text-accent-light transition-colors"
                  >
                    {displaySettings.email}
                  </a>
                </div>

                {/* Services */}
                <div>
                  <h3 className="font-sans text-caption uppercase tracking-widest text-primary-500 mb-3">
                    Services
                  </h3>
                  <ul className="space-y-2">
                    <li className="font-sans text-body text-primary-700">
                      Media Appearances & Commentary
                    </li>
                    <li className="font-sans text-body text-primary-700">
                      Political Strategy & Campaign Advisory
                    </li>
                    <li className="font-sans text-body text-primary-700">
                      Business & Corporate Consulting
                    </li>
                    <li className="font-sans text-body text-primary-700">
                      Policy Analysis & Research
                    </li>
                    <li className="font-sans text-body text-primary-700">
                      Speaking Engagements & Workshops
                    </li>
                    <li className="font-sans text-body text-primary-700">
                      Regulatory & Government Affairs Advisory
                    </li>
                  </ul>
                </div>

                {/* Social */}
                <div>
                  <h3 className="font-sans text-caption uppercase tracking-widest text-primary-500 mb-3">
                    Connect
                  </h3>
                  <div className="flex gap-4">
                    {displaySettings.socialLinks?.twitter && (
                      <a
                        href={displaySettings.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-primary-100 text-primary-700 hover:bg-accent hover:text-white transition-colors"
                        aria-label="Twitter"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                    {displaySettings.socialLinks?.linkedin && (
                      <a
                        href={displaySettings.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-primary-100 text-primary-700 hover:bg-accent hover:text-white transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Response Time */}
                <div className="pt-4 border-t border-primary-200">
                  <p className="font-sans text-caption text-primary-500">
                    Typical response time: 24-48 hours for professional inquiries.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-8"
            >
              <div className="bg-primary-50 p-8 md:p-12">
                <h2 className="font-serif text-heading text-primary-950 mb-8">
                  Send a Message
                </h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="font-serif text-subheading text-primary-950 mb-3">
                      Message Sent
                    </h3>
                    <p className="font-sans text-body text-primary-600 mb-6">
                      Thank you for reaching out. I will respond within 24-48 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="font-sans text-body text-accent hover:text-accent-light transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-sans text-caption uppercase tracking-widest text-primary-600 mb-2"
                        >
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-primary-200 font-sans text-body text-primary-900 focus:outline-none focus:border-accent transition-colors"
                          placeholder="Your name"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block font-sans text-caption uppercase tracking-widest text-primary-600 mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-primary-200 font-sans text-body text-primary-900 focus:outline-none focus:border-accent transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Organization */}
                    <div>
                      <label
                        htmlFor="organization"
                        className="block font-sans text-caption uppercase tracking-widest text-primary-600 mb-2"
                      >
                        Organization
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formState.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-primary-200 font-sans text-body text-primary-900 focus:outline-none focus:border-accent transition-colors"
                        placeholder="Your organization (optional)"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block font-sans text-caption uppercase tracking-widest text-primary-600 mb-2"
                      >
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-primary-200 font-sans text-body text-primary-900 focus:outline-none focus:border-accent transition-colors"
                      >
                        <option value="">Select inquiry type</option>
                        <option value="media">Media Appearance</option>
                        <option value="consulting">Consulting & Advisory</option>
                        <option value="speaking">Speaking Engagement</option>
                        <option value="research">Research Collaboration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block font-sans text-caption uppercase tracking-widest text-primary-600 mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-primary-200 font-sans text-body text-primary-900 focus:outline-none focus:border-accent transition-colors resize-none"
                        placeholder="Please provide details about your inquiry..."
                      />
                    </div>

                    {/* Submit */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="w-5 h-5 animate-spin"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section className="pb-20">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-sans text-caption text-primary-500">
              For urgent media inquiries during election coverage or breaking news events, 
              please mention "URGENT" in the subject line for priority response.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
