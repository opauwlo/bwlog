const togle_lang = document.querySelectorAll('.lang-selector');
togle_lang.forEach(function (item) {
  item.addEventListener('change', function () {
    const lang = this.value;
    document.cookie = `i18next=${lang};path=/`;
    window.location.reload();
  });
});
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
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
  });
}