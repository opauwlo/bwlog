const imgProfile = document.getElementById("imgProfile"),
  banner_img = document.getElementById("bannerImg"),
  button = document.getElementById("submit");

function activateButton() {
  button.classList.remove("disabled")
}
let profile = document.getElementById("profile_img");
profile.onchange = function () {
  this.files[0].size > 3145728 ? (window.alert("Arquivo muito grande, valor maximo de 3MB. Dica use o imagecompressor.com para reduzir o tamanho"), this.value = "") : (imgProfile.src = URL.createObjectURL(event.target.files[0]), button.classList.remove("disabled"))
};
let banner = document.getElementById("banner_img");
banner.onchange = function () {
  this.files[0].size > 3145728 ? (window.alert("Arquivo muito grande, valor maximo de 3MB. Dica use o imagecompressor.com para reduzir o tamanho"), this.value = "") : (banner_img.src = URL.createObjectURL(event.target.files[0]), button.classList.remove("disabled"))
};
banner_img.addEventListener("click", function () {
  banner.click();
}
);
function logSubmit() {
  document.getElementById("load").innerHTML = `
  <div class="d-flex p-3 mt-3 bg align-items-center">
    <strong class="text-white">⌛⌛⌛</strong>
    <div class="spinner-border text-white ms-auto" role="status" aria-hidden="true"></div>
  </div>`;
  document.getElementById('submit').setAttribute("hidden", "true");
} 
const form = document.getElementById('form');
form.addEventListener('submit', logSubmit);