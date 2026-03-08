import { Agent } from '@mastra/core/agent';

export const researcherAgent = new Agent({
  id: 'researcher',
  name: 'Researcher',
  description: 'Gathers quick facts and key points about a topic.',
  instructions: 'You are a research assistant. When given a topic, provide 3-5 concise bullet points of key facts. Be brief and factual.',
  model: 'openai/gpt-4o-mini',
});
