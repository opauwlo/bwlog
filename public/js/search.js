const filterInput = document.querySelector('#filter')

filterInput.addEventListener('input', event => {
  const inputValue = event.target.value.toLowerCase();
  const value = inputValue.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  const posts = document.querySelectorAll('.post');
  const noPosts = document.querySelector('.noPost');

  posts.forEach(post => {
    const postTitle = post.querySelector('.text-titulo').textContent.toLowerCase();
    const title = postTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const postDescription = post.querySelector('.text-descricao').textContent.toLowerCase();
    const description = postDescription.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const postAutor = post.querySelector('.text-autor').textContent.toLowerCase();
    const autor = postAutor.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    if (title.includes(value) || description.includes(value) || autor.includes(value))  {
      noPosts.style.display = 'none';
      post.style.display = 'initial';
      return;
    }
    post.style.display = 'none';
    noPosts.style.display = 'block';

  })
})