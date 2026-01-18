import { useState, useEffect, useCallback } from 'react'
import type { Appearance } from './types'
import { placeholderAppearances } from './placeholder-data'

interface YouTubeApiVideo {
  id: string
  title: string
  publishedAt: string
  channelName: string
  channelUrl: string
}

interface YouTubeApiResponse {
  success: boolean
  videos: YouTubeApiVideo[]
  fetchedAt: string
}

// Convert YouTube API response to Appearance format
function convertToAppearance(video: YouTubeApiVideo, index: number): Appearance {
  // Try to detect topic and role from title
  const title = video.title.toLowerCase()
  
  let topic = 'Political Analysis'
  let role: Appearance['role'] = 'commentary'

  // Detect topic from title keywords
  if (title.includes('election') || title.includes('தேர்தல்')) {
    topic = 'Election Analysis'
  } else if (title.includes('dmk') || title.includes('திமுக')) {
    topic = 'Party Politics'
  } else if (title.includes('bjp') || title.includes('பாஜக')) {
    topic = 'BJP Politics'
  } else if (title.includes('vijay') || title.includes('tvk') || title.includes('விஜய்')) {
    topic = 'TVK Politics'
  } else if (title.includes('seeman') || title.includes('ntk') || title.includes('சீமான்')) {
    topic = 'NTK Politics'
  } else if (title.includes('supreme court') || title.includes('court') || title.includes('law')) {
    topic = 'Legal & Constitutional'
  } else if (title.includes('women') || title.includes('பெண்')) {
    topic = 'Social Issues'
  } else if (title.includes('india') || title.includes('geopolit')) {
    topic = 'Geopolitics'
  }

  // Detect role from title or channel
  if (title.includes('times now') || title.includes('cnn') || title.includes('news18')) {
    role = 'guest-analyst'
  } else if (title.includes('debate') || title.includes('vs')) {
    role = 'debate'
  } else if (title.includes('panel')) {
    role = 'panelist'
  } else if (title.includes('interview')) {
    role = 'interview'
  } else if (video.channelName === 'Nanda Third Eye') {
    role = 'speaker'
  }

  return {
    _id: `yt-${video.id}`,
    title: video.title,
    youtubeId: video.id,
    channelName: video.channelName,
    channelUrl: video.channelUrl,
    role,
    topic,
    publishedAt: video.publishedAt,
    featured: index < 6, // First 6 videos are featured
  }
}

// Custom hook to fetch videos from YouTube API with fallback
export function useYouTubeVideos() {
  const [data, setData] = useState<Appearance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [lastFetched, setLastFetched] = useState<string | null>(null)

  const fetchVideos = useCallback(async () => {
    try {
      // Try to fetch from our API endpoint
      const response = await fetch('/api/youtube')
      
      if (!response.ok) {
        throw new Error('API request failed')
      }

      const result: YouTubeApiResponse = await response.json()

      if (result.success && result.videos.length > 0) {
        const appearances = result.videos.map((video, index) => 
          convertToAppearance(video, index)
        )
        setData(appearances)
        setLastFetched(result.fetchedAt)
      } else {
        // Fall back to placeholder data
        setData(placeholderAppearances)
      }
    } catch (err) {
      console.warn('YouTube API fetch failed, using placeholder data:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch'))
      // Fall back to placeholder data
      setData(placeholderAppearances)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  return { data, loading, error, lastFetched, refetch: fetchVideos }
}

// Get featured videos (first 6)
export function useYouTubeFeaturedVideos() {
  const { data, loading, error } = useYouTubeVideos()
  return {
    data: data.filter(v => v.featured).slice(0, 6),
    loading,
    error,
  }
}

// Get recent videos (first 3)
export function useYouTubeRecentVideos() {
  const { data, loading, error } = useYouTubeVideos()
  return {
    data: data.slice(0, 3),
    loading,
    error,
  }
}
