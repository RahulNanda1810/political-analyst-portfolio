# CMS Setup Guide for Nandakumar K

This guide explains how to set up and use the content management system (CMS) to add new videos to your portfolio website.

## Overview

Your website uses **Sanity CMS** - a private, login-protected system where you can:
- Add new video appearances
- Edit existing videos
- Mark videos as featured
- Publish/unpublish content

**Important**: The CMS is completely separate from your public website. Visitors will never see any admin interface.

---

## One-Time Setup (Do this first)

### Step 1: Create a Sanity Account

1. Go to [https://www.sanity.io](https://www.sanity.io)
2. Click "Get Started" and create a free account
3. You can sign up with Google, GitHub, or email

### Step 2: Create a Sanity Project

1. After signing in, click "Create new project"
2. Name it: `Nandakumar K Portfolio`
3. Choose the **Free** plan (generous limits)
4. Select dataset: `production`
5. Note down your **Project ID** (looks like: `abc123xyz`)

### Step 3: Configure the Studio

1. Open Terminal on your Mac
2. Navigate to the studio folder:
   ```bash
   cd "/Users/rahulnanda/Desktop/political analyst portfolio/studio"
   ```
3. Create environment file:
   ```bash
   cp .env.example .env
   ```
4. Edit the `.env` file and add your Project ID:
   ```
   SANITY_STUDIO_PROJECT_ID=your-actual-project-id
   SANITY_STUDIO_DATASET=production
   ```

### Step 4: Configure the Website

1. Go back to the main project folder:
   ```bash
   cd "/Users/rahulnanda/Desktop/political analyst portfolio"
   ```
2. Create environment file:
   ```bash
   cp .env.example .env
   ```
3. Edit the `.env` file:
   ```
   VITE_SANITY_PROJECT_ID=your-actual-project-id
   VITE_SANITY_DATASET=production
   ```

### Step 5: Deploy the Studio

1. Install studio dependencies:
   ```bash
   cd studio
   npm install
   ```
2. Deploy the studio:
   ```bash
   npx sanity deploy
   ```
3. Choose a hostname (e.g., `nandakumar-admin`)
4. Your studio will be live at: `https://nandakumar-admin.sanity.studio`

---

## Adding New Videos (Regular Use)

### Access the CMS

1. Go to your studio URL (e.g., `https://nandakumar-admin.sanity.studio`)
2. Log in with your Sanity account

### Add a New Video Appearance

1. Click **"Media Appearance"** in the left sidebar
2. Click the **"+"** button to create new
3. Fill in the details:

| Field | What to Enter |
|-------|---------------|
| **Video Title** | The title of your video/appearance |
| **YouTube Video ID** | The ID from the YouTube URL (e.g., for `youtube.com/watch?v=abc123`, enter `abc123`) |
| **Channel Name** | The channel name (e.g., "Times Now", "CNN-News18") |
| **Channel URL** | Link to the channel (optional) |
| **Role** | Select: Guest Analyst, Panelist, Speaker, Interview, Debate, or Commentary |
| **Topic/Theme** | Main topic discussed (e.g., "Election Analysis", "BJP Politics") |
| **Description** | Brief summary (optional) |
| **Published Date** | When the video was published |
| **Featured** | Check this to show prominently on homepage |
| **Published** | Check this for the video to appear on your website |

4. Click **"Publish"** in the bottom right

### Finding YouTube Video ID

For a URL like: `https://www.youtube.com/watch?v=nm-D1grtQf0`
- The Video ID is: `nm-D1grtQf0`

For a URL like: `https://youtu.be/nm-D1grtQf0`
- The Video ID is: `nm-D1grtQf0`

### Edit Existing Videos

1. Click on any video in the list
2. Make your changes
3. Click **"Publish"**

### Unpublish a Video

1. Open the video
2. Uncheck **"Published"**
3. Click **"Publish"** to save

The video will be hidden from your public website but not deleted.

---

## Updating Your Bio & Information

1. In the CMS, click **"Site Settings"**
2. Update your:
   - Name & Title
   - Bio (short and full)
   - Areas of Expertise
   - Experience/Credentials
   - Social Links
3. Click **"Publish"**

---

## Deploying Website Updates

After setting up Sanity, deploy your website to Vercel:

### First Time Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Import Project" and select your GitHub repo
4. Add environment variables:
   - `VITE_SANITY_PROJECT_ID` = your project ID
   - `VITE_SANITY_DATASET` = production
5. Click "Deploy"

### Automatic Updates

Once deployed:
- Any video you add/edit in the CMS appears on the website automatically
- No code changes needed
- Changes appear within seconds

---

## Security Notes

✅ Your CMS requires login - only you can access it
✅ Public website has NO admin features
✅ Visitors cannot see or access your CMS
✅ All data is read-only on the public site

---

## Quick Reference

| Task | Where to Do It |
|------|----------------|
| Add new video | Sanity Studio → Media Appearance → + |
| Edit video | Sanity Studio → Click video → Edit → Publish |
| Feature a video | Sanity Studio → Video → Check "Featured" |
| Hide a video | Sanity Studio → Video → Uncheck "Published" |
| Update bio | Sanity Studio → Site Settings |

---

## Need Help?

- Sanity Documentation: [sanity.io/docs](https://www.sanity.io/docs)
- Video tutorials: [sanity.io/learn](https://www.sanity.io/learn)

---

## Current Placeholder Videos

Until you set up Sanity, your website shows placeholder videos from your YouTube channel. Once Sanity is configured, you can manage all videos through the CMS.
