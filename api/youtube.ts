import type { VercelRequest, VercelResponse } from '@vercel/node'

interface YouTubeVideo {
  id: string
  title: string
  publishedAt: string
  channelName: string
  channelUrl: string
}

// YouTube channel ID for @nandathirdeye1152
const CHANNEL_HANDLE = 'nandathirdeye1152'
const CHANNEL_NAME = 'Nanda Third Eye'
const CHANNEL_URL = 'https://www.youtube.com/@nandathirdeye1152'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200') // Cache for 1 hour

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Fetch the YouTube channel page to extract video IDs
    const channelUrl = `https://www.youtube.com/@${CHANNEL_HANDLE}`
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
    )].slice(0, 30) // Get up to 30 unique videos

    // Fetch video details using oEmbed API
    const videos: YouTubeVideo[] = []

    for (const videoId of uniqueVideoIds) {
      try {
        const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        const oembedResponse = await fetch(oembedUrl)
        
        if (oembedResponse.ok) {
          const data = await oembedResponse.json()
          videos.push({
            id: videoId,
            title: data.title || 'Untitled Video',
            publishedAt: new Date().toISOString().split('T')[0], // oEmbed doesn't provide date
            channelName: CHANNEL_NAME,
            channelUrl: CHANNEL_URL,
          })
        }
      } catch {
        // Skip videos that fail to fetch
        continue
      }
    }

    return res.status(200).json({
      success: true,
      channel: {
        name: CHANNEL_NAME,
        url: CHANNEL_URL,
        handle: CHANNEL_HANDLE,
      },
      videos,
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
