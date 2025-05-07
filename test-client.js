import { spawn } from 'child_process';
// Start the server process
const serverProcess = spawn('node', ['dist/index.js']);

serverProcess.stdout.on('data', (data) => {
  console.log(`Server Output: ${data.toString()}`);
});

serverProcess.stderr.on('data', (data) => {
  console.error(`Server Error: ${data.toString()}`);
});


const screenshotRequest = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: {
    name: "take_screenshot",
    arguments: {
      url: 'https://vite.dev/guide', 
      width: 1200, 
      height: 800, 
      fullPage: false, 
    }
  }
});

console.log('Sending request:', screenshotRequest);


serverProcess.stdin.write(screenshotRequest + '\n');
serverProcess.stdin.end();

serverProcess.on('exit', (code) => {
  console.log(`Server process exited with code: ${code}`);
});