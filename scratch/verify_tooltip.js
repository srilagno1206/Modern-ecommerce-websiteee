import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9222',
  '--remote-allow-origins=*',
  '--window-size=1440,900',
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

      setTimeout(async () => {
        // Find instagram icon and dispatch mouseenter
        send('Runtime.evaluate', {
          expression: `
            const el = document.querySelector('aside[aria-label="Social Media Channels"] a[aria-label="Instagram"]');
            if (el) {
              const parent = el.parentElement;
              parent.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            }
          `
        });

        setTimeout(() => {
          const shotTooltip = send('Page.captureScreenshot', { format: 'png' });

          ws.onmessage = (e) => {
            const res = JSON.parse(e.data);
            if (res.id === shotTooltip && res.result && res.result.data) {
              fs.writeFileSync('c:\\Users\\srila\\OneDrive\\Documents\\ecom\\social_tooltip.png', Buffer.from(res.result.data, 'base64'));
              console.log('Saved social_tooltip.png');
              ws.close();
              chrome.kill();
              process.exit(0);
            }
          };
        }, 500);
      }, 1500);
    };
  } catch (err) {
    console.error('CDP Error:', err);
    chrome.kill();
    process.exit(1);
  }
}, 1200);
