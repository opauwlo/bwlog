const imgProfile = document.getElementById("imgProfile"),
  banner_img = document.getElementById("bannerImg"),
  button = document.getElementById("submit");

function activateButton() {
  button.classList.remove("disabled")
}
let profile = document.getElementById("profile_img");
profile.onchange = function () {
  this.files[0].size > 3145728 ? (alert("Arquivo muito grande, valor maximo de 3MB!"), this.value = "") : (imgProfile.src = URL.createObjectURL(event.target.files[0]), button.classList.remove("disabled"))
};
let banner = document.getElementById("banner_img");
banner.onchange = function () {
  this.files[0].size > 3145728 ? (alert("Arquivo muito grande, valor maximo de 3MB!"), this.value = "") : (banner_img.style.backgroundImage = `url(${URL.createObjectURL(event.target.files[0])})`, button.classList.remove("disabled"))
};


function logSubmit() {
  document.getElementById("load").innerHTML = `
  <div class="d-flex p-3 mt-3 bg align-items-center">
    <strong class="text-white">Enviando...</strong>
    <div class="spinner-border text-white ms-auto" role="status" aria-hidden="true"></div>
  </div>`;
  document.getElementById('submit').setAttribute("hidden", "true");
} 
const form = document.getElementById('form');
form.addEventListener('submit', logSubmit);