document.querySelectorAll('oembed[url]').forEach(element => {
  // verfy if is spotify url
  const url = element.getAttribute('url')
  if (url.match('open.spotify') || url.match('gist.github.com')) {
    return ''
  }

  // Create the <a href="..." class="embedly-card"></a> element that Embedly uses
  // to discover the media.
  const anchor = document.createElement('a');
  anchor.setAttribute('href', element.getAttribute('url'));
  anchor.className = 'embedly-card';
  anchor.setAttribute('data-card-key', '1d5c48f7edc34c54bdae4c37b681ea2b');
  anchor.setAttribute('data-card-theme', "dark");
  element.appendChild(anchor);
}

);

document.querySelectorAll('div[data-oembed-url]').forEach(element => {
  // Discard the static media preview from the database (empty the <div data-oembed-url="...">).
  const url = element.dataset.oembedUrl
  if (url.match('open.spotify') || url.match('gist.github.com')) {
    return ''
  }
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  // Create the <a href="..." class="embedly-card"></a> element that Embedly uses
  // to discover the media.
  const anchor = document.createElement('a');
  anchor.setAttribute('href', element.dataset.oembedUrl);
  anchor.className = 'embedly-card';
  anchor.setAttribute('data-card-key', '1d5c48f7edc34c54bdae4c37b681ea2b');
  anchor.setAttribute('data-card-theme', "dark");
  //data-card-align
  anchor.setAttribute('data-card-align', 'right')
  element.appendChild(anchor);
});


