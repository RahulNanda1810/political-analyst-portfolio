import { useState, useEffect } from 'react'
import { client, isSanityConfigured } from './sanity'
import {
  appearancesQuery,
  featuredAppearancesQuery,
  recentAppearancesQuery,
  siteSettingsQuery,
} from './queries'
import { placeholderAppearances, placeholderSettings } from './placeholder-data'
import type { Appearance, SiteSettings } from './types'

// Custom hook for fetching all appearances
export function useAppearances() {
  const [data, setData] = useState<Appearance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      // If Sanity is not configured, use placeholder data
      if (!isSanityConfigured()) {
        setData(placeholderAppearances)
        setLoading(false)
        return
      }

      try {
        const result = await client.fetch<Appearance[]>(appearancesQuery)
        // If CMS returns empty, fall back to placeholder
        setData(result && result.length > 0 ? result : placeholderAppearances)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch'))
        setData(placeholderAppearances) // Fallback on error
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, loading, error }
}

// Custom hook for fetching featured appearances
export function useFeaturedAppearances() {
  const [data, setData] = useState<Appearance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (!isSanityConfigured()) {
        setData(placeholderAppearances.filter(a => a.featured).slice(0, 6))
        setLoading(false)
        return
      }

      try {
        const result = await client.fetch<Appearance[]>(featuredAppearancesQuery)
        setData(result && result.length > 0 ? result : placeholderAppearances.filter(a => a.featured).slice(0, 6))
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch'))
        setData(placeholderAppearances.filter(a => a.featured).slice(0, 6))
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, loading, error }
}

// Custom hook for fetching recent appearances
export function useRecentAppearances() {
  const [data, setData] = useState<Appearance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (!isSanityConfigured()) {
        setData(placeholderAppearances.slice(0, 3))
        setLoading(false)
        return
      }

      try {
        const result = await client.fetch<Appearance[]>(recentAppearancesQuery)
        setData(result && result.length > 0 ? result : placeholderAppearances.slice(0, 3))
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch'))
        setData(placeholderAppearances.slice(0, 3))
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, loading, error }
}

// Custom hook for fetching site settings
export function useSiteSettings() {
  const [data, setData] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (!isSanityConfigured()) {
        setData(placeholderSettings)
        setLoading(false)
        return
      }

      try {
        const result = await client.fetch<SiteSettings>(siteSettingsQuery)
        setData(result || placeholderSettings)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch'))
        setData(placeholderSettings)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, loading, error }
}
