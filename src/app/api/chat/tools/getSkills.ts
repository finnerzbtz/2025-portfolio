import { z } from 'zod';

export const getSkills = {
  name: 'getSkills',
  description: 'Get information about my technical skills and expertise',
  parameters: z.object({}),
  execute: async () => {
    return {
      skills: {
        primary: {
          name: 'Primary Technologies',
          technologies: [
            'JavaScript (main language)',
            'JSON (data handling)',
            'n8n (workflow automation platform)',
            'Cursor (AI-powered code editor)',
            'React (frontend development)'
          ],
          description: 'My core tech stack focused on getting things working efficiently'
        },
        automation: {
          name: 'Automation & Workflow',
          technologies: [
            'n8n workflow automation',
            'API integration and webhooks',
            'Data scraping and processing',
            'Automated content generation',
            'Custom MCP servers',
            'Workflow optimisation'
          ],
          description: 'Expert in building end-to-end automation systems that transform business processes'
        },
        ai: {
          name: 'AI & Machine Learning',
          technologies: [
            'OpenAI API integration',
            'Google Gemini API',
            'ElevenLabs audio synthesis',
            'RAG (Retrieval-Augmented Generation)',
            'AI video generation models',
            'Natural language processing'
          ],
          description: 'Specialized in integrating AI technologies into practical business solutions'
        },
        development: {
          name: 'Development & APIs',
          technologies: [
            'React/JavaScript',
            'WordPress API',
            'Google APIs (Calendar, Drive, Sheets)',
            'Microsoft Outlook API',
            'Pexels API (stock images)',
            'News APIs',
            'Social media APIs'
          ],
          description: 'Full-stack development with focus on API integration and modern web technologies'
        },
        content: {
          name: 'Content Creation',
          technologies: [
            '360° camera cinematography',
            'Digital audio recording',
            'Video editing and post-production',
            'Social media optimisation',
            'Viral content strategies',
            'TikTok/YouTube content distribution'
          ],
          description: 'Creative content production with technical expertise in digital media'
        }
      },
      specializations: [
        'Education Technology - Building tools for educational institutions',
        'Media & Content - Creating engaging content and automation systems',
        'Workflow Automation - End-to-end automation solutions',
        'AI Integration - Practical AI applications for business'
      ],
      approach: 'I\'m a "vibe coder" - I focus on getting things working and creating solutions. My philosophy is "Automate the boring stuff, create the amazing stuff." I specialize in education and media technology, combining technical expertise with creative problem-solving to build intelligent systems that deliver real business value.'
    };
  },
};
