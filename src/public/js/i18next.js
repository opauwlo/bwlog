const togle_lang = document.querySelectorAll('.lang-selector');

function upadateLang() {
  togle_lang.forEach(function (item) {
    setCookie(item);
  });
}

function setCookie(item) { 
  item.addEventListener('change', function (e) {
    const lang = this.value;
    document.cookie = `i18next=${lang};path=/`;
    window.location.reload();
  });
}

upadateLang();

const lng = document.querySelector('html').getAttribute('lang');

if (lng === 'en') {
  document.querySelectorAll('.lang-en').forEach(function (item) {
    item.setAttribute('selected', 'selected');
  });
} else {
  document.querySelectorAll('.lang-pt').forEach(function (item) {
    item.setAttribute('selected', 'selected');
  });
}