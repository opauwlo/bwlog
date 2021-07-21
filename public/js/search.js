const teste = document.querySelector('#filter')

// Slugify a string
function slugify(str)
{
    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '') 
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-') 
    // Collapse dashes
    .replace(/-+/g, '-'); 

    return str;
}


teste.addEventListener('input', event => {
  const inputValue = event.target.value.toLowerCase();
  const value = slugify(inputValue)
  const posts = document.querySelectorAll('.post');
  const noPost = document.querySelectorAll('.noPost');
  const noPostHtml = `
  <div class="col rounded-3 mb-4">
    <div class="card bg-dark m-2 shadow text-center">
      <div class="card-body px-3 text-light">
        <small class="fst-italic fs-6 fw-bold">:(</small> <br>
          Que tal buscar por um sinonimo?
      </div>
    </div>
  </div>`

  posts.forEach(post => {
    const postTitle = post.querySelector('.text-titulo').textContent.toLowerCase();
    const title = slugify(postTitle);
    const postDescription = post.querySelector('.text-descricao').textContent.toLowerCase();
    const description = slugify(postDescription);
    const postAutor = post.querySelector('.text-autor').textContent.toLowerCase();
    const autor = slugify(postAutor);

    if (title.includes(value) || description.includes(value) || autor.includes(value))  {
      post.style.display = 'inherit';
      return;
    }
    post.style.display = 'none';
  })
})