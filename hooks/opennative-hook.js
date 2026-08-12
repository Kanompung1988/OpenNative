#!/usr/bin/env node

/**
 * OpenNative Lifecycle Hook for Claude Code / Codex Plugin Marketplace
 * Runs on non-interactive shell execution to ensure OpenNative skills
 * and sentinel protection rules are loaded automatically.
 */

function main() {
  const event = process.env.CLAUDE_EVENT || 'session_start';
  
  if (event === 'session_start') {
    process.stdout.write(JSON.stringify({
      status: 'active',
      plugin: 'opennative',
      message: '🌐 OpenNative Native-Language Layer active.'
    }) + '\n');
  }
}

main();
