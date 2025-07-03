'use client';

import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import { ChatRequestOptions } from 'ai';
import { Message } from 'ai/react';
import ChatMessageContent from './chat-message-content';
import ToolRenderer from './tool-renderer';

interface SimplifiedChatViewProps {
  message: Message;
  isLoading: boolean;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  addToolResult?: (args: { toolCallId: string; result: string }) => void;
  showPresentationBackground?: boolean;
}

export const SimplifiedChatView = memo(function SimplifiedChatView({
  message,
  isLoading,
  reload,
  addToolResult,
  showPresentationBackground = false,
}: SimplifiedChatViewProps) {
  if (message.role !== 'assistant') return null;

  // State to track stable tool rendering
  const [stableTools, setStableTools] = useState<any[]>([]);
  const [isToolStable, setIsToolStable] = useState(false);
  const stabilityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Extract tool invocations that are in "result" state - use useMemo to prevent recalculation
  const toolInvocations = useMemo(() => {
    return message.parts
      ?.filter(
        (part) =>
          part.type === 'tool-invocation' &&
          part.toolInvocation?.state === 'result'
      )
      .map((part) =>
        part.type === 'tool-invocation' ? part.toolInvocation : null
      )
      .filter(Boolean) || [];
  }, [message.parts]);

  // Only display the first tool (if any)
  const currentTool = useMemo(() => {
    return toolInvocations.length > 0 ? [toolInvocations[0]] : [];
  }, [toolInvocations]);

  // Debounce tool rendering to prevent jitter during streaming (but less aggressive)
  useEffect(() => {
    if (stabilityTimeoutRef.current) {
      clearTimeout(stabilityTimeoutRef.current);
    }

    // Much shorter delays to maintain responsiveness
    if (currentTool.length > 0 && (!isLoading || !isToolStable)) {
      stabilityTimeoutRef.current = setTimeout(() => {
        setStableTools(currentTool);
        setIsToolStable(true);
      }, isLoading ? 150 : 50); // Reduced from 500ms/100ms to 150ms/50ms
    } else if (currentTool.length === 0) {
      // Immediately clear tools if none present
      setStableTools([]);
      setIsToolStable(false);
    }

    return () => {
      if (stabilityTimeoutRef.current) {
        clearTimeout(stabilityTimeoutRef.current);
      }
    };
  }, [currentTool, isLoading, isToolStable]);

  // Use the message content directly for immediate streaming feel
  const hasTextContent = useMemo(() => message.content.trim().length > 0, [message.content]);
  const hasTools = stableTools.length > 0;

  // Check if this is the content tool for styling
  const isContentTool = stableTools.length > 0 && stableTools[0]?.toolName === 'getContent';
  
  // Determine if we need soft backgrounds
  const needsSoftBackground = isContentTool || showPresentationBackground;

  return (
    <div className="flex h-full w-full flex-col px-4">
      {/* Single scrollable container for both tool and text content */}
      <div className="custom-scrollbar flex h-full w-full flex-col overflow-y-auto">
        {/* Tool invocation result - displayed at the top */}
        {hasTools && (
          <div className={`mb-4 w-full ${needsSoftBackground ? 'bg-white/85 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-white/20' : ''}`}>
            <ToolRenderer
              toolInvocations={stableTools}
              messageId={message.id || 'current-msg'}
            />
          </div>
        )}

        {/* Text content - now updates immediately for streaming feel */}
        {hasTextContent && (
          <div className="w-full">
            <ChatBubble variant="received" className={`w-full ${needsSoftBackground ? 'bg-white/85 backdrop-blur-xl rounded-2xl shadow-sm border border-white/20' : ''}`}>
              <ChatBubbleMessage className="w-full">
                <ChatMessageContent
                  message={message}
                  isLast={true}
                  isLoading={isLoading}
                  reload={reload}
                  addToolResult={addToolResult}
                  skipToolRendering={true}
                />
              </ChatBubbleMessage>
            </ChatBubble>
          </div>
        )}

        {/* Add some padding at the bottom for better scrolling experience */}
        <div className="pb-4"></div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // More lenient comparison to allow streaming updates
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.showPresentationBackground === nextProps.showPresentationBackground &&
    // Only block re-render if content length hasn't changed significantly
    Math.abs(prevProps.message.content.length - nextProps.message.content.length) < 5
  );
});
