ID = 485040018311-t4628pim6j74ssva2ctso0qapn65hts9.apps.googleusercontent.com
secret =pJv98aZg70ZmDQOh2AYF5l0w









  <div class="row">
    <div class="col-sm-5">
      <div class="card bg-dark m-3 shadow-lg text-center">
        <div class="card-body px-4 ">
          <h1 class="card-title text-light mb-2">{{dataValues.titulo}}</h1>
          <small class="text-secondary mt-1">Postado por: {{dataValues.autor}}</small>
          <p class="card-text text-info">{{dataValues.descricao}}</p>
          <a href="/posts/{{dataValues.slug}}" class="btn shadow btn-success text-light">Ler Mais!</a>
          <a href="/edit/{{dataValues.id}}" class="btn btn-primary mx-1">editar</a>        
          <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Deletar
          </button>
          <hr class="text-light">
        </div>
      </div>
    </div>
  </div>