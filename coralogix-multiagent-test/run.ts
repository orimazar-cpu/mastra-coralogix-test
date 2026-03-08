import 'dotenv/config';
import { mastra } from './src/mastra/index.js';

async function main() {
  console.log('Starting multi-agent test with Coralogix telemetry...\n');

  const coordinator = mastra.getAgent('coordinatorAgent');

  console.log('Asking coordinator to research and write about TypeScript...\n');

  const result = await coordinator.generate(
    'Tell me about TypeScript and why developers love it.'
  );

  console.log('=== Final Result ===');
  console.log(result.text);
  console.log('\n=== Done ===');

  console.log('\nFlushing telemetry...');
  const observability = mastra.observability;
  const instance = observability.getDefaultInstance();
  if (instance && typeof instance.flush === 'function') {
    await instance.flush();
    console.log('Flush completed!');
    // Wait a bit for async network operations to complete
    console.log('Waiting for network...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  } else {
    await observability.shutdown();
    console.log('Shutdown completed!');
  }

  console.log('Check Coralogix for traces!');
}

main().catch(console.error);
