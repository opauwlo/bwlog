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
(() => {
  const modified_inputs = new Set;
  const defaultValue = "defaultValue";
  // store default values
  addEventListener("beforeinput", (evt) => {
    const target = evt.target;
    if (!(defaultValue in target || defaultValue in target.dataset)) {
      target.dataset[defaultValue] = ("" + (target.value || target.textContent)).trim();
    }
  });
  // detect input modifications
  addEventListener("input", (evt) => {
    const target = evt.target;
    let original;
    if (defaultValue in target) {
      original = target[defaultValue];
    } else {
      original = target.dataset[defaultValue];
    }
    if (original !== ("" + (target.value || target.textContent)).trim()) {
      if (!modified_inputs.has(target)) {
        modified_inputs.add(target);
      }
    } else if (modified_inputs.has(target)) {
      modified_inputs.delete(target);
    }
  });
  // clear modified inputs upon form submission
  addEventListener("submit", () => {
    modified_inputs.clear();
    // to prevent the warning from happening, it is advisable
    // that you clear your form controls back to their default
    // state after submission
  });
  // warn before closing if any inputs are modified
  addEventListener("beforeunload", (evt) => {
    if (modified_inputs.size) {
      const unsaved_changes_warning = "Seu texto não foi salvo, se sair perderá todos os dados.";
      evt.returnValue = unsaved_changes_warning;
      return unsaved_changes_warning;
    }
  });
})();