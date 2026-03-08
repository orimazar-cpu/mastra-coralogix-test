#!/bin/bash
set -e

echo "=========================================="
echo "Mastra Coralogix Integration - Setup"
echo "=========================================="
echo ""

# Check for pnpm
if ! command -v pnpm &> /dev/null; then
    echo "ERROR: pnpm is required but not installed."
    echo "Install it with: npm install -g pnpm"
    exit 1
fi

# Clone the Mastra fork if it doesn't exist
if [ ! -d "mastra-fork" ]; then
    echo "[1/4] Cloning Mastra fork with Coralogix integration..."
    git clone -b add-coralogix-integration https://github.com/Neruay/mastra.git mastra-fork
else
    echo "[1/4] Mastra fork already exists, pulling latest..."
    cd mastra-fork
    git pull origin add-coralogix-integration
    cd ..
fi

echo ""
echo "[2/4] Installing Mastra fork dependencies..."
cd mastra-fork
pnpm install --no-frozen-lockfile
echo ""

echo "[3/4] Building required Mastra packages (this may take a few minutes)..."
pnpm turbo run build --filter=@mastra/coralogix...
cd ..

echo ""
echo "[4/4] Installing test project dependencies..."
cd coralogix-multiagent-test
npm install
cd ..

echo ""
echo "=========================================="
echo "Setup complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Configure your credentials:"
echo "   cp coralogix-multiagent-test/.env.example coralogix-multiagent-test/.env"
echo "   # Edit .env with your CX_TOKEN, CX_ENDPOINT, and OPENAI_API_KEY"
echo ""
echo "2. Run the test:"
echo "   cd coralogix-multiagent-test"
echo "   npx tsx run.ts"
echo ""
echo "3. Check Coralogix APM for traces!"
