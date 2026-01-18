import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      description: 'e.g., "Political Analyst & Strategic Advisor"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      description: 'A short, authority-driven description',
      rows: 2,
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'aboutShort',
      title: 'Short Bio',
      type: 'text',
      description: 'A brief bio for the homepage',
      rows: 4,
    }),
    defineField({
      name: 'aboutFull',
      title: 'Full Bio',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Complete biography for the About page',
    }),
    defineField({
      name: 'expertise',
      title: 'Areas of Expertise',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of expertise areas',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials & Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'organization', title: 'Organization', type: 'string'},
            {name: 'period', title: 'Period', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'},
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'twitter', title: 'Twitter/X', type: 'url'},
        {name: 'linkedin', title: 'LinkedIn', type: 'url'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({title}) {
      return {
        title: title || 'Site Settings',
        subtitle: 'Global site configuration',
      }
    },
  },
})
