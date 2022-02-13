const postBannerImg = document.getElementById("postBannerImg");

const bannerInput = document.getElementById("bannerInput");

bannerInput.onchange = function (e) {
  if (this.files[0].size > 3145728.0) {
    alert("Arquivo muito grande, valor maximo de 3MB!");
    this.value = "";
  } else {
    postBannerImg.src = URL.createObjectURL(e.target.files[0]);
  }
};
