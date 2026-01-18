import type { VercelRequest, VercelResponse } from '@vercel/node'

interface YouTubeVideo {
  id: string
  title: string
  publishedAt: string
  channelName: string
  channelUrl: string
  description?: string
  thumbnailUrl?: string
}

// YouTube channel details
const CHANNEL_ID = 'UCyour-channel-id' // Will be fetched dynamically
const CHANNEL_HANDLE = 'nandathirdeye1152'
const CHANNEL_NAME = 'Nanda Third Eye'
const CHANNEL_URL = 'https://www.youtube.com/@nandathirdeye1152'

// Get API key from environment
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

// Fetch channel ID from handle
async function getChannelId(apiKey: string): Promise<string | null> {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${CHANNEL_HANDLE}&key=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.items && data.items.length > 0) {
      return data.items[0].snippet.channelId
    }
    
    // Alternative: Try channels list with forHandle (newer API)
    const handleUrl = `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${CHANNEL_HANDLE}&key=${apiKey}`
    const handleResponse = await fetch(handleUrl)
    const handleData = await handleResponse.json()
    
    if (handleData.items && handleData.items.length > 0) {
      return handleData.items[0].id
    }
    
    return null
  } catch (error) {
    console.error('Error fetching channel ID:', error)
    return null
  }
}

// Fetch all videos from a channel using YouTube Data API v3
async function fetchAllVideos(apiKey: string, channelId: string): Promise<YouTubeVideo[]> {
  const videos: YouTubeVideo[] = []
  let nextPageToken: string | undefined = undefined
  const maxResults = 50 // Maximum allowed by API
  
  try {
    // First, get the uploads playlist ID
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    const channelResponse = await fetch(channelUrl)
    const channelData = await channelResponse.json()
    
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found')
    }
    
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads
    
    // Fetch all videos from uploads playlist (paginated)
    do {
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`
      
      const playlistResponse = await fetch(playlistUrl)
      const playlistData = await playlistResponse.json()
      
      if (playlistData.error) {
        console.error('YouTube API error:', playlistData.error)
        break
      }
      
      if (playlistData.items) {
        for (const item of playlistData.items) {
          const snippet = item.snippet
          videos.push({
            id: snippet.resourceId.videoId,
            title: snippet.title,
            publishedAt: snippet.publishedAt,
            channelName: snippet.channelTitle || CHANNEL_NAME,
            channelUrl: CHANNEL_URL,
            description: snippet.description,
            thumbnailUrl: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url,
          })
        }
      }
      
      nextPageToken = playlistData.nextPageToken
    } while (nextPageToken)
    
  } catch (error) {
    console.error('Error fetching videos:', error)
  }
  
  return videos
}

// Fallback: Scrape channel page for video IDs (limited to ~30 videos)
async function fetchVideosFallback(): Promise<YouTubeVideo[]> {
  const videos: YouTubeVideo[] = []
  
  try {
    const channelUrl = `https://www.youtube.com/@${CHANNEL_HANDLE}/videos`
    const response = await fetch(channelUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch channel: ${response.status}`)
    }

    const html = await response.text()
    
    // Extract video IDs from the page
    const videoIdMatches = html.match(/watch\?v=([a-zA-Z0-9_-]{11})/g) || []
    const uniqueVideoIds = [...new Set(
      videoIdMatches
        .map(match => match.replace('watch?v=', ''))
        .filter(id => id.length === 11)
    )].slice(0, 50) // Get up to 50 unique videos

    // Fetch video details using oEmbed API (parallel requests)
    const oembedPromises = uniqueVideoIds.map(async (videoId) => {
      try {
        const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        const oembedResponse = await fetch(oembedUrl)
        
        if (oembedResponse.ok) {
          const data = await oembedResponse.json()
          return {
            id: videoId,
            title: data.title || 'Untitled Video',
            publishedAt: new Date().toISOString(), // oEmbed doesn't provide date
            channelName: data.author_name || CHANNEL_NAME,
            channelUrl: data.author_url || CHANNEL_URL,
          }
        }
      } catch {
        return null
      }
      return null
    })

    const results = await Promise.all(oembedPromises)
    videos.push(...results.filter((v): v is YouTubeVideo => v !== null))
    
  } catch (error) {
    console.error('Error in fallback fetch:', error)
  }
  
  return videos
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200') // Cache for 1 hour

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    let videos: YouTubeVideo[] = []
    let usedApi = false

    // Try YouTube Data API first if API key is available
    if (YOUTUBE_API_KEY) {
      console.log('Using YouTube Data API v3')
      
      // Get channel ID
      const channelId = await getChannelId(YOUTUBE_API_KEY)
      
      if (channelId) {
        videos = await fetchAllVideos(YOUTUBE_API_KEY, channelId)
        usedApi = true
        console.log(`Fetched ${videos.length} videos via API`)
      }
    }

    // Fallback to scraping if API didn't work or isn't configured
    if (videos.length === 0) {
      console.log('Falling back to web scraping')
      videos = await fetchVideosFallback()
    }

    // Sort by publish date (newest first)
    videos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    return res.status(200).json({
      success: true,
      channel: {
        name: CHANNEL_NAME,
        url: CHANNEL_URL,
        handle: CHANNEL_HANDLE,
      },
      videos,
      totalCount: videos.length,
      usedApi,
      fetchedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch videos',
      videos: [],
    })
  }
}
