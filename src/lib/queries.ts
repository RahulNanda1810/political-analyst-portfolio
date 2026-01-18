// GROQ Queries for fetching data from Sanity CMS

// Fetch all published appearances, ordered by date
export const appearancesQuery = `
  *[_type == "appearance" && isPublished == true] | order(publishedAt desc) {
    _id,
    title,
    youtubeId,
    channelName,
    channelUrl,
    role,
    topic,
    description,
    publishedAt,
    featured
  }
`

// Fetch featured appearances only
export const featuredAppearancesQuery = `
  *[_type == "appearance" && isPublished == true && featured == true] | order(publishedAt desc)[0...6] {
    _id,
    title,
    youtubeId,
    channelName,
    channelUrl,
    role,
    topic,
    publishedAt
  }
`

// Fetch recent appearances (limited)
export const recentAppearancesQuery = `
  *[_type == "appearance" && isPublished == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    youtubeId,
    channelName,
    role,
    topic,
    publishedAt
  }
`

// Fetch site settings
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    name,
    title,
    tagline,
    email,
    aboutShort,
    aboutFull,
    expertise,
    credentials,
    socialLinks
  }
`
