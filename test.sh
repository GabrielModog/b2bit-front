#!/usr/bin/env bash
set -euo pipefail

if [ ! -d node_modules ]; then
  npm ci
fi

npx playwright install --with-deps

export BASE_URL=${BASE_URL:-http://app}
export VITE_AUTH_MODE=local

npx playwright test