import { z } from 'zod';

export const getContent = {
  name: 'getContent',
  description: 'Get information about my content creation work and viral content',
  parameters: z.object({}),
  execute: async () => {
    return {
      contentProjects: [
        {
          name: 'Barz in Carz - Viral TikTok Series',
          platform: 'TikTok',
          timeframe: 'Previous Project',
          description: 'Produced viral TikTok series showcasing hip-hop talent using digital recording techniques and 360° cameras',
          technicalAspects: [
            '360° camera cinematography for immersive experience',
            'Professional digital audio recording in automotive environments',
            'Strategic content optimisation for virality',
            'Artist discovery and promotion platform',
            'Cross-platform content distribution'
          ],
          impact: 'Created engaging and effective content format that showcased emerging hip-hop artists'
        },
        {
          name: 'AI ASMR Channel',
          platform: 'YouTube',
          timeframe: 'Just Started',
          description: 'Producing interesting and satisfying audio and visual content using the latest AI video generation models',
          technicalAspects: [
            'AI-generated audio and visual content',
            'Latest AI video generation models',
            'Therapeutic and satisfying content creation',
            'Community building through innovative content',
            'Automated content scheduling'
          ],
          impact: 'Just launched - creating therapeutic and engaging content using cutting-edge AI technology'
        },
        {
          name: 'Aquinas Adult Education Social Media',
          platform: 'Multiple Social Media',
          timeframe: 'Previous Role',
          description: 'Automated content creation system for educational institutions using AI-generated content',
          technicalAspects: [
            'AI-generated visual content using Pexels API',
            'Audio synthesis with ElevenLabs',
            'Custom MCP server integration',
            'Automated social media posting and scheduling',
            'Content performance tracking and optimisation'
          ],
          impact: 'Transformed social media presence for educational institutions through automated AI content creation'
        }
      ],
      contentCreationPhilosophy: {
        approach: 'I believe in creating content that combines technical innovation with authentic human connection. Whether it\'s viral TikTok content, AI-generated therapeutic experiences, or educational content, the goal is always to deliver value while pushing creative boundaries.',
        principles: [
          'Innovation through technology integration',
          'Authentic human connection and storytelling',
          'Data-driven optimisation and performance tracking',
          'Cross-platform content strategy and distribution',
          'Community building and engagement focus'
        ]
      },
      technicalExpertise: [
        '360° camera cinematography and immersive video',
        'Professional audio recording and post-production',
        'AI video generation and audio synthesis',
        'Social media optimisation and viral strategies',
        'Content analytics and performance tracking',
        'Multi-platform content distribution',
        'Educational content creation and automation'
      ]
    };
  },
}; 