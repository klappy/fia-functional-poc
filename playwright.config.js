import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', testMatch: '**/*.spec.js', fullyParallel: false, workers: 1,
  use: { baseURL: 'http://127.0.0.1:4173', viewport: { width: 390, height: 844 }, headless: true, reducedMotion: 'reduce' },
  webServer: [{command:'node scripts/test-spanish-upgrade-server.mjs',url:'http://127.0.0.1:4795',reuseExistingServer:!process.env.CI}, { command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI }, {command:'node scripts/test-offline-server.mjs',url:'http://127.0.0.1:4185',reuseExistingServer:!process.env.CI}],
  reporter: [['list']],
});
