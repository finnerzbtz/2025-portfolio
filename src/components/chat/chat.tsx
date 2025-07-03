'use client';
import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

// Component imports
import ChatBottombar from '@/components/chat/chat-bottombar';
import ChatLanding from '@/components/chat/chat-landing';
import ChatMessageContent from '@/components/chat/chat-message-content';
import { SimplifiedChatView } from '@/components/chat/simple-chat-view';
import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import WelcomeModal from '@/components/welcome-modal';
import { Info } from 'lucide-react';
import HelperBoost from './HelperBoost';

// Define Avatar component props interface
interface AvatarProps {
  hasActiveTool: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isTalking: boolean;
}

// Simple Avatar component to avoid hydration issues
const Avatar = ({ hasActiveTool, videoRef, isTalking }: AvatarProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center rounded-full h-28 w-28">
        <div className="h-full w-full scale-[1.8] bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
        </div>
      </div>
    );
  }

      return (
        <div
      className={`flex items-center justify-center rounded-full transition-all duration-200 ${hasActiveTool ? 'h-20 w-20' : 'h-28 w-28'}`}
        >
          <div
            className="relative cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
        <div className="h-full w-full scale-[1.8] bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
        </div>
          </div>
        </div>
      );
};

const MOTION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: {
    duration: 0.3,
  },
};

