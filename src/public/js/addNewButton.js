document.getElementById('plus-btn').addEventListener('click', function (e) {
  if (document.getElementById('options').classList.contains('show')) {
    document.body.classList.remove('lock-body');
    document.getElementById('options').classList.remove('show');
    document.getElementById('options').classList.remove('fade-in-btn');
    document.getElementById('options').classList.add('fade-out-btn');
  } else {
    document.body.classList.add('lock-body');
    document.getElementById('options').classList.add('show');
    document.getElementById('options').classList.add('fade-in-btn');
    document.getElementById('options').classList.remove('fade-out-btn');
  }
});

document.addEventListener('click', function (e) {
  if (e.path[0].classList.value !== 'bi bi-plus-lg') {
                document.body.classList.remove('lock-body');
    document.getElementById('options').classList.remove('show');
    document.getElementById('options').classList.remove('fade-in-btn');
  }
});