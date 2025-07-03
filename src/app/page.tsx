'use client';

import React from 'react';
import FluidCursor from '@/components/FluidCursor';
import { Button } from '@/components/ui/button';
import WelcomeModal from '@/components/welcome-modal';
import { TypeWriter } from '@/components/ui/typewriter';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Laugh,
  Layers,
  UserRoundSearch,
  Zap,
  Video,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';


/* ---------- quick-question data ---------- */
const questions = {
  Me: 'Who are you? Tell me about your background and experience.',
  Projects: 'What are your current projects? Show me your automation and AI work.',
  Skills: 'What are your technical skills? Tell me about n8n, AI, and development.',
  Automation: 'What automation systems have you built? Show me your n8n workflows.',
  Content: 'Tell me about your content creation work and viral videos.',
  Contact: 'How can I contact you for collaboration or opportunities?',
} as const;

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Automation', color: '#FF6B6B', icon: Zap },
  { key: 'Content', color: '#B95F9D', icon: Video },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const;

/* ---------- component ---------- */
export default function Home() {
  const [input, setInput] = useState('');
  const [descriptionComplete, setDescriptionComplete] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const goToChat = (query: string) =>
    router.push(`/chat?query=${encodeURIComponent(query)}`);

  /* hero animations - optimized for stability */
  const topElementVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };
  const bottomElementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  // Placeholder typing effect
  useEffect(() => {
    if (!descriptionComplete) return;

    const placeholderText = "Ask me about automation, AI, or content creation…";
    let currentIndex = 0;
    
    const timer = setInterval(() => {
      if (currentIndex <= placeholderText.length) {
        setPlaceholder(placeholderText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [descriptionComplete]);

  useEffect(() => {
    // No longer preloading memoji or related videos
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20">
      {/* big blurred footer word */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]"
          style={{ marginBottom: '-2.5rem' }}
        >
          Finley
        </div>
      </div>



      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => goToChat('Are you available for automation projects?')}
          className="cursor-pointer relative flex items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800"
        >
          {/* Blue pulse dot */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
          </span>
          available for projects
        </button>
      </div>

      {/* header */}
      <motion.div
        className="z-1 mb-8 flex flex-col items-center text-center md:mb-12 mt-24 md:mt-4"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="z-100">
          <WelcomeModal />
        </div>

        <h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
          Hey, I'm Finley Howard 👋
        </h2>
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          AI & Automation Specialist
        </h1>
        <div className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl notranslate" translate="no">
          <TypeWriter
            text="I build intelligent systems that transform workflows, create engaging content, and solve complex problems through innovative automation and AI integration. Specialising in education and media with n8n, AI APIs, and creative solutions."
            speed={25}
            startDelay={1200}
            onComplete={() => setDescriptionComplete(true)}
            cursor={true}
          />
        </div>
      </motion.div>

      {/* input + quick buttons */}
      <motion.div
        variants={bottomElementVariants}
        initial="hidden"
        animate="visible"
        className="z-10 mt-4 flex w-full flex-col items-center justify-center md:px-0"
      >
        {/* free-form question */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) goToChat(input.trim());
          }}
          className="relative w-full max-w-lg"
        >
          <div className="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Submit question"
              className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* quick-question grid */}
        <div className="mt-4 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {questionConfig.map(({ key, color, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => goToChat(questions[key])}
              variant="outline"
              className="shadow-none border-border hover:bg-border/30 aspect-square w-full cursor-pointer rounded-2xl border bg-white/30 py-8 backdrop-blur-lg active:scale-95 md:p-10"
            >
              <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-700">
                <Icon size={22} strokeWidth={2} color={color} />
                <span className="text-xs font-medium sm:text-sm">{key}</span>
              </div>
            </Button>
          ))}
        </div>
      </motion.div>
      <FluidCursor />
    </div>
  );
}
