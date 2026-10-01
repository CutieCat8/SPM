// Assembles src/index.html + src/sections/*.html into the root index.html
// Usage: node build.js
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const html = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8')
  .replace(/^[ \t]*<!-- @include (.+?) -->[ \t]*$/gm, (_, file) =>
    fs.readFileSync(path.join(srcDir, file), 'utf8').replace(/\s+$/, ''));

fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('Built index.html');
