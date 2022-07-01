// get the url of the site
var url = window.location.href;
var lang = document.querySelector('html').getAttribute('lang');
if (lang === 'pt') {
    lang = '';
}

var placeholderMsg = document.querySelector('#placeholder').textContent;
BalloonBlockEditor
  .create(document.querySelector('#textarea'), {
    placeholder: placeholderMsg,
    language: lang,
    simpleUpload: {
      uploadUrl: `${url}/api/upload/img`,
    },
    mediaEmbed: {
      previewsInData: true,
      providers: [
        {
          name: 'Spotify',
          url: [/^open\.spotify\.com\/(artist\/\w+)/, /^open\.spotify\.com\/(album\/\w+)/, /^open\.spotify\.com\/(track\/\w+)/, /^open\.spotify\.com\/(episode\/\w+)/],
          html: match => {
            const e = match[1];
            if (e.match('track')) {
              return `<div class="rounded-3"><div class="rounded-3" style="left: 0; width: 100%;"><iframe class="rounded-3" src="https://open.spotify.com/embed/${e}?utm_source=generator&theme=0" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></div></div>`

            }
            return `<div class="rounded-3"><div class="rounded-3" style="left: 0; width: 100%;"><iframe class="rounded-3" src="https://open.spotify.com/embed/${e}?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></div></div>`

          }
        },
        {
          name: 'embedly',
          url: /.+/,
          html: match => {
            const url = match[0];
            // verify if url is image
            if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
              // return nothing
              return '';
            }
            // remove undfeinded response on embedly
            const key = '1d5c48f7edc34c54bdae4c37b681ea2b'
            // fetch and return html
            fetch(`http://api.embedly.com/1/oembed?url=${url}&key=${key}`)
              .then(data => {
                
                  document.querySelectorAll('div[data-oembed-url]').forEach(element => {
                    // Discard the static media preview from the database (empty the <div data-oembed-url="...">).
                    const url = element.dataset.oembedUrl
                    if (url.match('open.spotify') || url.match('gist.github.com')) {
                      const html = `<script src="${url}.js"></script>`
                      element.outerHTML = html
                    }
                    while (element.firstChild) {
                      element.removeChild(element.firstChild);
                    }

                    const anchor = document.createElement('a');
                    anchor.setAttribute('href', element.dataset.oembedUrl);
                    anchor.className = 'embedly-card';
                    anchor.setAttribute('data-card-key', '1d5c48f7edc34c54bdae4c37b681ea2b');
                    anchor.setAttribute('data-card-theme', "dark");
                    //data-card-align
                    anchor.setAttribute('data-card-align', 'right')
                    element.appendChild(anchor);
                  });
                }

              )
          }
        },
      ]
    }
  })
  .then(editor => {
    window.editor = editor;
    
  })
  .catch(error => {

    console.error(error);
  });