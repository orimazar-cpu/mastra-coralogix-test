import { Mastra } from '@mastra/core';
import { Observability } from '@mastra/observability';
import { coordinatorAgent, researcherAgent, writerAgent } from './agents';
import { CoralogixExporter } from '@mastra/coralogix';

const cxToken = process.env.CX_TOKEN;
const cxEndpoint = process.env.CX_ENDPOINT;

export const mastra = new Mastra({
  agents: {
    coordinatorAgent,
    researcherAgent,
    writerAgent,
  },
  observability: new Observability({
    configs: {
      default: {
        serializationOptions: {
          maxStringLength: 100000, // increase from default 1024
          },
        serviceName: 'mastra-multiagent-test',
        exporters: [new CoralogixExporter({
          applicationName: 'ori-mastra-test',
          subsystemName: 'ori-mastra-test',
          debug: true,
        }),]
      },
    },
  }),
});