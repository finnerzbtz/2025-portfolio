import { motion } from 'framer-motion';
import { 
  Video, 
  Camera, 
  Mic, 
  TrendingUp, 
  Users, 
  Play,
  Sparkles,
  Music,
  Heart,
  Globe
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

export default function Content() {
  const contentProjects = [
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
      impact: 'Created engaging and effective content format that showcased emerging hip-hop artists',
      color: '#FF6B6B',
      icon: Music
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
      impact: 'Just launched - creating therapeutic and engaging content using cutting-edge AI technology',
      color: '#856ED9',
      icon: Sparkles
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
      impact: 'Transformed social media presence for educational institutions through automated AI content creation',
      color: '#3E9858',
      icon: Users
    }
  ];

  const principles = [
    'Innovation through technology integration',
    'Authentic human connection and storytelling',
    'Data-driven optimisation and performance tracking',
    'Cross-platform content strategy and distribution',
    'Community building and engagement focus'
  ];

  const technicalExpertise = [
    '360° camera cinematography and immersive video',
    'Professional audio recording and post-production',
    'AI video generation and audio synthesis',
    'Social media optimisation and viral strategies',
    'Content analytics and performance tracking',
    'Multi-platform content distribution',
    'Educational content creation and automation'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      className="w-full space-y-6 px-4 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="text-center space-y-3" variants={itemVariants}>
        <div className="flex items-center justify-center gap-2">
          <Video className="h-8 w-8 text-pink-500" />
          <h2 className="text-3xl font-bold">Content Creation</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          I create content that combines technical innovation with authentic human connection, delivering value while pushing creative boundaries.
        </p>
      </motion.div>

      {/* Content Projects */}
      <motion.div className="space-y-4" variants={itemVariants}>
        {contentProjects.map((project, index) => {
          const IconComponent = project.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Project Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <IconComponent className="h-5 w-5" style={{ color: project.color }} />
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {project.platform} • {project.timeframe}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {project.platform}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-muted-foreground">{project.description}</p>

                {/* Technical Aspects */}
                <div>
                  <h4 className="font-medium flex items-center gap-2 mb-3">
                    <Camera className="h-4 w-4" />
                    Technical Aspects
                  </h4>
                  <ul className="space-y-2">
                    {project.technicalAspects.map((aspect, aspectIndex) => (
                      <li key={aspectIndex} className="flex items-start gap-2 text-sm">
                        <Play className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        {aspect}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact */}
                <div className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    Impact
                  </h4>
                  <p className="text-sm text-muted-foreground">{project.impact}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </motion.div>

      <Separator />

      {/* Content Creation Philosophy */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          Content Creation Philosophy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {principles.map((principle, index) => (
            <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
              <Sparkles className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{principle}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Technical Expertise */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Mic className="h-5 w-5 text-orange-500" />
          Technical Expertise
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {technicalExpertise.map((skill, index) => (
            <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
              <Camera className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{skill}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Approach */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Globe className="h-5 w-5 text-indigo-500" />
          My Approach
        </h3>
        <div className="p-4 rounded-lg bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-950/20 dark:to-orange-950/20">
          <p className="text-muted-foreground">
            Whether it's viral TikTok content, AI-generated therapeutic experiences, or educational content, 
            the goal is always to deliver value while pushing creative boundaries. I combine technical innovation 
            with authentic storytelling to create content that resonates and engages.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
} 