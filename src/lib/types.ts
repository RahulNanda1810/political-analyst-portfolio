// Type definitions for CMS data

export interface Appearance {
  _id: string
  title: string
  youtubeId: string
  channelName: string
  channelUrl?: string
  role: 'guest-analyst' | 'panelist' | 'speaker' | 'interview' | 'debate' | 'commentary'
  topic: string
  description?: string
  publishedAt: string
  featured?: boolean
}

export interface Credential {
  title: string
  organization: string
  period: string
  description?: string
}

export interface SocialLinks {
  twitter?: string
  linkedin?: string
}

export interface SiteSettings {
  name: string
  title: string
  tagline?: string
  email?: string
  aboutShort?: string
  aboutFull?: unknown[] // Portable Text blocks
  expertise?: string[]
  credentials?: Credential[]
  socialLinks?: SocialLinks
}

// Role display labels
export const roleLabels: Record<Appearance['role'], string> = {
  'guest-analyst': 'Guest Analyst',
  'panelist': 'Panelist',
  'speaker': 'Speaker',
  'interview': 'Interview',
  'debate': 'Debate Participant',
  'commentary': 'Expert Commentary',
}
