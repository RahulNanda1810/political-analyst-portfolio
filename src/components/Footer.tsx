import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-primary-200 bg-neutral-cream">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-serif text-xl font-medium text-primary-950"
            >
              Nandakumar K
            </Link>
            <p className="mt-3 text-caption text-primary-600 max-w-xs">
              Political Analyst, Strategic Advisor & Business Consultant specializing in elections,
              policy, and governance.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-caption uppercase tracking-widest text-primary-500 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-caption text-primary-700 hover:text-accent transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-caption text-primary-700 hover:text-accent transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/media"
                  className="text-caption text-primary-700 hover:text-accent transition-colors"
                >
                  Media Appearances
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-caption text-primary-700 hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-caption uppercase tracking-widest text-primary-500 mb-4">
              Contact
            </h4>
            <p className="text-caption text-primary-700">
              For media inquiries, consulting, and speaking engagements:
            </p>
            <a
              href="mailto:contact@nandakumark.com"
              className="block mt-2 text-caption text-accent hover:text-accent-light transition-colors"
            >
              contact@nandakumark.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-caption text-primary-500">
            © {currentYear} Nandakumar K. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-accent transition-colors"
              aria-label="Twitter"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/nandakumar-kathirvel-55613056/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
