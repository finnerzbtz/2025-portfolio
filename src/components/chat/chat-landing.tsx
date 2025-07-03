'use client';

import { motion } from 'framer-motion';
import { Award, Code, GraduationCap, Mail, MessageSquare } from 'lucide-react';
import React from 'react';

interface ChatLandingProps {
  submitQuery: (query: string) => void;
  showPresentationBackground?: boolean;
}

const ChatLanding: React.FC<ChatLandingProps> = ({ submitQuery, showPresentationBackground = false }) => {
  // Suggested questions that the user can click on
  const suggestedQuestions = [
    {
      icon: <MessageSquare className="h-4 w-4" />,
      text: 'Who are you? Tell me about your background and experience.',
    },
    {
      icon: <Code className="h-4 w-4" />,
      text: 'What are your current projects? Show me your automation and AI work.',
    },
    {
      icon: <Award className="h-4 w-4" />,
      text: 'What are your technical skills? Tell me about n8n, AI, and development.',
    },
    {
      icon: <Mail className="h-4 w-4" />,
      text: 'How can I contact you for collaboration or opportunities?',
    },
  ];

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      className={`flex w-full flex-col items-center px-4 py-6 ${showPresentationBackground ? 'bg-white/85 backdrop-blur-xl rounded-2xl shadow-sm border border-white/20 mx-4' : ''}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome message */}
      <motion.div className="mb-8 text-center" variants={itemVariants}>
        <h2 className="mb-3 text-2xl font-semibold">
            Hey, I'm Finley's AI assistant
        </h2>
        <p className="text-muted-foreground mx-auto max-w-md">
          Ask me anything about automation, AI, content creation, or collaboration opportunities.
        </p>
      </motion.div>

      {/* Suggested questions */}
      <motion.div
        className="w-full max-w-md space-y-3"
        variants={containerVariants}
      >
        {suggestedQuestions.map((question, index) => (
          <motion.button
            key={index}
            className="bg-accent hover:bg-accent/80 flex w-full items-center rounded-lg px-4 py-3 transition-colors"
            onClick={() => submitQuery(question.text)}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="bg-background mr-3 rounded-full p-2">
              {question.icon}
            </span>
            <span className="text-left">{question.text}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ChatLanding;
