import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'political-analyst-studio',
  title: 'Political Analyst CMS',

  // Replace with your actual project ID and dataset
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // Studio will be deployed to a separate URL (e.g., studio.yourdomain.com)
  // This keeps admin completely separate from the public site
})
