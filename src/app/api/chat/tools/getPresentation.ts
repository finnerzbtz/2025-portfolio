import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'This tool returns a concise personal introduction of Finley Howard. It is used to answer the question "Who are you?" or "Tell me about yourself"',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "I'm Finley Howard, a 24-year-old AI specialist from Manchester. I'm passionate about AI, tech, Entrepreneurship and SaaS tech.",
    };
  },
});
