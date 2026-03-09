import { Mastra } from '@mastra/core';
import { Observability } from '@mastra/observability';
import { CoralogixExporter } from '@mastra/coralogix';
import { coordinatorAgent, researcherAgent, writerAgent } from './agents';

export const mastra = new Mastra({
  agents: {
    coordinatorAgent,
    researcherAgent,
    writerAgent,
  },
  observability: new Observability({
    configs: {
      default: {
        serviceName: 'mastra-multiagent-test',
        bridge: new CoralogixExporter({
          applicationName: 'multiagent-test',
          subsystemName: 'mastra',
        }),
      },
    },
  }),
});
