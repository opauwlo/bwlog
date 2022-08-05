function previewRender(conteudo) {
  const Editor = toastui.Editor;
  const { chart } = Editor.plugin;
  const { codeSyntaxHighlight } = Editor.plugin;
  const { tableMergedCell } = Editor.plugin;
  const { uml } = Editor.plugin;

  const editor = new Editor({
    el: document.querySelector('#editor'),
    height: '500px',
    initialEditType: 'wysiwyg',
    previewStyle: 'tab',
    theme: 'dark',
    initialValue: conteudo,
    plugins: [chart, codeSyntaxHighlight, tableMergedCell, uml],
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
    height: '500px',
    theme: 'dark',
    viewer: true,
    initialValue: conteudo,
    plugins: [chart, codeSyntaxHighlight, tableMergedCell, uml],
  });
  return editor;
}