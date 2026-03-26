const fs = require('fs');
const path = require('path');

const jsCode = `\n<script>
const chaosChars = "!@#$%^&*()_+=-{}[]|:;<>,.?/~\`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const FIXED_LENGTH = Math.floor(Math.random() * 91) + 60;
let urlArr = Array.from({ length: FIXED_LENGTH }, () =>
  chaosChars.charAt(Math.floor(Math.random() * chaosChars.length))
);
const initialHash = "#" + urlArr.join("");
history.replaceState(null, '', location.pathname + initialHash);
function updateHashPerChar() {
  for (let i = 0; i < urlArr.length; i++) {
    if (Math.random() < 0.25) {
      urlArr[i] = chaosChars.charAt(Math.floor(Math.random() * chaosChars.length));
    }
  }
  const newHash = "#" + urlArr.join("");
  history.replaceState(null, '', location.pathname + newHash);
}
const favicon = document.getElementById('favicon');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.crossOrigin = "anonymous";
img.src = favicon.href;
let faviconReady = false;
img.onload = () => { faviconReady = true; };
const size = 64;
canvas.width = size;
canvas.height = size;
setInterval(() => {
  if (!faviconReady) return;
  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.translate(size / 2, size / 2);
  const angle = Math.random() * 2 * Math.PI;
  const scaleX = (Math.random() * 0.5 + 0.75) * (Math.random() < 0.5 ? -1 : 1);
  const scaleY = (Math.random() * 0.5 + 0.75) * (Math.random() < 0.5 ? -1 : 1);
  ctx.rotate(angle);
  ctx.scale(scaleX, scaleY);
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
  favicon.href = canvas.toDataURL("image/png");
}, 100);
setInterval(updateHashPerChar, 30);
</script>\n`;

const faviconTag = `<link id="favicon" rel="icon" href="favicon.png" type="image/png">`;

const folderPath = './';

fs.readdirSync(folderPath).forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(folderPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Xóa các dòng favicon cũ
    content = content.replace(/<link\s+[^>]*rel=["']icon["'][^>]*?>/gi, '');

    // Thay thế <link id="favicon"> tạm bằng bản đầy đủ
    content = content.replace(
      /<link\s+id=["']favicon["']\s*>/gi,
      faviconTag
    );

    // Nếu chưa có favicon, chèn vào <head>
    if (!content.includes('id="favicon"')) {
      content = content.replace(/<head[^>]*>/i, match => `${match}\n  ${faviconTag}`);
    }

    // Thêm script nếu chưa có chaos
    if (!content.includes('chaosChars')) {
      content = content.replace(/<\/body>/i, `${jsCode}</body>`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Done: ${file}`);
  }
});
