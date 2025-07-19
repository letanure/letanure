#!/bin/bash

# Setup script to install git hooks
echo "🔧 Setting up git hooks..."

# Create .git/hooks directory if it doesn't exist
mkdir -p .git/hooks

# Copy pre-push hook
cp .githooks/pre-push .git/hooks/pre-push
chmod +x .git/hooks/pre-push

echo "✅ Git hooks installed successfully!"
echo ""
echo "The following hooks are now active:"
echo "  - pre-push: Runs build and page accessibility tests before pushing"
echo ""
echo "To run tests manually:"
echo "  npm run test:pages  # Page accessibility tests"
echo "  npm run test        # All tests"
echo "  npm run test:watch  # Watch mode for development"