const Chat = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query');
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [videoState, setVideoState] = useState<'playing' | 'paused' | 'loading'>('paused');
  const [showContentVideo, setShowContentVideo] = useState(false);
  const contentVideoRef = useRef<HTMLVideoElement | null>(null);
  const [showPresentationBackground, setShowPresentationBackground] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    setMessages,
    setInput,
    reload,
    addToolResult,
    append,
  } = useChat({
    onResponse: (response) => {
      if (response) {
        setLoadingSubmit(false);
        setIsTalking(true);
      }
    },
    onFinish: () => {
      setLoadingSubmit(false);
      setIsTalking(false);
    },
    onError: (error) => {
      setLoadingSubmit(false);
      setIsTalking(false);
      toast.error(`Error: ${error.message}`);
    },
    onToolCall: (tool) => {
      const toolName = tool.toolCall.toolName;
    },
  });

  // Separate the message calculation from side effects
  const { currentAIMessage, latestUserMessage, hasActiveTool } = useMemo(() => {
    // Use reverse() and find() instead of findLastIndex which may not exist
    const reverseMessages = [...messages].reverse();
    const latestAIMessage = reverseMessages.find((m) => m.role === 'assistant');
    const latestUserMessage = reverseMessages.find((m) => m.role === 'user');
    
    const latestAIMessageIndex = latestAIMessage ? messages.indexOf(latestAIMessage) : -1;
    const latestUserMessageIndex = latestUserMessage ? messages.indexOf(latestUserMessage) : -1;

    const result = {
      currentAIMessage: latestAIMessage || null,
      latestUserMessage: latestUserMessage || null,
      hasActiveTool: false,
    };

    if (result.currentAIMessage) {
      result.hasActiveTool =
        result.currentAIMessage.parts?.some(
          (part) =>
            part.type === 'tool-invocation' &&
            part.toolInvocation?.state === 'result'
        ) || false;
    }

    if (latestAIMessageIndex < latestUserMessageIndex) {
      result.currentAIMessage = null;
    }

    return result;
  }, [messages]);

  // Handle video and background state separately with useEffect to prevent feedback loops
  useEffect(() => {
    const hasContentTool = currentAIMessage?.parts?.some(
      (part) =>
        part.type === 'tool-invocation' &&
        part.toolInvocation?.state === 'result' &&
        part.toolInvocation?.toolName === 'getContent'
    ) || false;

    if (hasContentTool !== showContentVideo) {
      setShowContentVideo(hasContentTool);
    }
  }, [currentAIMessage?.parts, showContentVideo]);

  useEffect(() => {
    const hasPresentationTool = currentAIMessage?.parts?.some(
      (part) =>
        part.type === 'tool-invocation' &&
        part.toolInvocation?.state === 'result' &&
        part.toolInvocation?.toolName === 'getPresentation'
    ) || false;

    if (hasPresentationTool !== showPresentationBackground) {
      setShowPresentationBackground(hasPresentationTool);
    }
  }, [currentAIMessage?.parts, showPresentationBackground]);

  const isToolInProgress = messages.some(
    (m) =>
      m.role === 'assistant' &&
      m.parts?.some(
        (part) =>
          part.type === 'tool-invocation' &&
          part.toolInvocation?.state === 'partial-call'
      )
  );

  const submitQuery = useCallback((query: string) => {
    if (!query.trim() || isToolInProgress) {
      return;
    }

    setLoadingSubmit(true);
    setIsTalking(false);
    append({
      role: 'user',
      content: query,
    });
  }, [append, isToolInProgress]);

  // Optimized video control function
  const controlVideo = useCallback((shouldPlay: boolean) => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (shouldPlay && video.paused) {
        video.play();
        setVideoState('playing');
      } else if (!shouldPlay && !video.paused) {
        video.pause();
        setVideoState('paused');
      }
    } catch (error) {
      // Silently handle video control errors
    }
  }, []);

  // Control content video
  useEffect(() => {
    const video = contentVideoRef.current;
    if (!video) return;

    if (showContentVideo) {
      try {
        video.currentTime = 0;
        video.play();
      } catch (error) {
        // Silently handle errors
      }
    }
  }, [showContentVideo]);

  // Video setup effect - only runs once
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
  }, []);

  // Auto-submit initial query
  useEffect(() => {
    if (initialQuery && !autoSubmitted) {
      submitQuery(initialQuery);
      setAutoSubmitted(true);
    }
  }, [initialQuery, autoSubmitted, submitQuery]);

  // Debounced video control based on talking state
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      controlVideo(isTalking);
    }, 100); // Small delay to prevent rapid state changes

    return () => clearTimeout(timeoutId);
  }, [isTalking, controlVideo]);

  //@ts-ignore
  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isToolInProgress) return;
    submitQuery(input);
    setInput('');
  };

  const handleStop = () => {
    stop();
    setLoadingSubmit(false);
    setIsTalking(false);
  };

  // Check if this is the initial empty state (no messages)
  const isEmptyState =
    !currentAIMessage && !latestUserMessage && !loadingSubmit;

  // Calculate header height based on hasActiveTool
  const headerHeight = hasActiveTool ? 100 : 180;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Content Video */}
      {showContentVideo && (
        <div className="fixed inset-0 z-0">
          <video
            ref={contentVideoRef}
            className="w-full h-full object-cover"
            style={{
              filter: 'blur(8px) brightness(0.3)',
              transform: 'scale(1.1)', // Slight scale to hide blur edges
            }}
            onEnded={() => setShowContentVideo(false)}
          >
            <source src="/Barz in Carz - Eva Lazarus.mp4" type="video/mp4" />
          </video>
          {/* Overlay to ensure content is readable */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Background Presentation Image */}
      {showPresentationBackground && (
        <div className="fixed inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(/finley-howard.jpg)',
              filter: 'blur(12px) brightness(0.4) saturate(1.2)',
              transform: 'scale(1.1)', // Slight scale to hide blur edges
            }}
          />
          {/* Overlay to ensure content is readable */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* All chat interface elements with higher z-index */}
      <div className="relative z-10 h-full">
        <div className="absolute top-6 right-8 z-20 flex flex-col-reverse items-center justify-center gap-1 md:flex-row">
        <WelcomeModal
          trigger={
              <div className="hover:bg-accent/50 cursor-pointer rounded-2xl px-3 py-1.5 backdrop-blur-sm transition-all duration-200 ease-in-out hover:shadow-sm">
              <Info className="text-accent-foreground h-8" />
            </div>
          }
        />

      </div>

      {/* Fixed Avatar Header with Gradient */}
      <div
          className="fixed top-0 right-0 left-0 z-15"
        style={{
            background: showContentVideo || showPresentationBackground
              ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%)'
              : 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)',
        }}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${hasActiveTool ? 'pt-6 pb-0' : 'py-6'}`}
        >
          <div className="flex justify-center">
              <Avatar
                hasActiveTool={hasActiveTool}
                videoRef={videoRef}
                isTalking={isTalking}
              />
          </div>

            {latestUserMessage && !currentAIMessage && (
              <div className="mx-auto flex max-w-3xl px-4">
                <ChatBubble variant="sent" className={`${showPresentationBackground ? 'bg-white/85 backdrop-blur-xl rounded-2xl shadow-sm border border-white/20' : ''}`}>
                  <ChatBubbleMessage>
                    <ChatMessageContent
                      message={latestUserMessage}
                      isLast={true}
                      isLoading={false}
                      reload={() => Promise.resolve(null)}
                    />
                  </ChatBubbleMessage>
                </ChatBubble>
              </div>
            )}
        </div>
      </div>

      {/* Main Content Area */}
        <div className="container mx-auto flex h-full max-w-3xl flex-col relative z-10">
        {/* Scrollable Chat Content */}
        <div
          className="flex-1 overflow-y-auto px-2 hide-scrollbar"
          style={{ 
            paddingTop: `${headerHeight}px`,
            paddingBottom: '100px',
            marginBottom: '-60px',
            maskImage: 'linear-gradient(to bottom, black 0%, black 70%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.3) 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.3) 90%, transparent 100%)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
            {isEmptyState ? (
              <div className="flex min-h-full items-center justify-center">
                <ChatLanding submitQuery={submitQuery} showPresentationBackground={showPresentationBackground} />
              </div>
            ) : currentAIMessage ? (
              <div className="pb-4">
                <SimplifiedChatView
                  message={currentAIMessage}
                  isLoading={isLoading}
                  reload={reload}
                  addToolResult={addToolResult}
                  showPresentationBackground={showPresentationBackground}
                />
              </div>
            ) : (
              loadingSubmit && (
                <div className="px-4 pt-18">
                  <ChatBubble variant="received" className={`${showPresentationBackground ? 'bg-white/85 backdrop-blur-xl rounded-2xl shadow-sm border border-white/20' : ''}`}>
                    <ChatBubbleMessage isLoading />
                  </ChatBubble>
                </div>
              )
            )}
        </div>

        {/* Fixed Bottom Bar */}
        <div className="sticky bottom-0 px-2 pt-3 md:px-0 md:pb-4 z-15">
          <div className="relative flex flex-col items-center gap-3">
            <HelperBoost submitQuery={submitQuery} setInput={setInput} />
            <ChatBottombar
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={onSubmit}
              isLoading={isLoading}
              stop={handleStop}
              isToolInProgress={isToolInProgress}
            />
          </div>
        </div>
          
        <a
          href="https://x.com/toukoumcode"
          target="_blank"
          rel="noopener noreferrer"
            className="fixed right-3 bottom-0 z-20 mb-4 hidden cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm hover:underline md:block"
        >
          @toukoum
        </a>
        </div>
      </div>
    </div>
  );
};

export default Chat;
