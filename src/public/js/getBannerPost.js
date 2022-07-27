const postBannerImg = document.getElementById("postBannerImg");

const bannerInput = document.getElementById("bannerInput");

bannerInput.onchange = function () {
  if (this.files[0].size > 3145728) {
    window.alert("O tamanho máximo do arquivo é de 3MB. Dica use o imagecompressor.com para reduzir o tamanho");
    this.value = "";
  } else {
    postBannerImg.src = URL.createObjectURL(event.target.files[0]);
    // add remove img button
    document.getElementById("remove").removeAttribute("hidden");
  }
};

function addBtn() {
  document.getElementById("remove").removeAttribute("hidden");
}

function removeBtn() {
  document.getElementById("remove").setAttribute("hidden", "true");
}
const removeImgSrc = document.getElementById("remove");
// reste input and src img
function resetInput() {
  document.getElementById("postBannerImg").src = "";
  document.getElementById("bannerInput").value = "";
  document.getElementById("remove").setAttribute("hidden", "true");
}

function logSubmit() {
  document.getElementById("load").innerHTML = `
  <div class="d-flex rounded p-3 mt-3 bg align-items-center">
    <strong class="text-white">⌛⌛⌛</strong>
    <div class="spinner-border text-white ms-auto" role="status" aria-hidden="true"></div>
  </div>`;
  document.getElementById('btn-enviar').setAttribute("hidden", "true");
  document.getElementById('btn-rasc').setAttribute("hidden", "true");
}

const form = document.getElementById('form');
form.addEventListener('submit', logSubmit);