import { z } from 'zod';

export const getContact = {
  name: 'getContact',
  description: 'Get my contact information and availability for projects',
  parameters: z.object({}),
  execute: async () => {
    return {
      contact: {
        email: 'fin.howard03@gmail.com',
        linkedin: 'https://www.linkedin.com/in/finn-howard-151ab8ab/',
        github: 'https://github.com/finnerzbtz',
        substack: 'https://substack.com/@finnerz1',
        instagram: 'https://www.instagram.com/fieves.uk/',
        portfolio: 'This AI portfolio'
      },
      availability: {
        status: 'Available for new projects',
        types: [
          'Automation consulting and implementation',
          'AI integration projects',
          'Content creation and strategy',
          'n8n workflow development',
          'Educational technology solutions',
          'Full-stack development with AI focus'
        ],
        responseTime: 'Within 24 hours',
        preferredContact: 'Email (fin.howard03@gmail.com)'
      },
      collaboration: {
        services: [
          'End-to-end automation system design',
          'AI-powered content creation workflows',
          'n8n workflow development and optimisation',
          'API integration and webhook development',
          'Educational technology solutions',
          'Content strategy and viral content creation',
          'React application development with AI integration'
        ],
        approach: 'I love working on projects that combine technical innovation with creative problem-solving. Whether it\'s building automation systems, creating viral content, or integrating AI into existing workflows, I\'m always excited to tackle new challenges. I specialize in education and media technology.',
        idealProjects: [
          'Automation systems that save significant time and resources',
          'AI-powered content creation platforms',
          'Educational technology with AI integration',
          'Viral content campaigns with technical innovation',
          'API-heavy applications with multiple integrations',
          'n8n workflow optimisation and custom development'
        ]
      }
    };
  },
};
