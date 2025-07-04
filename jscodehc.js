
// Chuyển tab
const tabs = ["html", "css", "js"];
tabs.forEach(tab => {
  document.getElementById(`${tab}-tab`).addEventListener("click", () => {
    tabs.forEach(t => {
      document.getElementById(`${t}-tab`).classList.remove("active");
      document.getElementById(`${t}-content`).classList.remove("active");
      document.getElementById(`${t}-content`).classList.add("hidden");
    });
    document.getElementById(`${tab}-tab`).classList.add("active");
    document.getElementById(`${tab}-content`).classList.remove("hidden");
    document.getElementById(`${tab}-content`).classList.add("active");
  });
});

// Tự động cập nhật iframe khi nhập
["html-code", "css-code", "js-code"].forEach(id => {
  document.getElementById(id).addEventListener("input", updatePreview);
});

function updatePreview() {
  const html = document.getElementById("html-code").value;
  const css = document.getElementById("css-code").value;
  const js = document.getElementById("js-code").value;

  const fullContent = `
    <!DOCTYPE html>
    <html>
    <head><style>${css}</style></head>
    <body>
    ${html}
    <script>${js}<\/script>
    </body>
    </html>
  `;
  document.getElementById("preview").srcdoc = fullContent;
}
require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs" } });

let editors = {};

require(["vs/editor/editor.main"], function () {
  editors.html = monaco.editor.create(document.getElementById("html-code"), {
    value: "<!DOCTYPE html>\n<html lang=\"vi\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Hiệu ứng Chữ KHANHPC</title>\n    <link rel=\"stylesheet\" href=\"style.css\">\n  </head>\n  <body>\n    <h1>KHANHPC</h1>\n    <script src=\"script.js\"></script>\n  </body>\n</html>",
    language: "html",
    theme: "vs-light",
    automaticLayout: true,
  });

  editors.css = monaco.editor.create(document.getElementById("css-code"), {
    value: "body {\n  background: linear-gradient(135deg, #00e5ff, #ff4081, #8e24aa);\n  background-size: 400% 400%;\n  animation: gradientBackground 5s ease infinite;\n  margin: 0;\n  padding: 0;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: 'Arial', sans-serif;\n}\n\nh1 {\n  font-size: 80px;\n  color: #ffffff;\n  text-transform: uppercase;\n  letter-spacing: 5px;\n  transition: all 0.3s ease;\n  cursor: pointer;\n  background: linear-gradient(45deg, #ff4081, #ff9800, #00e5ff, #8e24aa);\n  -webkit-background-clip: text;\n  color: transparent;\n}\n\nh1:hover {\n  transform: scale(1.2) rotate(-10deg);\n  color: #ffffff;\n  text-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);\n  background: linear-gradient(45deg, #8e24aa, #ff4081, #00e5ff, #ff9800);\n  -webkit-background-clip: text;\n}\n\nh1:active {\n  transform: scale(1) rotate(0deg);\n  color: #ffffff;\n  text-shadow: none;\n  background: #00e5ff;\n  -webkit-background-clip: text;\n}\n\n@keyframes gradientBackground {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}",
    language: "css",
    theme: "vs-light",
    automaticLayout: true,
  });

  editors.js = monaco.editor.create(document.getElementById("js-code"), {
    value: "document.addEventListener('DOMContentLoaded', function () {\n  // Ẩn cuộn trang\n  document.body.style.overflow = 'hidden';\n\n  const h1 = document.querySelector('h1');\n\n  // Khi rê chuột vào\n  h1.addEventListener('mouseover', function () {\n    h1.style.transform = 'scale(1.2) rotate(-10deg)';\n    h1.style.textShadow = '5px 5px 15px rgba(0, 0, 0, 0.5)';\n  });\n\n  // Khi chuột rời đi\n  h1.addEventListener('mouseout', function () {\n    h1.style.transform = 'scale(1) rotate(0deg)';\n    h1.style.textShadow = 'none';\n  });\n});"

,
    language: "javascript",
    theme: "vs-light",
    automaticLayout: true,
  });

  function updatePreview() {
    const html = editors.html.getValue();
    const css = `<style>${editors.css.getValue()}</style>`;
    const js = `<script>${editors.js.getValue()}<\/script>`;
    document.getElementById("preview").srcdoc = html + css + js;
  }

  Object.values(editors).forEach((editor) => {
    editor.onDidChangeModelContent(updatePreview);
  });

  updatePreview();
});

// Chuyển tab
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    document.querySelectorAll(".tab-content").forEach((tc) => tc.classList.add("hidden"));
    const id = tab.id.replace("-tab", "-content");
    document.getElementById(id).classList.remove("hidden");
  });
});
editors.html.addCommand(monaco.KeyCode.Enter, function () {
  const model = editors.html.getModel();
  const position = editors.html.getPosition();
  const line = model.getLineContent(position.lineNumber).trim();

  if (line === '!') {
    model.applyEdits([
      {
        range: new monaco.Range(position.lineNumber, 1, position.lineNumber, line.length + 1),
        text: `<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="UTF-8">\n    <title>Document</title>\n  </head>\n  <body>\n    \n  </body>\n</html>`,
      },
    ]);
  }

  if (line === 'h1') {
    model.applyEdits([
      {
        range: new monaco.Range(position.lineNumber, 1, position.lineNumber, line.length + 1),
        text: `<h1></h1>`,
      },
    ]);
  }

  if (line === 'h2') {
    model.applyEdits([
      {
        range: new monaco.Range(position.lineNumber, 1, position.lineNumber, line.length + 1),
        text: `<h2></h2>`,
      },
    ]);
  }
});
editors.html.onDidChangeModelContent((event) => {
  const code = editors.html.getValue();
  const match = code.match(/<(\w+)[^>]*>(?!<\/\1>)(?!.*<\/\1>)/); // tìm thẻ chưa đóng

  if (match) {
    const tag = match[1];
    const cursor = editors.html.getPosition();
    const model = editors.html.getModel();

    // Kiểm tra xem ngay sau đó đã có thẻ đóng chưa, nếu chưa thì thêm vào
    const nextChar = model.getValueInRange({
      startLineNumber: cursor.lineNumber,
      startColumn: cursor.column,
      endLineNumber: cursor.lineNumber,
      endColumn: cursor.column + 1,
    });

    if (nextChar !== `<`) {
      // Chèn thẻ đóng ngay sau con trỏ
      model.applyEdits([
        {
          range: new monaco.Range(cursor.lineNumber, cursor.column, cursor.lineNumber, cursor.column),
          text: `</${tag}>`,
        },
      ]);
    }
  }
});
monaco.languages.registerCompletionItemProvider('html', {
  provideCompletionItems: () => {
    return {
      suggestions: [
        {
          label: 'HTML mẫu khanhpc',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            '<!DOCTYPE html>',
            '<html lang="vi">',
            '<head>',
            '  <meta charset="UTF-8" />',
            '  <title>khanhpc</title>',
            '</head>',
            '<body>',
            '  <h1>khanhpc</h1>',
            '</body>',
            '</html>',
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Mẫu HTML cơ bản với h1 là "khanhpc"',
          filterText: '!',
        },
      ]
    };
  }
});


