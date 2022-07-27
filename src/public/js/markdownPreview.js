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
  md.use(window.markdownitTaskLists);
  
  var simplemde = new SimpleMDE({ 
    element: document.getElementById("textarea"),
    promptURLs: true,
    showIcons: ["code", "table"],
      renderingConfig: {
      singleLineBreaks: true,
      codeSyntaxHighlighting: true,
    },
      autosave: {
      enabled: true,
      uniqueId: uniqueID,
      delay: 500,
    },
      previewRender: function(plainText, preview) { // Async method
      setTimeout(function(){
        preview.innerHTML = DOMPurify.sanitize(md.render(plainText));
      }, 250);
      return "Loading...";
    },
    lineWrapping: true,
    forceSync: true,
    placeholder: '...'
  
   });

   return simplemde;
}

