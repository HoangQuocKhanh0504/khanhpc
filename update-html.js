const fs = require("fs");
const path = require("path");

const replaceTarget = 'href="favicon.png"';
const replaceWith = 'href="GD.png"';

const donateSnippet = `
<div id="donate-host"></div>
<script>
  const host = document.getElementById("donate-host");
  const shadow = host.attachShadow({ mode: "open" });
  const tpl = \`
    <!-- Nút Donate lắc lư cute -->
<a href="https://khanhpc-five.vercel.app/ungho.html" id="donate-button" target="_blank">💖 Donate cho KHANHPC</a>
<style>
  #donate-button {
    position: fixed;
    top:70px;
    right: 20px;
    background: linear-gradient(135deg, #ff0080, #7928ca);
    color: white;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 30px;
    text-decoration: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    animation: shake 2s infinite;
    transition: transform 0.2s;
  }
  #donate-button:hover {
    transform: scale(1.05);
  }
  @keyframes shake {
    0% { transform: rotate(0deg); }
    20% { transform: rotate(3deg); }
    40% { transform: rotate(-3deg); }
    60% { transform: rotate(2deg); }
    80% { transform: rotate(-2deg); }
    100% { transform: rotate(0deg); }
  }
  @media (max-width: 500px) {
    #donate-button {
      font-size: 14px;
      padding: 10px 16px;
    }
  }
</style>
  \`;
  shadow.innerHTML = tpl;
  new MutationObserver((muts, obs) => {
    if (!shadow.querySelector("#donate-button")) {
      obs.disconnect();
      location.reload();
    }
  }).observe(shadow, { childList: true });
</script>
`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // Thay favicon nếu có
  if (content.includes(replaceTarget)) {
    content = content.replaceAll(replaceTarget, replaceWith);
    modified = true;
  }

  // Chèn donate nếu chưa có
  if (!content.includes('id="donate-host"') && content.includes("</body>")) {
    content = content.replace("</body>", `${donateSnippet}\n</body>`);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("✅ Đã cập nhật:", filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith(".html")) {
      processFile(fullPath);
    }
  }
}

walk(__dirname);
