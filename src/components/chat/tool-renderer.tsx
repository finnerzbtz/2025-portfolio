// src/components/chat/tool-renderer.tsx
import React, { memo } from 'react';
import { Contact } from '../contact';
import Crazy from '../crazy';
import InternshipCard from '../InternshipCard';
import { Presentation } from '../presentation';
import AllProjects from '../projects/AllProjects';
import Resume from '../resume';
import Skills from '../skills';
import Sports from '../sport';
import Automation from '../automation';
import Content from '../content';

interface ToolRendererProps {
  toolInvocations: any[];
  messageId: string;
}

const ToolRenderer = memo(function ToolRenderer({
  toolInvocations,
  messageId,
}: ToolRendererProps) {
  return (
    <div className="w-full transition-all duration-300">
      {toolInvocations.map((tool) => {
        const { toolCallId, toolName } = tool;

        // Return specialized components based on tool name
        switch (toolName) {
          case 'getProjects':
            return (
              <div
                key={toolCallId}
                className="w-full overflow-hidden rounded-lg"
              >
                <AllProjects />
              </div>
            );

          case 'getPresentation':
            return (
              <div
                key={toolCallId}
                className="w-full overflow-hidden rounded-lg"
              >
                <Presentation />
              </div>
            );

          case 'getResume':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Resume />
              </div>
            );

          case 'getContact':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Contact />
              </div>
            );

          case 'getSkills':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Skills />
              </div>
            );

          case 'getAutomation':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Automation />
              </div>
            );

          case 'getContent':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Content />
              </div>
            );

          case 'getSports':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Sports />
              </div>
            );

          case 'getCrazy':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Crazy />
              </div>
            );

          case 'getInternship':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <InternshipCard />
              </div>
            );

          // Default renderer for other tools
          default:
            return (
              <div
                key={toolCallId}
                className="bg-secondary/10 w-full rounded-lg p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-medium">{toolName}</h3>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-100">
                    Tool Result
                  </span>
                </div>
                <div className="mt-2">
                  {typeof tool.result === 'object' ? (
                    <pre className="bg-secondary/20 overflow-x-auto rounded p-3 text-sm">
                      {JSON.stringify(tool.result, null, 2)}
                    </pre>
                  ) : (
                    <p>{String(tool.result)}</p>
                  )}
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if the tool invocations actually changed
  if (prevProps.toolInvocations.length !== nextProps.toolInvocations.length) {
    return false;
  }
  
  // Check if any tool invocation changed
  for (let i = 0; i < prevProps.toolInvocations.length; i++) {
    const prevTool = prevProps.toolInvocations[i];
    const nextTool = nextProps.toolInvocations[i];
    
    if (prevTool?.toolCallId !== nextTool?.toolCallId || 
        prevTool?.toolName !== nextTool?.toolName) {
      return false;
    }
  }
  
  return prevProps.messageId === nextProps.messageId;
});

export default ToolRenderer;
