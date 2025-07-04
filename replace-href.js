const fs = require("fs");
const path = require("path");

const target = 'href="favicon.png"';
const replacement = 'href="GD.png"';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes(target)) {
    const updated = content.split(target).join(replacement);
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`✅ Đã thay trong: ${filePath}`);
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
      replaceInFile(fullPath);
    }
  }
}

walk(__dirname);
