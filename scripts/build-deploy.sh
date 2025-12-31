#!/bin/bash
# Build script for deployment - uses npm package

echo "🚀 Building for deployment using npm package..."

cd "$(dirname "$0")/../website"

# Ensure we're using the npm package version
npm install @balanceui/core@latest --save

echo "✅ Deployment build ready! Using npm package."

