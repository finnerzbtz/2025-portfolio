import { motion } from 'framer-motion';
import { 
  Zap, 
  Bot, 
  Workflow, 
  CheckCircle2, 
  Code, 
  Globe,
  Database,
  Settings
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

export default function Automation() {
  const automationSystems = [
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
      status: 'Active - Currently maintaining and improving',
      color: '#3E9858'
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
      status: 'Completed - Full system implemented',
      color: '#856ED9'
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
      status: 'Completed - Fully automated workflow',
      color: '#FF6B6B'
    }
  ];

  const keyCapabilities = [
    'Multi-source data integration and processing',
    'AI-powered content generation and optimisation',
    'Real-time workflow monitoring and error handling',
    'Cross-platform API integration and synchronisation',
    'Custom MCP server development and integration',
    'Educational technology automation solutions',
    'Social media content automation'
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
          <Zap className="h-8 w-8 text-orange-500" />
          <h2 className="text-3xl font-bold">Automation Systems</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          I design automation systems that are not just efficient, but intelligent. Each workflow is built with error handling, monitoring, and the ability to learn and improve over time.
        </p>
      </motion.div>

      {/* Automation Systems */}
      <motion.div className="space-y-4" variants={itemVariants}>
        {automationSystems.map((system, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* System Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Bot className="h-5 w-5" style={{ color: system.color }} />
                    {system.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {system.platform} • {system.timeframe}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {system.status.split(' - ')[0]}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-muted-foreground">{system.description}</p>

              {/* Workflow Steps */}
              <div>
                <h4 className="font-medium flex items-center gap-2 mb-3">
                  <Workflow className="h-4 w-4" />
                  Workflow
                </h4>
                <ul className="space-y-2">
                  {system.workflow.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-medium flex items-center gap-2 mb-3">
                  <Code className="h-4 w-4" />
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {system.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      <Separator />

      {/* Key Capabilities */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-500" />
          Key Capabilities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {keyCapabilities.map((capability, index) => (
            <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{capability}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Approach */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Globe className="h-5 w-5 text-purple-500" />
          My Approach
        </h3>
        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <p className="text-muted-foreground">
            I focus on "vibe coding" - getting things working quickly while maintaining quality and scalability. 
            I specialize in education and media automation, creating systems that work seamlessly in the background 
            while delivering measurable business value.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
} 