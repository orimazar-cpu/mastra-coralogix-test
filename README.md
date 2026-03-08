# Mastra Coralogix Integration Test

Test project demonstrating Mastra's multi-agent capabilities with Coralogix observability.

## Quick Start

### 1. Clone this repo
```bash
git clone https://github.com/YOUR_USERNAME/mastra-coralogix-test.git
cd mastra-coralogix-test
```

### 2. Run setup script
```bash
./setup.sh
```
This clones the [Mastra fork with Coralogix integration](https://github.com/Neruay/mastra/tree/add-coralogix-integration), builds it, and installs dependencies.

### 3. Configure credentials
```bash
cp coralogix-multiagent-test/.env.example coralogix-multiagent-test/.env
```
Edit `.env` with:
- `CX_TOKEN` - Your Coralogix Send-Your-Data API key
- `CX_ENDPOINT` - Your Coralogix ingress endpoint (e.g., `ingress.eu2.coralogix.com:443`)
- `OPENAI_API_KEY` - Your OpenAI API key

### 4. Run the test
```bash
cd coralogix-multiagent-test
npx tsx run.ts
```

### 5. View traces
Check your Coralogix APM for traces with:
- `invoke_agent Coordinator` - Root span
- `model_generation` - LLM calls  
- `tool_call` - Tool executions

## What This Tests

A **coordinator agent** orchestrates two sub-agents:
- **Researcher** - Gathers facts about a topic
- **Writer** - Transforms research into polished content

All interactions are traced and exported to Coralogix using OpenTelemetry GenAI semantic conventions.

## Project Structure

```
├── setup.sh                     # Setup script (run this first)
├── coralogix-multiagent-test/   # Test application
│   ├── run.ts                   # Entry point
│   ├── src/mastra/              # Agent definitions
│   └── .env.example             # Environment template
└── mastra-fork/                 # (Created by setup.sh - not in repo)
```

## Requirements

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- OpenAI API key
- Coralogix account

## Updating the Fork

To get the latest Coralogix exporter changes:
```bash
cd mastra-fork
git pull origin add-coralogix-integration
pnpm install --no-frozen-lockfile
pnpm --filter @mastra/coralogix build
```

## About

This tests [Neruay's Mastra fork](https://github.com/Neruay/mastra/tree/add-coralogix-integration) which adds a dedicated Coralogix observability exporter with:
- OpenTelemetry GenAI semantic conventions
- Flat span structure for cleaner traces
- Automatic token usage aggregation
- Bridge mode for nested agent trace propagation
