# Political Analyst Portfolio

A premium, multi-page personal website for a political analyst who appears across multiple media platforms. Built with Vite, React, TypeScript, and Sanity CMS.

## Features

- **Editorial Design**: Authoritative, institutional aesthetic suitable for thought leaders
- **Multi-Page Structure**: Home, About, Media Appearances, Contact
- **CMS-Driven Content**: Video appearances managed through Sanity CMS
- **Video Modal Playback**: Watch videos without leaving the site
- **Responsive Design**: Optimized for all devices
- **SEO Optimized**: Meta tags, Open Graph, structured data
- **Fast Loading**: Optimized builds, code splitting

## Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **CMS**: Sanity (Headless, login-protected)
- **Deployment**: Vercel-ready

## Project Structure

```
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities, hooks, CMS integration
│   └── index.css          # Global styles
├── studio/                # Sanity CMS Studio (separate deployment)
│   ├── schemas/           # CMS content schemas
│   └── sanity.config.ts   # Studio configuration
└── public/                # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account (free tier available)

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   cd studio && npm install
   ```

2. **Set up Sanity CMS**:
   ```bash
   cd studio
   npx sanity init
   # Follow prompts to create a new project or connect to existing
   ```

3. **Configure environment variables**:
   
   Copy `.env.example` to `.env` and add your Sanity project details:
   ```env
   VITE_SANITY_PROJECT_ID=your-project-id
   VITE_SANITY_DATASET=production
   ```

4. **Run development servers**:
   
   Frontend:
   ```bash
   npm run dev
   ```
   
   Sanity Studio (in a new terminal):
   ```bash
   cd studio
   npm run dev
   ```

## CMS Architecture

The CMS is **completely separate** from the public website:

- **Public Site** (this repo): Read-only access to Sanity data
- **Sanity Studio**: Private admin interface, deployed separately

### Content Types

1. **Media Appearances**
   - YouTube video ID
   - Title
   - Channel name & URL
   - Role (Guest Analyst, Panelist, Speaker, etc.)
   - Topic/Theme
   - Published date
   - Featured flag
   - Published status

2. **Site Settings**
   - Name & Title
   - Biography
   - Expertise areas
   - Credentials
   - Social links

## Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Sanity Studio

Deploy to a separate URL (e.g., `studio.yourdomain.com`):

```bash
cd studio
npx sanity deploy
```

The studio is login-protected and invisible to public users.

## Security Notes

- Public site has **no admin routes** or edit capabilities
- All CMS access requires authentication
- API keys stored in environment variables
- No write token exposed to frontend

## Adding New Videos

1. Log in to Sanity Studio
2. Create new "Media Appearance" document
3. Fill in video details
4. Set "Published" to true
5. Video appears on public site automatically

## Customization

- **Colors**: Edit `tailwind.config.js`
- **Typography**: Modify font family in Tailwind config
- **Content**: Update placeholder data or connect CMS
- **Components**: All in `src/components/`

## License

Private - All rights reserved
