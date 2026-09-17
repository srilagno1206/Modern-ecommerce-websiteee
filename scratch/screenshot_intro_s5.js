import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9222',
  '--remote-allow-origins=*',
  '--window-size=1440,1100',
  '--no-first-run',
  '--no-default-browser-check',
  'about:blank'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://localhost:9222/json/new?http://localhost:3000/', { method: 'PUT' });
    const page = await listRes.json();

    const ws = new WebSocket(page.webSocketDebuggerUrl);

    let msgId = 1;
    const send = (method, params = {}) => {
      const id = msgId++;
      ws.send(JSON.stringify({ id, method, params }));
      return id;
    };

    ws.onopen = () => {
      send('Runtime.enable');
      send('Page.enable');
      send('DOM.enable');

      // Scroll to Scene 05 in the intro timeline (approx 2100px)
      setTimeout(() => {
        send('Runtime.evaluate', {
          expression: `
            window.scrollTo(0, 2150);
          `
        });

        setTimeout(() => {
          const shotId = send('Page.captureScreenshot', { format: 'png' });
          ws.onmessage = (e) => {
            const res = JSON.parse(e.data);
            if (res.id === shotId && res.result && res.result.data) {
              fs.writeFileSync('c:\\Users\\srila\\OneDrive\\Documents\\ecom\\screenshot_intro_s5.png', Buffer.from(res.result.data, 'base64'));
              console.log('Saved screenshot_intro_s5.png');
              chrome.kill();
              process.exit(0);
            }
          };
        }, 1500);
      }, 1500);
    };
  } catch (err) {
    console.error('Error:', err);
    chrome.kill();
    process.exit(1);
  }
}, 1500);
