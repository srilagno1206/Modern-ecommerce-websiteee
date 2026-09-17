import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function standalonePlugin() {
  return {
    name: 'standalone-bundle-plugin',
    // In dev mode, dynamically serve the development template with live HMR
    transformIndexHtml(html, ctx) {
      if (ctx.server) {
        const devHtmlPath = path.resolve(__dirname, 'index.dev.html');
        if (fs.existsSync(devHtmlPath)) {
          return fs.readFileSync(devHtmlPath, 'utf-8');
        }
      }
      return html;
    },
    // When build finishes, generate self-contained index.html for direct file:// opening
    closeBundle() {
      try {
        const distDir = path.resolve(__dirname, 'dist');
        const assetsDir = path.join(distDir, 'assets');
        if (!fs.existsSync(assetsDir)) return;

        const files = fs.readdirSync(assetsDir);
        const cssFile = files.find(f => f.endsWith('.css'));
        const jsFile = files.find(f => f.endsWith('.js'));

        if (!cssFile || !jsFile) {
          console.error('Could not find CSS or JS file in dist/assets');
          return;
        }

        let cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8');
        let jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf-8');

        // Safely normalize all references to /assets/ or /frames/ (or ../frames/) to ./assets/ and ./frames/
        jsContent = jsContent.replace(/(?:\.\.|\.)?\/frames\//g, './frames/');
        jsContent = jsContent.replace(/(?:\.\.|\.)?\/assets\//g, './assets/');
        cssContent = cssContent.replace(/(?:\.\.|\.)?\/assets\//g, './assets/');

        const standaloneHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="./assets/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Droworang International | Luxury Leather Manufacturer & Global Exporter</title>
    <meta name="description" content="Premier B2B manufacturer and exporter of luxury leather goods, handcrafted bags, wallets, and custom leather OEM/ODM solutions certified by the Government of India." />
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
    <style>
${cssContent}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
${jsContent}
    </script>
  </body>
</html>`;

        // Write standalone index.html to both dist and project root
        fs.writeFileSync(path.join(distDir, 'index.html'), standaloneHtml, 'utf-8');
        fs.writeFileSync(path.resolve(__dirname, 'index.html'), standaloneHtml, 'utf-8');

        // Remove the temporary index.dev.html from dist if generated
        const distDevHtml = path.join(distDir, 'index.dev.html');
        if (fs.existsSync(distDevHtml)) {
          fs.unlinkSync(distDevHtml);
        }

        // Ensure assets and frames folders exist in both root and dist
        function copyDir(src, dest) {
          if (!fs.existsSync(src)) return;
          if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
          fs.readdirSync(src).forEach(file => {
            const srcFile = path.join(src, file);
            const destFile = path.join(dest, file);
            if (fs.statSync(srcFile).isDirectory()) {
              copyDir(srcFile, destFile);
            } else {
              fs.copyFileSync(srcFile, destFile);
            }
          });
        }

        copyDir(path.resolve(__dirname, 'public/assets'), path.resolve(__dirname, 'assets'));
        copyDir(path.resolve(__dirname, 'public/frames'), path.resolve(__dirname, 'frames'));
        copyDir(path.resolve(__dirname, 'public/assets'), path.join(distDir, 'assets'));
        copyDir(path.resolve(__dirname, 'public/frames'), path.join(distDir, 'frames'));

        console.log('Successfully generated standalone index.html for direct folder opening without server!');
      } catch (err) {
        console.error('Error generating standalone bundle:', err);
      }
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), standalonePlugin()],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.dev.html')
    }
  },
  server: {
    port: 3000,
    open: false,
    host: true
  }
});
