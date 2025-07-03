import { z } from 'zod';

export const getAutomation = {
  name: 'getAutomation',
  description: 'Get detailed information about my automation systems and n8n workflows',
  parameters: z.object({}),
  execute: async () => {
    return {
      automationSystems: [
        {
          name: 'The Wire Ltd Content Automation',
          platform: 'n8n',
          timeframe: 'Current - 2 months',
          description: 'Building and maintaining scraping systems for automated content creation with WordPress, Gemini, and OpenAI API integration',
          workflow: [
            'Content scraping from multiple sources',
            'AI-powered content generation using Gemini and OpenAI',
            'WordPress publishing automation',
            'Content formatting and optimisation',
            'Automated guides and round-ups creation'
          ],
          technologies: ['n8n', 'OpenAI API', 'Google Gemini', 'WordPress API', 'JavaScript'],
          status: 'Active - Currently maintaining and improving'
        },
        {
          name: 'Aquinas College Student Hub Backend',
          platform: 'n8n',
          timeframe: 'Previous Role',
          description: 'Comprehensive backend automation for educational tools including skills tracking, deadline management, and AI chatbot',
          workflow: [
            'Skills tracker with real-time feedback system',
            'Deadline tracker unifying Outlook and Google accounts',
            'AI chatbot with RAG for knowledge base access',
            'News API integration for student subjects',
            'Weekly bulletin system via Google Sheets API'
          ],
          technologies: ['n8n', 'React', 'Google APIs', 'Outlook API', 'OpenAI', 'RAG'],
          status: 'Completed - Full system implemented'
        },
        {
          name: 'Aquinas Adult Education Content Production',
          platform: 'n8n',
          timeframe: 'Previous Role',
          description: 'Automated content production workflow for social media using Pexels API, ElevenLabs, and custom MCP server',
          workflow: [
            'AI-generated visual content using Pexels API',
            'Audio synthesis with ElevenLabs',
            'Custom MCP server integration',
            'Social media content scheduling',
            'Automated content distribution'
          ],
          technologies: ['n8n', 'Pexels API', 'ElevenLabs', 'MCP Server', 'Social Media APIs'],
          status: 'Completed - Fully automated workflow'
        }
      ],
      keyCapabilities: [
        'Multi-source data integration and processing',
        'AI-powered content generation and optimisation',
        'Real-time workflow monitoring and error handling',
        'Cross-platform API integration and synchronisation',
        'Custom MCP server development and integration',
        'Educational technology automation solutions',
        'Social media content automation'
      ],
      approach: 'I design automation systems that are not just efficient, but intelligent. Each workflow is built with error handling, monitoring, and the ability to learn and improve over time. My focus is on "vibe coding" - getting things working quickly while maintaining quality and scalability. I specialize in education and media automation, creating systems that work seamlessly in the background while delivering measurable business value.'
    };
  },
}; 