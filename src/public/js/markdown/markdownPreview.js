function previewRender(conteudo, id) {
  const Editor = toastui.Editor;
  const { chart } = Editor.plugin;
  const { codeSyntaxHighlight } = Editor.plugin;
  const { tableMergedCell } = Editor.plugin;
  const { uml } = Editor.plugin;

  const editor = new Editor({
    el: document.querySelector('#editor'),
    height: '400px',
    initialEditType: 'markdown',
    previewStyle: 'tab',
    theme: 'dark', 
    initialValue: getMarkdown(id) || conteudo  || '',
    placeholder: '...',
    toolbarItems: [],
    plugins: [chart, codeSyntaxHighlight, tableMergedCell, uml],
    events: {
      change: (e) => {
        saveMarkdown(editor, id);
      }
    }
  });
  return editor;
}


function renderPost(conteudo) {
  const Editor = toastui.Editor;
  const { chart } = Editor.plugin;
  const { codeSyntaxHighlight } = Editor.plugin;
  const { tableMergedCell } = Editor.plugin;
  const { uml } = Editor.plugin;

  const editor = toastui.Editor.factory({
    el: document.querySelector('#viewer'),
    height: '450px',
    theme: 'dark',
    viewer: true,
    initialValue: conteudo,
    plugins: [chart, codeSyntaxHighlight, tableMergedCell, uml],
  });
  return editor;
}


function saveMarkdown(editor, id) {
  const markdown = editor.getMarkdown();
  localStorage.setItem(id, markdown);
}

function getMarkdown(id) {
  const markdown = localStorage.getItem(id);
  return markdown;
}