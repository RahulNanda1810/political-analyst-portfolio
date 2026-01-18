import { createClient } from '@sanity/client'

// Sanity client configuration
// These values should be set via environment variables
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Use CDN for faster reads (public, read-only)
  apiVersion: '2024-01-01', // Use a specific API version
})

// No token is included - this client is READ-ONLY
// The public site cannot write or modify any data
// All CMS operations happen through the separate Sanity Studio

// Check if Sanity is properly configured with real credentials
export const isSanityConfigured = (): boolean => {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
  return !!(projectId && projectId !== 'your-project-id' && projectId.length > 0)
}
