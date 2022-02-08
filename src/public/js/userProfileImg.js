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