function previewRender(uniqueID) {
  var md = window.markdownit({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }
  
      return ''; // use external default escaping;
    },
    html: true,
    linkify: true,
    typography: true,
    breaks: true,        // Convert '\n' in paragraphs into <br>
  });
  
  // PLUGINS
  md.use(window.markdownitEmoji);
  md.use(window.markdownitSub);
  md.use(window.markdownitSup);
  md.use(window.markdownitFootnote);
  md.use(window.markdownitAbbr);
  md.use(window.markdownitDeflist);
  md.use(window.markdownitIns);
  md.use(window.markdownitMark);
  var simplemde = new EasyMDE({ 
    element: document.getElementById("textarea"),
    promptURLs: true,
    showIcons: ["code", "table"],
    insertTexts: {
      horizontalRule: ["", "\n\n-----\n\n"],
      table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n"],
    },
      renderingConfig: {
      singleLineBreaks: true,
      codeSyntaxHighlighting: true,
      sanitizerFunction: (renderedHTML) => {
        // Using DOMPurify and only allowing <b> tags
        return DOMPurify.sanitize(renderedHTML, {ALLOWED_TAGS: ['b']});
    },
    },
      autosave: {
      enabled: true,
      uniqueId: uniqueID,
      delay: 500,
    },
      previewRender: function(plainText, preview) { // Async method
      setTimeout(function(){
        let renderer = md.render(plainText);
        preview.innerHTML = renderer;
      }, 250);
      return "Loading...";
    },
    styleSelectedText: true,
    tabSize: 2,
    toolbar: ['heading','bold', 'italic', '|', 'link', 'image', 'code', '|', 'preview', 'fullscreen'],
    lineWrapping: true,
    placeholder: '...',
    styleSelectedText: false  ,
    parsingConfig: {
      allowAtxHeaderWithoutSpace: true,
      strikethrough: true,
      underscoresBreakWords: false,
  },
   });

   return simplemde;
}