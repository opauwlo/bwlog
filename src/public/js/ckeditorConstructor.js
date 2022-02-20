ClassicEditor.create(document.querySelector("#validationTextarea"), {
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "bold",
      "italic",
      "underline",
      "|",
      "outdent",
      "indent",
      "alignment",
      "|",
      "link",
      "blockQuote",
      "horizontalLine",
      "|",
      "fontSize",
      "|",
      "code",
      "codeBlock",
      "|",
      "mediaEmbed",
      "imageInsert",
      "|",
      "numberedList",
      "bulletedList",
    ],
  },
  language: "pt-br",
  image: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
    ],
  },
})
  .then((editor) => {
    window.editor = editor;

    editor.keystrokes.set("space", (key, stop) => {
      editor.execute("input", {
        text: " ",
      });
      stop();
    });
  })
  .catch((error) => {});
