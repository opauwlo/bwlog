function editorRender(content, id) {
  const Editor = toastui.Editor;
  const { chart } = Editor.plugin;
  const { codeSyntaxHighlight } = Editor.plugin;
  const { tableMergedCell } = Editor.plugin;
  const { uml } = Editor.plugin;

  const editor = new Editor({
    el: document.querySelector('#editor'),
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'tab',
    theme: 'dark', 
    initialValue: getMarkdown(id) || content  || '',
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

function renderPost(content) {
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
    initialValue: content,
    plugins: [chart, codeSyntaxHighlight, tableMergedCell, uml],
  });
  return editor;
}

// function to call all the functions to render the editor
function renderFields(id, summaryContent, titleContent) {
  function renderSummary() {
    const summary = getSummary(id);
    const summaryField = document.querySelector('#descricao');
    summaryField.value = summary || summaryContent || '';
  }
  
  function renderTitle() {
    const title = getTitle(id);
    const titleField = document.querySelector('#titulo');
    titleField.value = title || titleContent || '';
  }
  
  function saveTitle() {
    const titleField = document.querySelector('#titulo');
    titleField.addEventListener('change', (e) => {
      localStorage.setItem(`${id}_title`, titleField.value);
    });
  }
  
  function saveSummary() {
    // watch for changes in the summary field and save it to localStorage
    const summaryField = document.querySelector('#descricao');
    summaryField.addEventListener('change', (e) => {
      localStorage.setItem(`${id}_summary`, summaryField.value);
    });
  }

  return {
    renderSummary,
    renderTitle,
    saveTitle,
    saveSummary,
  };
}

function saveMarkdown(editor, id) {
  const markdown = editor.getMarkdown();
  localStorage.setItem(`${id}_markdown`, markdown);
}

function getTitle(id) {
  const title = localStorage.getItem(`${id}_title`);
  return title || '';
}

function getSummary(id) {
  const summary = localStorage.getItem(`${id}_summary`);
  return summary || '';
}

function getMarkdown(id) {
  const markdown = localStorage.getItem(`${id}_markdown`);
  return markdown || '';
}