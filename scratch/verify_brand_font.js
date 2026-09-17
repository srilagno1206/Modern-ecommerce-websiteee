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

      // 1. Capture Top Navbar
      setTimeout(() => {
        const shot1 = send('Page.captureScreenshot', { format: 'png' });
        ws.onmessage = (e) => {
          const res = JSON.parse(e.data);
          if (res.id === shot1 && res.result && res.result.data) {
            fs.writeFileSync('c:\\Users\\srila\\OneDrive\\Documents\\ecom\\brand_navbar.png', Buffer.from(res.result.data, 'base64'));
            console.log('Saved brand_navbar.png');

            // 2. Scroll to Scene 06 brand reveal
            send('Runtime.evaluate', { expression: 'window.scrollTo(0, 2600);' });

            setTimeout(() => {
              const shot2 = send('Page.captureScreenshot', { format: 'png' });
              ws.onmessage = (e2) => {
                const res2 = JSON.parse(e2.data);
                if (res2.id === shot2 && res2.result && res2.result.data) {
                  fs.writeFileSync('c:\\Users\\srila\\OneDrive\\Documents\\ecom\\brand_scene06.png', Buffer.from(res2.result.data, 'base64'));
                  console.log('Saved brand_scene06.png');

                  // 3. Scroll to Footer
                  send('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight);' });

                  setTimeout(() => {
                    const shot3 = send('Page.captureScreenshot', { format: 'png' });
                    ws.onmessage = (e3) => {
                      const res3 = JSON.parse(e3.data);
                      if (res3.id === shot3 && res3.result && res3.result.data) {
                        fs.writeFileSync('c:\\Users\\srila\\OneDrive\\Documents\\ecom\\brand_footer.png', Buffer.from(res3.result.data, 'base64'));
                        console.log('Saved brand_footer.png');
                        chrome.kill();
                        process.exit(0);
                      }
                    };
                  }, 1200);
                }
              };
            }, 1200);
          }
        };
      }, 1500);
    };
  } catch (err) {
    console.error('Error:', err);
    chrome.kill();
    process.exit(1);
  }
}, 1500);
