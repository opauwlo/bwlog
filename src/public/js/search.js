const filterInput = document.querySelector('#filter')

function test( str ) {
  let tam = str.length
  for (let i = 0; i <= tam; i++) {
    return[i]
  }
}

filterInput.addEventListener('input', event => {
  let s = event.target.value.toLowerCase();
  s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  const r = (/[.\s]+/);
  const word = s.split(r);
  function value () {
    for (let i = 0; i < word.length; i++){
      return word[i]
    }
  }
  const posts = document.querySelectorAll('.post');
  const noPosts = document.querySelector('.noPost');

  posts.forEach(post => {
    const postTitle = post.querySelector('.text-titulo').textContent.toLowerCase();
    const title = postTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const postDescription = post.querySelector('.text-descricao').textContent.toLowerCase();
    const description = postDescription.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const postAutor = post.querySelector('.text-autor').textContent.toLowerCase();
    const autor = postAutor.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    if (title.includes(value()) || description.includes(value()) || autor.includes(value()))  {
      post.style.display = 'initial';
      return;
    }
    post.style.display = 'none';
  })
})