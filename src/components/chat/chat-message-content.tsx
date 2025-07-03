'use client';

import { Message } from 'ai/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, memo, useMemo } from 'react';

export type ChatMessageContentProps = {
  message: Message;
  isLast?: boolean;
  isLoading?: boolean;
  reload?: () => Promise<string | null | undefined>;
  addToolResult?: (args: { toolCallId: string; result: string }) => void;
  skipToolRendering?: boolean;
};

const CodeBlock = memo(({ content }: { content: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Memoize code processing
  const { language, code, previewLines, hasMoreLines } = useMemo(() => {
    const firstLineBreak = content.indexOf('\n');
    const firstLine = content.substring(0, firstLineBreak).trim();
    const language = firstLine || 'text';
    const code = firstLine ? content.substring(firstLineBreak + 1) : content;
    const previewLines = code.split('\n').slice(0, 1).join('\n');
    const hasMoreLines = code.split('\n').length > 1;
    
    return { language, code, previewLines, hasMoreLines };
  }, [content]);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="my-4 w-full overflow-hidden rounded-md"
    >
      <div className="bg-secondary text-secondary-foreground flex items-center justify-between rounded-t-md border-b px-4 py-1">
        <span className="text-xs">
          {language !== 'text' ? language : 'Code'}
        </span>
        <CollapsibleTrigger className="hover:bg-secondary/80 rounded p-1">
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
      </div>

      <div className="bg-accent/80 text-accent-foreground rounded-b-md">
        {!isOpen && hasMoreLines ? (
          <pre className="px-4 py-3">
            <code className="text-sm">{previewLines + '\n...'}</code>
          </pre>
        ) : (
          <CollapsibleContent>
            <div className="custom-scrollbar" style={{ overflowX: 'auto' }}>
              <pre className="min-w-max px-4 py-3">
                <code className="text-sm whitespace-pre">{code}</code>
              </pre>
            </div>
          </CollapsibleContent>
        )}
      </div>
    </Collapsible>
  );
});

CodeBlock.displayName = 'CodeBlock';

// Memoized markdown components to prevent re-creation on every render
const markdownComponents = {
  p: ({ children }: any) => (
    <p className="break-words whitespace-pre-wrap">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="my-4 list-disc pl-6">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="my-4 list-decimal pl-6">{children}</ol>
  ),
  li: ({ children }: any) => <li className="my-1">{children}</li>,
  a: ({ href, children }: any) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {children}
    </a>
  ),
};

// Simplified text content renderer - removed deferred value for immediate updates
const TextContent = memo(({ content }: { content: string }) => {
  return (
    <div className="prose dark:prose-invert w-full">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </Markdown>
    </div>
  );
});

TextContent.displayName = 'TextContent';

// Memoized content part renderer
const ContentPart = memo(({ part, partIndex }: { part: any, partIndex: number }) => {
  // Memoize content splitting to avoid recalculating on every render
  const contentParts = useMemo(() => {
    if (part.type !== 'text' || !part.text) return [];
    return part.text.split('```');
  }, [part.text, part.type]);

  if (part.type !== 'text' || !part.text) return null;

  return (
    <div key={partIndex} className="w-full space-y-4">
      {contentParts.map((content: string, i: number) =>
        i % 2 === 0 ? (
          // Regular text content
          <TextContent key={`text-${i}`} content={content} />
        ) : (
          // Code block content
          <CodeBlock key={`code-${i}`} content={content} />
        )
      )}
    </div>
  );
});

ContentPart.displayName = 'ContentPart';

const ChatMessageContent = memo(function ChatMessageContent({
  message,
}: ChatMessageContentProps) {
  // Memoize the parts to avoid recalculating
  const messageParts = useMemo(() => message.parts || [], [message.parts]);

  // Only handle text parts
  const renderContent = () => {
    return messageParts.map((part, partIndex) => (
      <ContentPart key={partIndex} part={part} partIndex={partIndex} />
    ));
  };

  return <div className="w-full">{renderContent()}</div>;
}, (prevProps, nextProps) => {
  // Less strict comparison to allow streaming updates
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.message.content === nextProps.message.content &&
    prevProps.isLoading === nextProps.isLoading
  );
});

export default ChatMessageContent;
