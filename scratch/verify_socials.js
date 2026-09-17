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

      // Wait 1.5s for initial render
      setTimeout(() => {
        // 1. Capture Social Sidebar on screen
        const shot1 = send('Page.captureScreenshot', { format: 'png' });
        
        let footerShotId = null;

        ws.onmessage = (e) => {
          const res = JSON.parse(e.data);
          if (res.id === shot1 && res.result && res.result.data) {
            fs.writeFileSync('c:\\Users\\srila\\OneDrive\\Documents\\ecom\\social_sidebar.png', Buffer.from(res.result.data, 'base64'));
            console.log('Saved social_sidebar.png');

            // 2. Scroll to Footer
            send('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight);' });

            setTimeout(() => {
              footerShotId = send('Page.captureScreenshot', { format: 'png' });
            }, 1000);
          } else if (res.id === footerShotId && res.result && res.result.data) {
            fs.writeFileSync('c:\\Users\\srila\\OneDrive\\Documents\\ecom\\social_footer.png', Buffer.from(res.result.data, 'base64'));
            console.log('Saved social_footer.png');

            setTimeout(() => {
              ws.close();
              chrome.kill();
              process.exit(0);
            }, 300);
          }
        };
      }, 1500);
    };
  } catch (err) {
    console.error('CDP Error:', err);
    chrome.kill();
    process.exit(1);
  }
}, 1200);
