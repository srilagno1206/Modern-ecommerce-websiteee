import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9222',
  '--remote-allow-origins=*',
  '--no-first-run',
  '--no-default-browser-check',
  'about:blank'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://localhost:9222/json/new?http://localhost:3000/', { method: 'PUT' });
    const page = await listRes.json();
    console.log('Opened page:', page.id);

    const ws = new WebSocket(page.webSocketDebuggerUrl);

    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
      ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('RUNTIME EXCEPTION:', JSON.stringify(msg.params.exceptionDetails, null, 2));
      }
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('CONSOLE:', msg.params.type, ...msg.params.args.map(a => a.value || a.description));
      }
      if (msg.method === 'Log.entryAdded') {
        console.log('LOG:', msg.params.entry.level, msg.params.entry.text);
      }
    };

    setTimeout(() => {
      chrome.kill();
      process.exit(0);
    }, 4000);
  } catch (err) {
    console.error('Error connecting to Chrome:', err);
    chrome.kill();
    process.exit(1);
  }
}, 1500);
