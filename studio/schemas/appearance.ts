import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'appearance',
  title: 'Media Appearance',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      description: 'The title of the video or segment',
      validation: (Rule) => Rule.required().min(10).max(200),
    }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'The YouTube video ID (the part after v= in the URL). Example: for https://youtube.com/watch?v=dQw4w9WgXcQ, enter dQw4w9WgXcQ',
      validation: (Rule) => Rule.required().regex(/^[a-zA-Z0-9_-]{11}$/, {
        name: 'YouTube ID',
        invert: false,
      }),
    }),
    defineField({
      name: 'channelName',
      title: 'Channel Name',
      type: 'string',
      description: 'Name of the YouTube channel or media outlet',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'channelUrl',
      title: 'Channel URL',
      type: 'url',
      description: 'Link to the YouTube channel',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Your role in this appearance',
      options: {
        list: [
          {title: 'Guest Analyst', value: 'guest-analyst'},
          {title: 'Panelist', value: 'panelist'},
          {title: 'Speaker', value: 'speaker'},
          {title: 'Interview', value: 'interview'},
          {title: 'Debate Participant', value: 'debate'},
          {title: 'Expert Commentary', value: 'commentary'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'topic',
      title: 'Topic / Theme',
      type: 'string',
      description: 'The main topic or theme discussed',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the appearance (optional)',
      rows: 3,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      description: 'When this video was published',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this appearance prominently on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Only published appearances will appear on the public site',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published Date, Oldest',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      channelName: 'channelName',
      publishedAt: 'publishedAt',
      role: 'role',
    },
    prepare({title, channelName, publishedAt, role}) {
      const roleLabels: Record<string, string> = {
        'guest-analyst': 'Guest Analyst',
        'panelist': 'Panelist',
        'speaker': 'Speaker',
        'interview': 'Interview',
        'debate': 'Debate',
        'commentary': 'Commentary',
      }
      return {
        title,
        subtitle: `${channelName} • ${roleLabels[role] || role} • ${publishedAt || 'No date'}`,
      }
    },
  },
})
