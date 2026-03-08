# Coralogix Multi-Agent Test

A test project demonstrating Mastra's multi-agent capabilities with Coralogix observability integration.

## What It Does

This project creates a **coordinator agent** that orchestrates two sub-agents:
- **Researcher Agent**: Gathers facts about a topic
- **Writer Agent**: Transforms research into polished content

All agent interactions are traced and exported to Coralogix using OpenTelemetry GenAI semantic conventions.

## Prerequisites

- Node.js 18+
- OpenAI API key
- Coralogix account with Send-Your-Data API key

## Installation

> **Note**: This project currently uses a local fork of Mastra with Coralogix integration. Once the fork is merged upstream, dependencies will be updated to use published npm packages.

```bash
npm install
```

## Configuration

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:
- `CX_TOKEN` - Coralogix Send-Your-Data API key
- `CX_ENDPOINT` - Coralogix ingress endpoint (e.g., `ingress.eu2.coralogix.com:443`)
- `OPENAI_API_KEY` - OpenAI API key (can also be set in shell)

## Usage

```bash
npx tsx run.ts
```

## Viewing Traces

After running, traces will appear in Coralogix APM within a few seconds. Look for:
- `invoke_agent Coordinator` - The root span
- `model_step` spans - LLM interactions
- `execute_tool` spans - Tool calls (research, write)

## Project Structure

```
├── run.ts                 # Entry point
├── src/mastra/
│   ├── index.ts           # Mastra configuration with Coralogix exporter
│   └── agents/
│       ├── coordinator.ts # Coordinator agent with tools
│       ├── researcher.ts  # Research agent
│       └── writer.ts      # Writer agent
```
