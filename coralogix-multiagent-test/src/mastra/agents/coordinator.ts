import { Agent } from '@mastra/core/agent';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { researcherAgent } from "./researcher";
import { writerAgent } from "./writer";

const researchTool = createTool({
  id: 'research',
  description: 'Research a topic and get key facts.',
  inputSchema: z.object({
    topic: z.string().describe('The topic to research'),
  }),
  outputSchema: z.object({
    facts: z.string().describe('Research findings'),
  }),
  execute: async ({ topic }) => {
    const result = await researcherAgent.generate(`Research: ${topic}`);
    return { facts: result.text };
  },
});

const writeTool = createTool({
  id: 'write',
  description: 'Write polished content from research notes.',
  inputSchema: z.object({
    notes: z.string().describe('Research notes to turn into content'),
  }),
  outputSchema: z.object({
    content: z.string().describe('Written content'),
  }),
  execute: async ({ notes }) => {
    const result = await writerAgent.generate(`Write about: ${notes}`);
    return { content: result.text };
  },
});

export const coordinatorAgent = new Agent({
  id: 'coordinator',
  name: 'Coordinator',
  description: 'Coordinates research and writing tasks.',
  instructions: `You are a coordinator that manages research and writing tasks.
When asked about a topic:
1. First use the research tool to gather facts
2. Then use the write tool to create polished content from those facts
Always use both tools in sequence and return the final written content.`,
  model: 'openai/gpt-4o-mini',
  tools: { researchTool, writeTool },
});
