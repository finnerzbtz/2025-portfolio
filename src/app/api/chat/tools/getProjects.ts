import { z } from 'zod';

export const getProjects = {
  name: 'getProjects',
  description: 'Get information about my projects and work experience',
  parameters: z.object({
    category: z.enum(['all', 'automation', 'ai', 'content', 'development']).optional(),
  }),
  execute: async ({ category = 'all' }: { category?: string }) => {
    const projects = [
      {
        id: 'wire-ltd-scraper',
        title: 'Wire Ltd Scraper',
        company: 'The Wire Ltd',
        role: 'AI Editorial Officer',
        category: 'automation',
        timeframe: 'Current',
        description: 'Automated n8n workflow that scrapes and aggregates live event listings from major Manchester/Salford venues, using OpenAI and Gemini for link extraction and event parsing, and emails a formatted "Last Minute Tickets" guide nightly.',
        technologies: ['n8n', 'OpenAI (GPT-4.1)', 'Google Gemini', 'Custom Scraping', 'Markdown Parsing', 'Gmail API', 'JavaScript'],
        highlights: [
          'Multi-venue scraping and aggregation',
          'AI-powered event extraction and classification',
          'Automated email delivery',
          'Custom prompt engineering for event summaries'
        ]
      },
      {
        id: 'ai-content-production-workflow',
        title: 'AI Content Production Workflow',
        company: 'Aquinas College Adult Education',
        role: 'Social Media Manager',
        category: 'automation',
        timeframe: 'Previous Role',
        description: "Automated daily content pipeline for Aquinas College's adult education marketing. Pulls course data from Google Sheets, generates a 30s marketing script with GPT-4, creates a TTS voiceover (ElevenLabs), and auto-produces a short video with MCP tools, distributing to Telegram and Google Drive.",
        technologies: ['n8n', 'OpenAI (GPT-4.1)', 'ElevenLabs', 'MCP Video Tools', 'Google Sheets/Drive/Telegram APIs'],
        highlights: [
          'End-to-end AI content automation',
          'Script-to-video pipeline',
          'Multi-platform distribution',
          'Dynamic scene/keyword generation'
        ]
      },
      {
        id: 'opportunity-scanner',
        title: 'Opportunity Scanner',
        company: 'Music Tech Startup',
        role: 'Full-Stack Developer',
        category: 'automation',
        timeframe: 'Previous Project',
        description: 'n8n workflow that scrapes and aggregates music industry opportunities (gigs, jobs, funding, sync, brand partnerships) from curated sources, parses and normalizes data, and prepares actionable listings for artists.',
        technologies: ['n8n', 'OpenAI (GPT-4.1)', 'Custom Scraping', 'Markdown/JSON Parsing'],
        highlights: [
          'Multi-source aggregation',
          'Opportunity classification',
          'AI-powered data extraction and normalization'
        ]
      },
      {
        id: 'barz-in-carz',
        title: 'Barz in Carz',
        company: 'Independent Creator',
        role: 'Content Creator & Producer',
        category: 'content',
        timeframe: 'Previous Project',
        description: 'Viral TikTok series featuring immersive 360° camera cinematography, professional digital audio recording, and strategic content optimisation for virality. Artist showcase and promotion platform.',
        technologies: ['360° Cameras', 'Digital Audio Recording', 'Video Editing', 'TikTok', 'Social Analytics'],
        highlights: [
          'Immersive 360° camera cinematography',
          'Professional digital audio recording',
          'Strategic content optimisation for virality',
          'Artist showcase and promotion platform'
        ]
      },
      {
        id: 'ai-asmr-channel',
        title: 'AI ASMR Channel',
        company: 'Independent Creator',
        role: 'AI Content Creator',
        category: 'ai',
        timeframe: 'Just Started',
        description: 'Producing interesting and satisfying audio and visual content using the latest AI video generation models. Focussed on therapeutic and satisfying content creation and community building.',
        technologies: ['AI Video Generation', 'Audio Synthesis', 'YouTube', 'Content Creation'],
        highlights: [
          'AI-generated audio and visual content',
          'Therapeutic and satisfying content creation',
          'Latest AI video generation models',
          'Community building through innovative content'
        ]
      },
      {
        id: 'aquinas-student-hub',
        title: 'Aquinas Student Hub',
        company: 'Aquinas College',
        role: 'Creative Multimedia Technician',
        category: 'development',
        timeframe: 'Previous Role',
        description: 'Built a comprehensive React application with AI-powered tools including skills tracker, deadline management, AI chatbot with RAG, news API, and bulletin system for Aquinas College.',
        technologies: ['React', 'n8n', 'Google APIs', 'Outlook API', 'OpenAI', 'RAG', 'JavaScript'],
        highlights: [
          'Skills tracker with real-time feedback and documentation',
          'Deadline tracker unifying Outlook and Google accounts',
          'AI chatbot with RAG for knowledge base access',
          'News API fetching content based on student subjects',
          'Weekly bulletin system via Google Sheets API'
        ]
      },
      {
        id: 'events-opportunity-scraper',
        title: 'Events & Opportunity Scraper',
        company: 'Music Tech Startup',
        role: 'Full-Stack Developer',
        category: 'development',
        timeframe: 'Previous Project',
        description: 'Built events scraper prototype with React application using webhooks for a music tech startup creating an all-in-one SaaS for independent artists.',
        technologies: ['React', 'Webhooks', 'JavaScript', 'API Integration', 'SaaS'],
        highlights: [
          'Events and opportunities scraping',
          'React application with webhook integration',
          'All-in-one SaaS platform design',
          'Independent artist-focused solution'
        ]
      }
    ];

    const filteredProjects = category === 'all' 
      ? projects 
      : projects.filter(p => p.category === category);

    return {
      projects: filteredProjects,
      total: filteredProjects.length,
      category: category
    };
  },
};