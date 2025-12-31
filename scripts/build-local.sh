#!/bin/bash
# Build script for local development - uses tar file

echo "🔨 Building @balanceui/core package..."
cd "$(dirname "$0")/.."
npm run build

echo "📦 Creating tar package..."
npm pack

echo "📥 Installing local package in website..."
cd website
npm install ../balanceui-core-*.tgz --save

echo "✅ Local build complete! Package installed from tar file."

