import { Agent } from '@mastra/core/agent';

export const writerAgent = new Agent({
  id: 'writer',
  name: 'Writer',
  description: 'Writes polished content from research notes.',
  instructions: 'You are a writer. Take the provided research notes and turn them into a short, well-written paragraph. Keep it under 100 words.',
  model: 'openai/gpt-4o-mini',
});
