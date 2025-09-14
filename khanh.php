<?php
function safe_filename($name) {
    $name = preg_replace('/[^A-Za-z0-9_\-\.]/', '_', $name);
    $name = substr($name, 0, 120);
    if ($name === '') $name = 'converted';
    return $name . '.php';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['html_input'])) {
    $html = $_POST['html_input'];
    $preserve_php = isset($_POST['preserve_php']);
    $filename = safe_filename($_POST['filename'] ?? 'converted');

    if ($preserve_php) {
        $php_file_content = $html;
    } else {
        $php_file_content = "<?php\nheader('Content-Type: text/html; charset=utf-8');\n".
                            "echo <<<'HTML'\n".$html."\nHTML;\n";
    }

    if ($_POST['action'] === 'download') {
        header('Content-Disposition: attachment; filename="'.$filename.'"');
        header('Content-Type: application/octet-stream');
        echo $php_file_content;
        exit;
    } else {
        $escaped = htmlspecialchars($php_file_content, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        ?>
        <!doctype html>
        <html lang="vi" class="light">
        <head>
            <meta charset="utf-8">
            <script src="https://cdn.tailwindcss.com"></script>
            <script>
              function toggleTheme() {
                document.documentElement.classList.toggle('dark');
              }
            </script>
            <title>Kết quả</title>
        </head>
        <body class="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center py-10 text-gray-900 dark:text-gray-100 transition">
            <div class="absolute top-4 right-4">
              <button onclick="toggleTheme()" class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full shadow">
                🌙/☀️
              </button>
            </div>
            <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-11/12 max-w-4xl">
                <h2 class="text-2xl font-bold mb-4">🎉 Kết quả file: 
                    <code class="text-blue-600 dark:text-blue-400"><?php echo htmlspecialchars($filename) ?></code>
                </h2>

                <?php if ($preserve_php) { ?>
                    <div class="bg-yellow-100 dark:bg-yellow-600 text-yellow-900 dark:text-yellow-100 p-3 rounded mb-4">
                        ⚠ Bạn chọn <b>Giữ PHP</b> — file có thể thực thi code PHP.
                    </div>
                <?php } else { ?>
                    <div class="bg-green-100 dark:bg-green-600 text-green-900 dark:text-green-100 p-3 rounded mb-4">
                        ✅ Nội dung được bao trong <b>nowdoc</b>, an toàn — không thực thi PHP.
                    </div>
                <?php } ?>

                <h3 class="font-semibold mb-2">📄 Mã file:</h3>
                <pre class="bg-gray-900 text-green-200 p-4 rounded overflow-auto max-h-96 text-sm"><?php echo $escaped ?></pre>

                <h3 class="font-semibold mt-6 mb-2">👀 Preview:</h3>
                <iframe class="w-full h-80 border rounded bg-white dark:bg-gray-200" srcdoc="<?php echo htmlspecialchars($html) ?>"></iframe>

                <form method="post" class="mt-6 flex gap-3">
                    <input type="hidden" name="html_input" value="<?php echo htmlspecialchars($html) ?>">
                    <input type="hidden" name="preserve_php" value="<?php echo $preserve_php ? '1' : '' ?>">
                    <input type="hidden" name="filename" value="<?php echo htmlspecialchars($filename) ?>">
                    <button name="action" value="download" 
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">⬇ Tải file .php</button>
                    <a href="index.php" 
                        class="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500">🔙 Quay lại</a>
                </form>
            </div>
        </body>
        </html>
        <?php
        exit;
    }
}
?>
<!doctype html>
<html lang="vi" class="light">
<head>
  <meta charset="utf-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    function toggleTheme() {
      document.documentElement.classList.toggle('dark');
    }
  </script>
  <title>HTML → PHP Converter</title>
</head>
<body class="bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center p-6 text-gray-900 dark:text-gray-100 transition">
  <div class="absolute top-4 right-4">
    <button onclick="toggleTheme()" class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full shadow">
      🌙/☀️
    </button>
  </div>
  <div class="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-3xl transition">
    <h1 class="text-3xl font-extrabold text-center text-indigo-700 dark:text-indigo-400 mb-6">✨ HTML → PHP Converter ✨</h1>
    <form method="post" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Tên file:</label>
        <input type="text" name="filename" value="converted" 
               class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Dán HTML của bạn:</label>
        <textarea name="html_input" rows="12" placeholder="<h1>Hello</h1>..." 
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 font-mono text-sm bg-white dark:bg-gray-700"></textarea>
      </div>
      <label class="inline-flex items-center">
        <input type="checkbox" name="preserve_php" class="rounded border-gray-300 dark:border-gray-600 text-indigo-600">
        <span class="ml-2">Giữ nguyên PHP trong nội dung</span>
      </label>
      <div class="flex justify-center gap-4 pt-4">
        <button name="action" value="preview" 
                class="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700">👀 Xem trước</button>
        <button name="action" value="download" 
                class="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700">⬇ Tải file</button>
      </div>
    </form>
  </div>
</body>
</html>
