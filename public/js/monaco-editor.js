let editor;
// monaco editorの初期化
require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs",
  },
});
require(["vs/editor/editor.main"], function () {
  // エディターを初期化
  editor = monaco.editor.create(document.getElementById("editor"), {
    value: "",
    language: "markdown",
    theme: "vs-dark",
    automaticLayout: true,
  });
});

// JavaScriptの関数
async function generateUMLImage() {
  try {
    const uml = editor.getValue();

    const response = await fetch("api.php", {
      method: "POST",
      body: uml,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // レスポンスをテキストとして取得
    const data = await response.json();

    // 結果を画面に表示
    const preview = document.getElementById("preview");

    if (preview.querySelector("img") !== null) {
      const img = document.getElementById("UML-Image");
      img.src = "";
      img.src = data.url;
      return;
    }

    const img = document.createElement("img");
    img.src = data.url;
    img.alt = "UML-Image";
    img.id = "UML-Image";

    img.className = "max-w-full h-auto object-contain";

    preview.appendChild(img);
  } catch (error) {
    console.error("Error:", error);
  }
}
