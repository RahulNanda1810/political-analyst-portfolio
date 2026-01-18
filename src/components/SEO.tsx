import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

const defaultMeta = {
  title: 'Nandakumar K - Political Analyst & Strategic Advisor',
  description:
    'Expert political analysis on elections, policy, governance, and geopolitics. Available for media appearances, consulting, and strategic advisory.',
  image: '/og-image.jpg',
  url: 'https://nandakumark.com',
}

export default function SEO({
  title,
  description = defaultMeta.description,
  image = defaultMeta.image,
  url = defaultMeta.url,
  type = 'website',
}: SEOProps) {
  const fullTitle = title
    ? `${title} | Nandakumar K`
    : defaultMeta.title

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
