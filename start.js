const { spawn } = require('child_process');
const path = require('path');

console.log('================================================================');
console.log('🚀 Starting SentiAI Retail Customer Experience & Recovery Agent');
console.log('================================================================');

// Start Backend on port 5000
const backendProcess = spawn('node', ['src/server.js'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Start Frontend on port 3000
const frontendProcess = spawn('npx', ['vite', '--port', '3000', '--host'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

backendProcess.on('error', (err) => {
  console.error('Backend process error:', err);
});

frontendProcess.on('error', (err) => {
  console.error('Frontend process error:', err);
});

process.on('SIGINT', () => {
  console.log('\nGracefully shutting down SentiAI services...');
  backendProcess.kill();
  frontendProcess.kill();
  process.exit();
});
